// src/services/geminiService.ts
import { GoogleGenAI, Modality, Part } from '@google/genai';
import type {
  VideoAnalysisResult,
  Scene,
  Timestamp,
  Recommendation,
  EmotionData,
  ObjectDetection,
  AnalysisOptions,
} from '../types/video';

export class GeminiVideoAnalyzer {
  private ai: GoogleGenAI;
  
  constructor(apiKey: string) {
    this.ai = new GoogleGenAI({ apiKey });
  }
  
  /**
   * Comprehensive video analysis using Gemini 2.5 Pro
   */
  async analyzeVideo(
    videoFile: File,
    options: AnalysisOptions = {}
  ): Promise<VideoAnalysisResult> {
    const {
      extractFrames = 30,
      analyzeEmotions = true,
      detectObjects = true,
      generateTimestamps = true,
      ptdFitnessOptimized = false
    } = options;
    
    // Step 1: Extract frames from video
    const frames = await this.extractVideoFrames(videoFile, extractFrames);
    
    // Step 2: Convert video to base64
    const videoBase64 = await this.fileToBase64(videoFile);
    
    // Step 3: Build comprehensive analysis prompt
    const analysisPrompt = this.buildAnalysisPrompt(ptdFitnessOptimized);
    
    // Step 4: Analyze with Gemini 2.5 Pro
    const parts: Part[] = [
      { text: analysisPrompt },
      { inlineData: { mimeType: videoFile.type, data: videoBase64 } },
      ...frames.map(frame => ({
        inlineData: { mimeType: 'image/jpeg', data: frame }
      }))
    ];
    
    const response = await this.ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: { parts },
      config: {
        temperature: 0.4,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
      }
    });
    
    // Step 5: Parse structured response
    const analysis = this.parseAnalysisResponse(response.text);
    
    // Step 6: Generate recommendations
    const recommendations = await this.generateRecommendations(analysis, ptdFitnessOptimized);
    
    return {
      ...analysis,
      recommendations
    };
  }
  
  /**
   * Build analysis prompt based on use case
   */
  private buildAnalysisPrompt(ptdFitnessOptimized: boolean): string {
    const basePrompt = \`Analyze this video comprehensively and provide a structured JSON response with the following:

1. **Summary**: A concise 2-3 sentence overview of the video content.

2. **Scenes**: Break down the video into distinct scenes with:
   - startTime (in seconds)
   - endTime (in seconds)
   - description (what's happening)
   - dominantEmotion (happy, sad, excited, calm, etc.)
   - objects (key objects visible)
   - score (0-100, how engaging this scene is)

3. **Timestamps**: Key moments in the video with:
   - time (in seconds)
   - description (what happens at this moment)
   - importance (high, medium, low)
   - actionable (true/false - can this be improved?)

4. **Emotions**: Emotional analysis throughout the video:
   - timestamp (in seconds)
   - emotion (detected emotion)
   - intensity (0-100)

5. **Objects**: Objects detected in the video:
   - name (object name)
   - confidence (0-100)
   - timestamps (when it appears)

6. **Transcription**: Full audio transcription with timestamps.

Format your response as valid JSON.\`;

    if (ptdFitnessOptimized) {
      return \`\${basePrompt}

**SPECIAL INSTRUCTIONS FOR PTD FITNESS AD ANALYSIS:**

Analyze this video specifically for fitness ad conversion optimization:

1. **Hook Analysis** (0-5 seconds):
   - Is there a pattern interrupt?
   - Does it directly address the target audience (e.g., "Dubai men over 40")?
   - Rate hook strength (0-100)

2. **Problem Agitation** (5-15 seconds):
   - Are pain points clearly stated?
   - Does it use conversion words like "exhausted," "stuck," "fighting you"?
   - Rate problem agitation (0-100)

3. **Solution Presentation** (15-25 seconds):
   - Is the unique mechanism clear (e.g., "Executive Edge Protocol")?
   - Does it mention credentials (master's degree coaches)?
   - Rate solution clarity (0-100)

4. **Benefits & Transformation** (25-35 seconds):
   - Are emotional benefits highlighted (e.g., "reclaim peak energy")?
   - Is there identity transformation language?
   - Rate transformation appeal (0-100)

5. **Call to Action** (35-40+ seconds):
   - Is the CTA clear and urgent?
   - Does it offer a free consultation?
   - Rate CTA effectiveness (0-100)

6. **Visual Elements**:
   - Text overlays (are they bold and readable?)
   - Color psychology (red/orange for urgency?)
   - Pacing (quick cuts vs. smooth transitions?)

7. **Audio Elements**:
   - Voice tone (authoritative yet empathetic?)
   - Background music (energetic vs. calm?)
   - Conversion words used (list them)

8. **Overall Conversion Score**: 0-100 based on V-Shred/WarriorBabe frameworks.

Include specific recommendations for improvement in each category.\`;
    }
    
    return basePrompt;
  }
  
  /**
   * Extract frames from video at regular intervals
   */
  private async extractVideoFrames(videoFile: File, numFrames: number): Promise<string[]> {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const frames: string[] = [];
      
      video.src = URL.createObjectURL(videoFile);
      video.muted = true;
      video.playsInline = true;
      
      video.onloadedmetadata = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const interval = video.duration / numFrames;
        let currentTime = 0;
        
        const captureFrame = () => {
          if (currentTime > video.duration) {
            URL.revokeObjectURL(video.src);
            resolve(frames);
            return;
          }
          video.currentTime = currentTime;
        };
        
        video.onseeked = () => {
          ctx?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
          const frameData = canvas.toDataURL('image/jpeg', 0.8).split(',')[1];
          frames.push(frameData);
          currentTime += interval;
          captureFrame();
        };
        
        video.onerror = () => reject(new Error('Failed to load video'));
        captureFrame();
      };
    });
  }
  
  /**
   * Convert file to base64
   */
  private async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = (reader.result as string).split(',')[1];
        resolve(base64);
      };
      reader.onerror = (error) => reject(error);
    });
  }
  
  /**
   * Parse Gemini response into structured data
   */
  private parseAnalysisResponse(responseText: string): Omit<VideoAnalysisResult, 'recommendations'> {
    try {
      const jsonMatch = responseText.match(/\`\`\`json\n([\s\S]*?)\n\`\`\`/);
      const jsonText = jsonMatch ? jsonMatch[1] : responseText;
      
      const parsed = JSON.parse(jsonText);
      
      return {
        summary: parsed.summary || '',
        scenes: parsed.scenes || [],
        timestamps: parsed.timestamps || [],
        emotions: parsed.emotions || [],
        objects: parsed.objects || [],
        transcription: parsed.transcription || '',
      };
    } catch (error) {
      console.error('Failed to parse analysis response:', error);
      return {
        summary: responseText.substring(0, 500),
        scenes: [],
        timestamps: [],
        emotions: [],
        objects: [],
        transcription: '',
      };
    }
  }
  
  /**
   * Generate AI-powered recommendations
   */
  private async generateRecommendations(
    analysis: Omit<VideoAnalysisResult, 'recommendations'>,
    ptdFitnessOptimized: boolean
  ): Promise<Recommendation[]> {
    const recommendationPrompt = ptdFitnessOptimized
      ? this.buildPTDRecommendationPrompt(analysis)
      : this.buildGenericRecommendationPrompt(analysis);
    
    const response = await this.ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: recommendationPrompt,
      config: {
        temperature: 0.7,
        maxOutputTokens: 2048,
      }
    });
    
    return this.parseRecommendations(response.text);
  }
  
  private buildPTDRecommendationPrompt(analysis: Omit<VideoAnalysisResult, 'recommendations'>): string {
    return \`Based on this video analysis, provide 5-10 specific, actionable recommendations to improve conversion rates for PTD Fitness ads targeting Dubai men/women 40+.

**Analysis Data:**
\${JSON.stringify(analysis, null, 2)}

**Provide recommendations in these categories:**

1. **Hook Improvements**: How to make the first 5 seconds more compelling
2. **Problem Agitation**: How to better articulate pain points
3. **Solution Clarity**: How to strengthen the unique mechanism
4. **Transformation Language**: How to enhance emotional benefits
5. **CTA Optimization**: How to make the call-to-action more urgent
6. **Visual Enhancements**: Text overlays, color psychology, pacing
7. **Audio Improvements**: Voice tone, music, conversion words

For each recommendation:
- Type: (hook, cta, visual, audio, pacing)
- Description: What to change
- Priority: 1-10 (10 = highest impact)
- Implementation: Exact steps to implement

Format as JSON array.\`;
  }
  
  private buildGenericRecommendationPrompt(analysis: Omit<VideoAnalysisResult, 'recommendations'>): string {
    return \`Based on this video analysis, provide 5-10 actionable recommendations to improve the video's effectiveness.

**Analysis Data:**
\${JSON.stringify(analysis, null, 2)}

Focus on:
1. Engagement improvements
2. Clarity enhancements
3. Pacing optimization
4. Visual/audio quality
5. Call-to-action effectiveness

Format as JSON array with: type, description, priority (1-10), implementation.\`;
  }
  
  private parseRecommendations(responseText: string): Recommendation[] {
    try {
      const jsonMatch = responseText.match(/\`\`\`json\n([\s\S]*?)\n\`\`\`/);
      const jsonText = jsonMatch ? jsonMatch[1] : responseText;
      return JSON.parse(jsonText);
    } catch (error) {
      console.error('Failed to parse recommendations:', error);
      return [];
    }
  }
  
  /**
   * Generate video from text prompt (Veo 3.1)
   */
  async generateVideo(
    prompt: string,
    options: {
      aspectRatio?: '16:9' | '9:16' | '1:1';
      resolution?: '720p' | '1080p';
      duration?: number;
      style?: string;
    } = {},
    onProgress?: (message: string) => void
  ): Promise<string> {
    const {
      aspectRatio = '9:16',
      resolution = '1080p',
      duration = 30,
      style = 'cinematic'
    } = options;
    
    onProgress?.('Initializing video generation...');
    
    const enhancedPrompt = \`\${prompt}. Style: \${style}. Duration: approximately \${duration} seconds. High quality, professional production.\`;
    
    const operation = await this.ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: enhancedPrompt,
      config: {
        numberOfVideos: 1,
        resolution,
        aspectRatio,
      }
    });
    
    let currentOperation = operation;
    while (!currentOperation.done) {
      onProgress?.('Processing video... This may take a few minutes.');
      await new Promise(resolve => setTimeout(resolve, 10000));
      currentOperation = await this.ai.operations.getVideosOperation({ operation: currentOperation });
    }
    
    const downloadLink = currentOperation.response?.generatedVideos?.[0]?.video?.uri;
    
    if (!downloadLink) {
      throw new Error('Video generation failed');
    }
    
    onProgress?.('Fetching generated video...');
    const apiKey = this.ai.apiKey || process.env.VITE_GEMINI_API_KEY;
    const response = await fetch(\`\${downloadLink}&key=\${apiKey}\`);
    const videoBlob = await response.blob();
    
    return URL.createObjectURL(videoBlob);
  }
}
