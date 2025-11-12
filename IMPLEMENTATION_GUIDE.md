# Manus Video - Comprehensive AI Studio Implementation Guide

**Complete Video Analysis & Generation System using Google Native Tools**

---

## 📋 Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Google Native Tools Stack](#google-native-tools-stack)
3. [Exact Code Implementations](#exact-code-implementations)
4. [Video Analysis Features](#video-analysis-features)
5. [Pre-Made Templates](#pre-made-templates)
6. [Maximum Effectiveness Strategy](#maximum-effectiveness-strategy)
7. [Deployment Guide](#deployment-guide)

---

## 🏗️ Architecture Overview

### System Components

```
manusvideo/
├── src/
│   ├── services/
│   │   ├── geminiService.ts          # Gemini API integration
│   │   ├── vertexAIService.ts        # Vertex AI integration
│   │   ├── videoAnalyzer.ts          # Video scanning & timestamp analysis
│   │   ├── videoReconstructor.ts     # Video reconstruction engine
│   │   └── recommendationEngine.ts   # AI-powered recommendations
│   ├── components/
│   │   ├── VideoPlayer.tsx           # Advanced video player with analysis
│   │   ├── TimestampAnalyzer.tsx     # Frame-by-frame analysis
│   │   ├── SceneDetector.tsx         # Scene detection & segmentation
│   │   └── RecommendationPanel.tsx   # AI recommendations display
│   ├── utils/
│   │   ├── frameExtractor.ts         # Extract frames from video
│   │   ├── timestampGenerator.ts     # Generate timestamps
│   │   └── videoMetadata.ts          # Extract video metadata
│   └── types/
│       └── video.ts                  # TypeScript interfaces
├── backend/
│   ├── api/
│   │   ├── analyze.ts                # Video analysis endpoint
│   │   ├── generate.ts               # Video generation endpoint
│   │   └── reconstruct.ts            # Video reconstruction endpoint
│   └── workers/
│       └── videoProcessor.ts         # Background video processing
└── templates/
    ├── ptd-fitness-ads/              # PTD Fitness ad templates
    ├── competitor-analysis/          # Competitor video analysis
    └── conversion-optimization/      # Conversion-focused templates
```

---

## 🛠️ Google Native Tools Stack

### 1. Gemini API (Primary)
- **Model**: `gemini-2.5-pro` (multimodal analysis)
- **Model**: `gemini-2.5-flash` (fast processing)
- **Model**: `veo-3.1-fast-generate-preview` (video generation)
- **Features**: Video understanding, frame analysis, transcript generation

### 2. Vertex AI (Advanced)
- **Video Intelligence API**: Scene detection, object tracking, text detection
- **AutoML Video**: Custom model training for ad analysis
- **Video Stitcher API**: Professional video reconstruction

### 3. Google Cloud (Infrastructure)
- **Cloud Storage**: Video file storage
- **Cloud Functions**: Serverless video processing
- **Cloud Run**: Containerized services
- **BigQuery**: Analytics and metrics storage

---

## 💻 Exact Code Implementations

### 1. Enhanced Gemini Service with Video Analysis

```typescript
// src/services/geminiService.ts
import { GoogleGenAI, Modality, Part } from '@google/genai';

export interface VideoAnalysisResult {
  summary: string;
  scenes: Scene[];
  timestamps: Timestamp[];
  recommendations: Recommendation[];
  emotions: EmotionData[];
  objects: ObjectDetection[];
  transcription: string;
}

export interface Scene {
  startTime: number;
  endTime: number;
  description: string;
  keyframes: string[];
  dominantEmotion: string;
  objects: string[];
  score: number;
}

export interface Timestamp {
  time: number;
  description: string;
  importance: 'high' | 'medium' | 'low';
  actionable: boolean;
}

export interface Recommendation {
  type: 'hook' | 'cta' | 'visual' | 'audio' | 'pacing';
  description: string;
  priority: number;
  implementation: string;
}

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
    options: {
      extractFrames?: number;
      analyzeEmotions?: boolean;
      detectObjects?: boolean;
      generateTimestamps?: boolean;
      ptdFitnessOptimized?: boolean;
    } = {}
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
    const basePrompt = `Analyze this video comprehensively and provide a structured JSON response with the following:

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

Format your response as valid JSON.`;

    if (ptdFitnessOptimized) {
      return `${basePrompt}

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

Include specific recommendations for improvement in each category.`;
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
      // Extract JSON from markdown code blocks if present
      const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/);
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
      // Fallback: return structured data from text
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
  
  /**
   * Build PTD Fitness-specific recommendation prompt
   */
  private buildPTDRecommendationPrompt(analysis: Omit<VideoAnalysisResult, 'recommendations'>): string {
    return `Based on this video analysis, provide 5-10 specific, actionable recommendations to improve conversion rates for PTD Fitness ads targeting Dubai men/women 40+.

**Analysis Data:**
${JSON.stringify(analysis, null, 2)}

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

Format as JSON array.`;
  }
  
  /**
   * Build generic recommendation prompt
   */
  private buildGenericRecommendationPrompt(analysis: Omit<VideoAnalysisResult, 'recommendations'>): string {
    return `Based on this video analysis, provide 5-10 actionable recommendations to improve the video's effectiveness.

**Analysis Data:**
${JSON.stringify(analysis, null, 2)}

Focus on:
1. Engagement improvements
2. Clarity enhancements
3. Pacing optimization
4. Visual/audio quality
5. Call-to-action effectiveness

Format as JSON array with: type, description, priority (1-10), implementation.`;
  }
  
  /**
   * Parse recommendations from Gemini response
   */
  private parseRecommendations(responseText: string): Recommendation[] {
    try {
      const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/);
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
    
    // Enhance prompt with style and duration
    const enhancedPrompt = `${prompt}. Style: ${style}. Duration: approximately ${duration} seconds. High quality, professional production.`;
    
    const operation = await this.ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: enhancedPrompt,
      config: {
        numberOfVideos: 1,
        resolution,
        aspectRatio,
      }
    });
    
    // Poll for completion
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
    const response = await fetch(`${downloadLink}&key=${this.ai.apiKey}`);
    const videoBlob = await response.blob();
    
    return URL.createObjectURL(videoBlob);
  }
}
```

### 2. Vertex AI Service Integration

```typescript
// src/services/vertexAIService.ts
import { VideoIntelligenceServiceClient } from '@google-cloud/video-intelligence';
import { Storage } from '@google-cloud/storage';

export interface VertexAIAnalysis {
  shots: Shot[];
  labels: Label[];
  faces: Face[];
  text: TextAnnotation[];
  objects: ObjectTracking[];
  explicitContent: ExplicitContentFrame[];
}

export interface Shot {
  startTime: number;
  endTime: number;
}

export interface Label {
  entity: string;
  confidence: number;
  segments: { startTime: number; endTime: number }[];
}

export class VertexAIVideoAnalyzer {
  private client: VideoIntelligenceServiceClient;
  private storage: Storage;
  private bucketName: string;
  
  constructor(projectId: string, bucketName: string) {
    this.client = new VideoIntelligenceServiceClient();
    this.storage = new Storage({ projectId });
    this.bucketName = bucketName;
  }
  
  /**
   * Comprehensive video analysis using Vertex AI Video Intelligence
   */
  async analyzeVideo(videoFile: File): Promise<VertexAIAnalysis> {
    // Step 1: Upload video to Cloud Storage
    const gcsUri = await this.uploadToGCS(videoFile);
    
    // Step 2: Analyze with Video Intelligence API
    const [operation] = await this.client.annotateVideo({
      inputUri: gcsUri,
      features: [
        'LABEL_DETECTION',
        'SHOT_CHANGE_DETECTION',
        'EXPLICIT_CONTENT_DETECTION',
        'FACE_DETECTION',
        'TEXT_DETECTION',
        'OBJECT_TRACKING',
      ],
      videoContext: {
        labelDetectionConfig: {
          labelDetectionMode: 'SHOT_AND_FRAME_MODE',
          stationaryCamera: false,
        },
        shotChangeDetectionConfig: {
          model: 'builtin/latest',
        },
        explicitContentDetectionConfig: {
          model: 'builtin/latest',
        },
        faceDetectionConfig: {
          model: 'builtin/latest',
          includeBoundingBoxes: true,
          includeAttributes: true,
        },
        textDetectionConfig: {
          languageHints: ['en'],
        },
        objectTrackingConfig: {
          model: 'builtin/latest',
        },
      },
    });
    
    // Step 3: Wait for operation to complete
    const [response] = await operation.promise();
    
    // Step 4: Parse results
    const annotationResults = response.annotationResults?.[0];
    
    return {
      shots: this.parseShots(annotationResults?.shotAnnotations || []),
      labels: this.parseLabels(annotationResults?.segmentLabelAnnotations || []),
      faces: this.parseFaces(annotationResults?.faceDetectionAnnotations || []),
      text: this.parseText(annotationResults?.textAnnotations || []),
      objects: this.parseObjects(annotationResults?.objectAnnotations || []),
      explicitContent: this.parseExplicitContent(annotationResults?.explicitAnnotation?.frames || []),
    };
  }
  
  /**
   * Upload video to Google Cloud Storage
   */
  private async uploadToGCS(videoFile: File): Promise<string> {
    const fileName = `videos/${Date.now()}_${videoFile.name}`;
    const file = this.storage.bucket(this.bucketName).file(fileName);
    
    const buffer = await videoFile.arrayBuffer();
    await file.save(Buffer.from(buffer), {
      metadata: {
        contentType: videoFile.type,
      },
    });
    
    return `gs://${this.bucketName}/${fileName}`;
  }
  
  /**
   * Parse shot annotations
   */
  private parseShots(shots: any[]): Shot[] {
    return shots.map(shot => ({
      startTime: this.timeToSeconds(shot.startTimeOffset),
      endTime: this.timeToSeconds(shot.endTimeOffset),
    }));
  }
  
  /**
   * Parse label annotations
   */
  private parseLabels(labels: any[]): Label[] {
    return labels.map(label => ({
      entity: label.entity?.description || '',
      confidence: label.segments?.[0]?.confidence || 0,
      segments: (label.segments || []).map((seg: any) => ({
        startTime: this.timeToSeconds(seg.segment?.startTimeOffset),
        endTime: this.timeToSeconds(seg.segment?.endTimeOffset),
      })),
    }));
  }
  
  /**
   * Parse face annotations
   */
  private parseFaces(faces: any[]): Face[] {
    return faces.map(face => ({
      thumbnails: face.thumbnails || [],
      segments: (face.segments || []).map((seg: any) => ({
        startTime: this.timeToSeconds(seg.segment?.startTimeOffset),
        endTime: this.timeToSeconds(seg.segment?.endTimeOffset),
      })),
    }));
  }
  
  /**
   * Parse text annotations
   */
  private parseText(texts: any[]): TextAnnotation[] {
    return texts.map(text => ({
      text: text.text || '',
      segments: (text.segments || []).map((seg: any) => ({
        startTime: this.timeToSeconds(seg.segment?.startTimeOffset),
        endTime: this.timeToSeconds(seg.segment?.endTimeOffset),
        confidence: seg.confidence || 0,
      })),
    }));
  }
  
  /**
   * Parse object tracking annotations
   */
  private parseObjects(objects: any[]): ObjectTracking[] {
    return objects.map(obj => ({
      entity: obj.entity?.description || '',
      confidence: obj.confidence || 0,
      frames: (obj.frames || []).map((frame: any) => ({
        time: this.timeToSeconds(frame.timeOffset),
        boundingBox: frame.normalizedBoundingBox,
      })),
    }));
  }
  
  /**
   * Parse explicit content annotations
   */
  private parseExplicitContent(frames: any[]): ExplicitContentFrame[] {
    return frames.map(frame => ({
      time: this.timeToSeconds(frame.timeOffset),
      pornographyLikelihood: frame.pornographyLikelihood || 'UNKNOWN',
    }));
  }
  
  /**
   * Convert protobuf time to seconds
   */
  private timeToSeconds(time: any): number {
    if (!time) return 0;
    const seconds = parseInt(time.seconds || '0', 10);
    const nanos = parseInt(time.nanos || '0', 10);
    return seconds + nanos / 1e9;
  }
}
```

### 3. Video Reconstruction Engine

```typescript
// src/services/videoReconstructor.ts
import { GeminiVideoAnalyzer, VideoAnalysisResult } from './geminiService';
import { VertexAIVideoAnalyzer, VertexAIAnalysis } from './vertexAIService';

export interface ReconstructionOptions {
  targetDuration?: number;
  targetAspectRatio?: '16:9' | '9:16' | '1:1';
  optimizeFor?: 'engagement' | 'conversion' | 'brand';
  includeScenes?: number[];
  excludeScenes?: number[];
  addTextOverlays?: boolean;
  addMusic?: boolean;
  ptdFitnessOptimized?: boolean;
}

export interface ReconstructedVideo {
  videoUrl: string;
  metadata: {
    duration: number;
    scenes: number;
    improvements: string[];
  };
}

export class VideoReconstructor {
  private geminiAnalyzer: GeminiVideoAnalyzer;
  private vertexAnalyzer: VertexAIVideoAnalyzer;
  
  constructor(geminiApiKey: string, vertexProjectId: string, bucketName: string) {
    this.geminiAnalyzer = new GeminiVideoAnalyzer(geminiApiKey);
    this.vertexAnalyzer = new VertexAIVideoAnalyzer(vertexProjectId, bucketName);
  }
  
  /**
   * Reconstruct video based on analysis and optimization goals
   */
  async reconstructVideo(
    originalVideo: File,
    options: ReconstructionOptions = {}
  ): Promise<ReconstructedVideo> {
    const {
      targetDuration = 30,
      targetAspectRatio = '9:16',
      optimizeFor = 'conversion',
      includeScenes,
      excludeScenes,
      addTextOverlays = true,
      addMusic = true,
      ptdFitnessOptimized = false,
    } = options;
    
    // Step 1: Analyze original video
    const geminiAnalysis = await this.geminiAnalyzer.analyzeVideo(originalVideo, {
      extractFrames: 30,
      analyzeEmotions: true,
      detectObjects: true,
      generateTimestamps: true,
      ptdFitnessOptimized,
    });
    
    const vertexAnalysis = await this.vertexAnalyzer.analyzeVideo(originalVideo);
    
    // Step 2: Select best scenes based on optimization goal
    const selectedScenes = this.selectBestScenes(
      geminiAnalysis,
      vertexAnalysis,
      targetDuration,
      optimizeFor,
      includeScenes,
      excludeScenes
    );
    
    // Step 3: Generate reconstruction prompt
    const reconstructionPrompt = this.buildReconstructionPrompt(
      geminiAnalysis,
      selectedScenes,
      targetAspectRatio,
      optimizeFor,
      ptdFitnessOptimized
    );
    
    // Step 4: Generate reconstructed video using Veo 3.1
    const videoUrl = await this.geminiAnalyzer.generateVideo(
      reconstructionPrompt,
      {
        aspectRatio: targetAspectRatio,
        resolution: '1080p',
        duration: targetDuration,
        style: ptdFitnessOptimized ? 'dynamic, high-energy fitness ad' : 'professional',
      }
    );
    
    return {
      videoUrl,
      metadata: {
        duration: targetDuration,
        scenes: selectedScenes.length,
        improvements: geminiAnalysis.recommendations.map(r => r.description),
      },
    };
  }
  
  /**
   * Select best scenes based on optimization goal
   */
  private selectBestScenes(
    geminiAnalysis: VideoAnalysisResult,
    vertexAnalysis: VertexAIAnalysis,
    targetDuration: number,
    optimizeFor: string,
    includeScenes?: number[],
    excludeScenes?: number[]
  ): any[] {
    let scenes = geminiAnalysis.scenes;
    
    // Filter scenes
    if (includeScenes) {
      scenes = scenes.filter((_, i) => includeScenes.includes(i));
    }
    if (excludeScenes) {
      scenes = scenes.filter((_, i) => !excludeScenes.includes(i));
    }
    
    // Score scenes based on optimization goal
    const scoredScenes = scenes.map(scene => {
      let score = scene.score;
      
      if (optimizeFor === 'engagement') {
        // Prioritize high-energy, emotional scenes
        const emotionBoost = scene.dominantEmotion === 'excited' ? 20 : 0;
        score += emotionBoost;
      } else if (optimizeFor === 'conversion') {
        // Prioritize scenes with clear messaging
        const objectBoost = scene.objects.length > 3 ? 10 : 0;
        score += objectBoost;
      }
      
      return { ...scene, finalScore: score };
    });
    
    // Sort by score and select top scenes that fit target duration
    scoredScenes.sort((a, b) => b.finalScore - a.finalScore);
    
    const selectedScenes = [];
    let totalDuration = 0;
    
    for (const scene of scoredScenes) {
      const sceneDuration = scene.endTime - scene.startTime;
      if (totalDuration + sceneDuration <= targetDuration) {
        selectedScenes.push(scene);
        totalDuration += sceneDuration;
      }
      if (totalDuration >= targetDuration * 0.9) break;
    }
    
    return selectedScenes;
  }
  
  /**
   * Build reconstruction prompt for Veo 3.1
   */
  private buildReconstructionPrompt(
    analysis: VideoAnalysisResult,
    selectedScenes: any[],
    aspectRatio: string,
    optimizeFor: string,
    ptdFitnessOptimized: boolean
  ): string {
    let prompt = `Create a professional video with the following scenes:\n\n`;
    
    selectedScenes.forEach((scene, i) => {
      prompt += `Scene ${i + 1} (${scene.endTime - scene.startTime}s): ${scene.description}\n`;
      prompt += `- Emotion: ${scene.dominantEmotion}\n`;
      prompt += `- Key objects: ${scene.objects.join(', ')}\n\n`;
    });
    
    if (ptdFitnessOptimized) {
      prompt += `\n**PTD FITNESS AD OPTIMIZATION:**\n`;
      prompt += `- Start with a powerful hook addressing "Dubai men/women over 40"\n`;
      prompt += `- Use quick cuts and dynamic transitions\n`;
      prompt += `- Include bold text overlays with conversion words\n`;
      prompt += `- Apply red/orange color psychology for urgency\n`;
      prompt += `- End with a clear, urgent call-to-action\n`;
      prompt += `- Style: High-energy, V-Shred/WarriorBabe inspired\n`;
    }
    
    prompt += `\nAspect ratio: ${aspectRatio}\n`;
    prompt += `Optimization goal: ${optimizeFor}\n`;
    prompt += `Overall tone: Professional, engaging, high-quality production\n`;
    
    return prompt;
  }
}
```

---

## 🎯 Video Analysis Features

### 1. Timestamp Analysis Component

```typescript
// src/components/TimestampAnalyzer.tsx
import React, { useState, useEffect } from 'react';
import { VideoAnalysisResult } from '../services/geminiService';

interface TimestampAnalyzerProps {
  analysis: VideoAnalysisResult;
  videoRef: React.RefObject<HTMLVideoElement>;
}

export const TimestampAnalyzer: React.FC<TimestampAnalyzerProps> = ({ analysis, videoRef }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [activeTimestamp, setActiveTimestamp] = useState<any>(null);
  
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      
      // Find active timestamp
      const active = analysis.timestamps.find(
        t => Math.abs(t.time - video.currentTime) < 0.5
      );
      setActiveTimestamp(active);
    };
    
    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, [analysis, videoRef]);
  
  const jumpToTimestamp = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };
  
  return (
    <div className="timestamp-analyzer">
      <h3 className="text-xl font-bold mb-4">Timestamp Analysis</h3>
      
      {/* Active Timestamp Alert */}
      {activeTimestamp && (
        <div className="bg-violet-600 p-4 rounded-lg mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-bold">⏱️ {activeTimestamp.time.toFixed(1)}s</span>
            <span className={`px-2 py-1 rounded text-xs ${
              activeTimestamp.importance === 'high' ? 'bg-red-500' :
              activeTimestamp.importance === 'medium' ? 'bg-yellow-500' :
              'bg-green-500'
            }`}>
              {activeTimestamp.importance.toUpperCase()}
            </span>
          </div>
          <p>{activeTimestamp.description}</p>
          {activeTimestamp.actionable && (
            <p className="text-sm mt-2 text-violet-200">💡 This moment can be improved</p>
          )}
        </div>
      )}
      
      {/* Timestamp List */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {analysis.timestamps.map((timestamp, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg cursor-pointer transition-colors ${
              Math.abs(timestamp.time - currentTime) < 0.5
                ? 'bg-violet-600'
                : 'bg-slate-800 hover:bg-slate-700'
            }`}
            onClick={() => jumpToTimestamp(timestamp.time)}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-sm">{timestamp.time.toFixed(1)}s</span>
              <span className={`px-2 py-0.5 rounded text-xs ${
                timestamp.importance === 'high' ? 'bg-red-500' :
                timestamp.importance === 'medium' ? 'bg-yellow-500' :
                'bg-green-500'
              }`}>
                {timestamp.importance}
              </span>
            </div>
            <p className="text-sm">{timestamp.description}</p>
            {timestamp.actionable && (
              <p className="text-xs text-violet-300 mt-1">✨ Actionable</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
```

### 2. Advanced Video Player with Analysis Overlay

```typescript
// src/components/VideoPlayer.tsx
import React, { useRef, useState, useEffect } from 'react';
import { VideoAnalysisResult } from '../services/geminiService';

interface VideoPlayerProps {
  videoUrl: string;
  analysis: VideoAnalysisResult;
  showAnalysisOverlay?: boolean;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  analysis,
  showAnalysisOverlay = true,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentScene, setCurrentScene] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      
      // Find current scene
      const scene = analysis.scenes.find(
        s => video.currentTime >= s.startTime && video.currentTime <= s.endTime
      );
      setCurrentScene(scene);
    };
    
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [analysis]);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="relative">
      {/* Video Element */}
      <video
        ref={videoRef}
        src={videoUrl}
        controls
        className="w-full rounded-lg"
      />
      
      {/* Analysis Overlay */}
      {showAnalysisOverlay && currentScene && (
        <div className="absolute bottom-20 left-4 right-4 bg-black/80 p-4 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-sm font-mono">{formatTime(currentTime)}</span>
            <span className="px-2 py-1 bg-violet-600 rounded text-xs">
              Scene {analysis.scenes.indexOf(currentScene) + 1}
            </span>
            <span className="px-2 py-1 bg-blue-600 rounded text-xs">
              {currentScene.dominantEmotion}
            </span>
            <span className="px-2 py-1 bg-green-600 rounded text-xs">
              Score: {currentScene.score}/100
            </span>
          </div>
          <p className="text-sm">{currentScene.description}</p>
          {currentScene.objects.length > 0 && (
            <p className="text-xs text-slate-400 mt-1">
              Objects: {currentScene.objects.join(', ')}
            </p>
          )}
        </div>
      )}
      
      {/* Scene Timeline */}
      <div className="mt-4">
        <div className="relative h-8 bg-slate-800 rounded-lg overflow-hidden">
          {analysis.scenes.map((scene, i) => {
            const duration = videoRef.current?.duration || 1;
            const left = (scene.startTime / duration) * 100;
            const width = ((scene.endTime - scene.startTime) / duration) * 100;
            
            return (
              <div
                key={i}
                className="absolute top-0 bottom-0 bg-violet-600 opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
                style={{ left: `${left}%`, width: `${width}%` }}
                onClick={() => {
                  if (videoRef.current) {
                    videoRef.current.currentTime = scene.startTime;
                  }
                }}
                title={scene.description}
              />
            );
          })}
          
          {/* Current Time Indicator */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white"
            style={{
              left: `${(currentTime / (videoRef.current?.duration || 1)) * 100}%`,
            }}
          />
        </div>
        
        <div className="flex justify-between text-xs text-slate-400 mt-1">
          <span>{analysis.scenes.length} scenes detected</span>
          <span>{formatTime(videoRef.current?.duration || 0)}</span>
        </div>
      </div>
    </div>
  );
};
```

---

## 📝 Pre-Made Templates

### PTD Fitness Ad Template

```typescript
// templates/ptd-fitness-ads/dubai-men-40plus.ts
export const DubaiMen40PlusTemplate = {
  name: 'Dubai Men 40+ Executive Edge',
  targetAudience: 'Dubai men over 40, professionals, executives',
  duration: 40,
  aspectRatio: '9:16' as const,
  
  structure: {
    hook: {
      duration: 5,
      prompt: `Direct-to-camera shot of a confident, fit man in his 40s in a Dubai gym setting. 
      He looks directly at camera with authority. Text overlay appears: "Dubai Men Over 40..."
      Quick zoom in on his face. High energy, pattern interrupt.`,
      textOverlays: [
        { text: 'Dubai Men Over 40', time: 0, duration: 2, style: 'bold, large' },
        { text: 'Stop Scrolling', time: 2, duration: 1, style: 'urgent, red' },
      ],
      conversionWords: ['stop scrolling', 'exhausted', 'weight creep'],
    },
    
    problemAgitation: {
      duration: 10,
      prompt: `Show frustrated man looking in mirror, checking watch (busy schedule), 
      tired at desk. Quick cuts between scenes. Text overlays highlight pain points.
      Tone: empathetic but urgent.`,
      textOverlays: [
        { text: 'Exhausted Despite Trying Everything?', time: 5, duration: 3 },
        { text: 'Body Fighting You?', time: 8, duration: 2 },
        { text: 'Nothing Works Anymore?', time: 10, duration: 3 },
      ],
      conversionWords: ['exhausted', 'fighting you', 'tried everything', 'sad reality'],
    },
    
    solution: {
      duration: 10,
      prompt: `Show transformation: Man training with professional coach (master's degree visible on wall).
      One-on-one attention. Scientific equipment. Dubai skyline in background.
      Text: "Executive Edge Protocol" appears. Confident, authoritative tone.`,
      textOverlays: [
        { text: "Here's The Hidden Truth", time: 15, duration: 2, style: 'revelation' },
        { text: 'Executive Edge Protocol', time: 17, duration: 3, style: 'bold, branded' },
        { text: "Master's Degree Coaches", time: 20, duration: 3, style: 'credibility' },
      ],
      conversionWords: ['hidden truth', 'cracked the code', 'personalized', 'master degree'],
    },
    
    benefits: {
      duration: 10,
      prompt: `Show transformation results: Man confidently presenting in boardroom, 
      energetic with family, looking great in mirror. Quick, inspiring cuts.
      Emotional, aspirational tone.`,
      textOverlays: [
        { text: 'Reclaim Peak Energy', time: 25, duration: 2 },
        { text: 'Boost Career Performance', time: 27, duration: 2 },
        { text: 'Feel Confident Again', time: 29, duration: 3 },
      ],
      conversionWords: ['reclaim', 'peak energy', 'confident', 'permanent transformation'],
    },
    
    cta: {
      duration: 5,
      prompt: `Direct-to-camera shot. Man smiling confidently. 
      Large text overlay with CTA. Urgent but friendly tone.`,
      textOverlays: [
        { text: 'Click Below', time: 35, duration: 2, style: 'urgent, large' },
        { text: 'Free Consultation', time: 37, duration: 2, style: 'value, green' },
        { text: "Let's Transform You", time: 39, duration: 1, style: 'action' },
      ],
      conversionWords: ['free consultation', 'click below', 'best shape of your life'],
    },
  },
  
  visualStyle: {
    colorPalette: ['#FF4500', '#FF8C00', '#000000', '#FFFFFF'],
    pacing: 'quick cuts (2-3s per shot)',
    transitions: 'dynamic zoom, quick fade',
    textStyle: 'bold, sans-serif, high contrast',
  },
  
  audioGuidelines: {
    voiceTone: 'authoritative yet empathetic, direct',
    music: 'high-energy, motivational, subtle background',
    soundEffects: 'whoosh for text overlays, subtle impact sounds',
  },
  
  optimizationScore: {
    hookStrength: 90,
    problemAgitation: 85,
    solutionClarity: 95,
    transformationAppeal: 88,
    ctaEffectiveness: 92,
    overall: 90,
  },
};
```

---

## 🚀 Maximum Effectiveness Strategy

### 1. Multi-API Orchestration

```typescript
// src/services/orchestrator.ts
import { GeminiVideoAnalyzer } from './geminiService';
import { VertexAIVideoAnalyzer } from './vertexAIService';
import { VideoReconstructor } from './videoReconstructor';

export class VideoAnalysisOrchestrator {
  private gemini: GeminiVideoAnalyzer;
  private vertex: VertexAIVideoAnalyzer;
  private reconstructor: VideoReconstructor;
  
  constructor(config: {
    geminiApiKey: string;
    vertexProjectId: string;
    bucketName: string;
  }) {
    this.gemini = new GeminiVideoAnalyzer(config.geminiApiKey);
    this.vertex = new VertexAIVideoAnalyzer(config.vertexProjectId, config.bucketName);
    this.reconstructor = new VideoReconstructor(
      config.geminiApiKey,
      config.vertexProjectId,
      config.bucketName
    );
  }
  
  /**
   * Complete video analysis using all 3 APIs
   */
  async analyzeComprehensive(videoFile: File) {
    // Run analyses in parallel for maximum speed
    const [geminiAnalysis, vertexAnalysis] = await Promise.all([
      this.gemini.analyzeVideo(videoFile, {
        extractFrames: 30,
        analyzeEmotions: true,
        detectObjects: true,
        generateTimestamps: true,
        ptdFitnessOptimized: true,
      }),
      this.vertex.analyzeVideo(videoFile),
    ]);
    
    // Merge results
    return {
      gemini: geminiAnalysis,
      vertex: vertexAnalysis,
      combined: this.mergeAnalyses(geminiAnalysis, vertexAnalysis),
    };
  }
  
  /**
   * Merge analyses from multiple APIs
   */
  private mergeAnalyses(gemini: any, vertex: any) {
    return {
      summary: gemini.summary,
      scenes: gemini.scenes,
      timestamps: gemini.timestamps,
      recommendations: gemini.recommendations,
      
      // Enhanced with Vertex AI data
      labels: vertex.labels,
      faces: vertex.faces,
      text: vertex.text,
      objects: vertex.objects,
      
      // Combined insights
      qualityScore: this.calculateQualityScore(gemini, vertex),
      conversionScore: this.calculateConversionScore(gemini),
    };
  }
  
  private calculateQualityScore(gemini: any, vertex: any): number {
    let score = 0;
    
    // Video quality indicators
    if (vertex.explicitContent.length === 0) score += 20;
    if (vertex.labels.length > 10) score += 20;
    if (vertex.faces.length > 0) score += 20;
    if (gemini.scenes.length >= 5) score += 20;
    if (gemini.transcription.length > 100) score += 20;
    
    return score;
  }
  
  private calculateConversionScore(gemini: any): number {
    let score = 0;
    
    // Check for conversion elements
    const hasHook = gemini.scenes[0]?.score > 80;
    const hasCTA = gemini.timestamps.some((t: any) => 
      t.description.toLowerCase().includes('call to action')
    );
    const hasEmotionalAppeal = gemini.emotions.some((e: any) => 
      ['excited', 'happy', 'confident'].includes(e.emotion)
    );
    
    if (hasHook) score += 30;
    if (hasCTA) score += 30;
    if (hasEmotionalAppeal) score += 20;
    if (gemini.recommendations.length > 0) score += 20;
    
    return score;
  }
}
```

### 2. Batch Processing Strategy

```typescript
// src/services/batchProcessor.ts
export class BatchVideoProcessor {
  private orchestrator: VideoAnalysisOrchestrator;
  private maxConcurrent: number = 5;
  
  constructor(orchestrator: VideoAnalysisOrchestrator) {
    this.orchestrator = orchestrator;
  }
  
  /**
   * Process multiple videos in parallel
   */
  async processBatch(
    videos: File[],
    onProgress: (completed: number, total: number) => void
  ) {
    const results = [];
    let completed = 0;
    
    // Process in chunks to avoid rate limits
    for (let i = 0; i < videos.length; i += this.maxConcurrent) {
      const chunk = videos.slice(i, i + this.maxConcurrent);
      
      const chunkResults = await Promise.all(
        chunk.map(async (video) => {
          try {
            const analysis = await this.orchestrator.analyzeComprehensive(video);
            completed++;
            onProgress(completed, videos.length);
            return { video: video.name, analysis, error: null };
          } catch (error) {
            completed++;
            onProgress(completed, videos.length);
            return { video: video.name, analysis: null, error: error.message };
          }
        })
      );
      
      results.push(...chunkResults);
    }
    
    return results;
  }
}
```

---

## 📦 Deployment Guide

### 1. Environment Setup

```bash
# .env
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_VERTEX_PROJECT_ID=your_gcp_project_id
VITE_GCS_BUCKET_NAME=your_bucket_name
GOOGLE_APPLICATION_CREDENTIALS=./service-account-key.json
```

### 2. Install Dependencies

```bash
npm install @google/genai @google-cloud/video-intelligence @google-cloud/storage
npm install react react-dom typescript vite
npm install tailwindcss postcss autoprefixer
```

### 3. Build and Deploy

```bash
# Build for production
npm run build

# Deploy to Cloud Run
gcloud run deploy manusvideo \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

---

## 🎯 Next Steps

1. **Clone this repository** to your local machine
2. **Set up environment variables** with your API keys
3. **Install dependencies** with `npm install`
4. **Run development server** with `npm run dev`
5. **Test video analysis** with sample videos
6. **Deploy to production** using Cloud Run

For questions or support, open an issue on GitHub.
