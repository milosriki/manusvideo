# Maximum Effectiveness Strategy for Manus Video AI Studio

**Complete guide with exact code, prompts, imports, and integration strategies**

---

## 🎯 Overview

This document provides the complete strategy for building a maximum-effectiveness video analysis and generation system using Google's native tools. It includes exact code implementations, prompts, imports, and integration strategies.

---

## 📦 Exact Imports to Use

### Core Gemini API Imports

```typescript
// Primary imports for video analysis
import { GoogleGenAI, Modality, Part, Type } from '@google/genai';

// For video generation
import type { GenerateContentResponse } from '@google/genai';

// For chat functionality
import { Chat } from '@google/genai';
```

### Vertex AI Imports (Advanced Features)

```typescript
// Video Intelligence API
import { VideoIntelligenceServiceClient } from '@google-cloud/video-intelligence';
import { protos } from '@google-cloud/video-intelligence';

// Cloud Storage for video uploads
import { Storage } from '@google-cloud/storage';

// Type definitions
import type { google } from '@google-cloud/video-intelligence/build/protos/protos';
```

### React & TypeScript Imports

```typescript
// React essentials
import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom/client';

// Type definitions
import type { FC, ChangeEvent, MouseEvent } from 'react';
```

---

## 🔧 Exact Configuration

### package.json Dependencies

```json
{
  "dependencies": {
    "@google/genai": "^0.21.0",
    "@google-cloud/video-intelligence": "^5.2.0",
    "@google-cloud/storage": "^7.7.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "recharts": "^2.10.3",
    "@tanstack/react-table": "^8.11.2"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@vitejs/plugin-react": "^4.2.1",
    "typescript": "^5.2.2",
    "vite": "^5.0.8",
    "tailwindcss": "^3.3.6"
  }
}
```

### Environment Variables

```env
# Gemini API (Primary)
VITE_GEMINI_API_KEY=AIzaSy...your_key_here

# Vertex AI (Advanced)
VITE_VERTEX_PROJECT_ID=your-gcp-project-id
VITE_GCS_BUCKET_NAME=your-video-bucket

# Google Cloud Credentials
GOOGLE_APPLICATION_CREDENTIALS=./service-account-key.json
```

---

## 📝 Exact Prompts for Video Analysis

### 1. Basic Video Analysis Prompt

```typescript
const basicAnalysisPrompt = `Analyze this video comprehensively and provide a structured JSON response with the following:

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
```

### 2. PTD Fitness Optimization Prompt

```typescript
const ptdFitnessPrompt = `${basicAnalysisPrompt}

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
```

### 3. Video Generation Prompts (PTD Fitness Templates)

#### Hook Prompt (0-5s)

```typescript
const hookPrompt = `Create a 5-second video hook for a fitness ad targeting Dubai men over 40.

**Scene**: Direct-to-camera shot of a confident, fit man in his 40s in a modern Dubai gym. He looks directly at the camera with authority and empathy.

**Action**: 
- 0-2s: Man appears on screen, direct eye contact
- 2-3s: Quick zoom in on his face
- 3-5s: Text overlay appears: "Dubai Men Over 40... Stop Scrolling"

**Visual Style**:
- High-energy, pattern interrupt
- Bold text overlays (white text, red/orange background)
- Quick, dynamic camera movement
- Professional lighting, Dubai skyline visible in background

**Tone**: Authoritative yet empathetic, urgent but not aggressive

**Text Overlays**:
- "Dubai Men Over 40" (0-2s, bold, large, white text)
- "Stop Scrolling" (2-5s, urgent, red background, pulsing effect)

Style: Cinematic, high-contrast, professional fitness ad, V-Shred inspired.`;
```

#### Problem Agitation Prompt (5-15s)

```typescript
const problemPrompt = `Create a 10-second problem agitation segment for a fitness ad targeting Dubai men over 40.

**Scene**: Show a frustrated man in his 40s experiencing common pain points.

**Shots** (quick cuts, 2-3s each):
1. Man looking in mirror, disappointed with reflection
2. Checking watch at desk, stressed and exhausted
3. Trying to exercise, struggling, giving up
4. Sitting on couch, tired, defeated

**Text Overlays**:
- "Exhausted Despite Trying Everything?" (5-8s)
- "Body Fighting You?" (8-10s)
- "Nothing Works Anymore?" (10-13s)

**Visual Style**:
- Slightly desaturated colors (to show struggle)
- Quick cuts between scenes (2-3s each)
- Empathetic but urgent tone
- Relatable, real-life situations

**Emotion**: Frustration, exhaustion, disappointment, but with hope

Style: Empathetic storytelling, WarriorBabe inspired, relatable pain points.`;
```

#### Solution Prompt (15-25s)

```typescript
const solutionPrompt = `Create a 10-second solution presentation for PTD Fitness targeting Dubai men over 40.

**Scene**: Transformation moment - professional 1-on-1 training session.

**Shots**:
1. Man training with professional coach (master's degree visible on wall)
2. One-on-one attention, personalized guidance
3. Scientific equipment, modern facility
4. Dubai skyline in background (aspirational)

**Text Overlays**:
- "Here's The Hidden Truth" (15-17s, revelation style)
- "Executive Edge Protocol" (17-20s, bold, branded, orange/red)
- "Master's Degree Coaches" (20-23s, credibility, white text)

**Visual Style**:
- Vibrant colors (showing transformation)
- Confident, authoritative tone
- Professional, high-end facility
- Emphasis on personalization and expertise

**Key Elements**:
- Show coach credentials clearly
- Emphasize 1-on-1 personal training
- Dubai-specific branding
- Scientific, professional approach

Style: Authoritative, credible, transformation-focused, V-Shred inspired.`;
```

#### Benefits Prompt (25-35s)

```typescript
const benefitsPrompt = `Create a 10-second benefits and transformation segment for PTD Fitness.

**Scene**: Show the transformed life of a man who completed the program.

**Shots** (quick, inspiring cuts):
1. Man confidently presenting in boardroom (career success)
2. Energetic with family, playing with kids (family life)
3. Looking great in mirror, smiling (self-confidence)
4. Enjoying Dubai lifestyle (beach, restaurants)

**Text Overlays**:
- "Reclaim Peak Energy" (25-27s)
- "Boost Career Performance" (27-29s)
- "Feel Confident Again" (29-32s)

**Visual Style**:
- Vibrant, saturated colors (showing success)
- Quick, energetic cuts
- Aspirational lifestyle shots
- Emotional, inspiring tone

**Emotion**: Confidence, success, happiness, transformation

Style: Aspirational, emotional, identity transformation, WarriorBabe inspired.`;
```

#### CTA Prompt (35-40s)

```typescript
const ctaPrompt = `Create a 5-second call-to-action for PTD Fitness targeting Dubai men over 40.

**Scene**: Direct-to-camera shot, man smiling confidently.

**Action**:
- Man looks directly at camera
- Confident, friendly smile
- Inviting gesture (hand motion toward camera)

**Text Overlays**:
- "Click Below" (35-37s, large, urgent, orange/red)
- "Free Consultation" (37-39s, value proposition, green)
- "Let's Transform You" (39-40s, action-oriented, white)

**Visual Style**:
- High energy, urgent but friendly
- Bold, large text overlays
- Clear, unambiguous CTA
- Professional, trustworthy

**Key Elements**:
- Free consultation offer (removes barrier)
- Urgent but not pushy
- Clear next step
- Dubai-specific landing page

Style: Urgent, clear, action-oriented, proven fitness CTA.`;
```

---

## 💻 Exact Code Implementations

### 1. Complete Video Analysis Function

```typescript
import { GoogleGenAI, Part } from '@google/genai';

async function analyzeVideoComplete(
  videoFile: File,
  apiKey: string,
  ptdOptimized: boolean = false
): Promise<VideoAnalysisResult> {
  // Initialize Gemini
  const ai = new GoogleGenAI({ apiKey });
  
  // Step 1: Extract frames (30 frames for comprehensive analysis)
  const frames = await extractFrames(videoFile, 30);
  
  // Step 2: Convert video to base64
  const videoBase64 = await fileToBase64(videoFile);
  
  // Step 3: Build prompt
  const prompt = ptdOptimized ? ptdFitnessPrompt : basicAnalysisPrompt;
  
  // Step 4: Create parts array
  const parts: Part[] = [
    { text: prompt },
    { inlineData: { mimeType: videoFile.type, data: videoBase64 } },
    ...frames.map(frame => ({
      inlineData: { mimeType: 'image/jpeg', data: frame }
    }))
  ];
  
  // Step 5: Analyze with Gemini 2.5 Pro
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-pro',
    contents: { parts },
    config: {
      temperature: 0.4,      // Lower for more consistent analysis
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192, // Large enough for detailed analysis
    }
  });
  
  // Step 6: Parse JSON response
  const analysis = parseJSON(response.text);
  
  // Step 7: Generate recommendations
  const recommendations = await generateRecommendations(ai, analysis, ptdOptimized);
  
  return {
    ...analysis,
    recommendations
  };
}

// Helper: Extract frames from video
async function extractFrames(videoFile: File, numFrames: number): Promise<string[]> {
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

// Helper: Convert file to base64
async function fileToBase64(file: File): Promise<string> {
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

// Helper: Parse JSON from response
function parseJSON(responseText: string): any {
  try {
    // Extract JSON from markdown code blocks
    const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/);
    const jsonText = jsonMatch ? jsonMatch[1] : responseText;
    return JSON.parse(jsonText);
  } catch (error) {
    console.error('Failed to parse JSON:', error);
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
```

### 2. Video Generation with Progress Tracking

```typescript
async function generateVideoWithProgress(
  prompt: string,
  apiKey: string,
  options: {
    aspectRatio?: '16:9' | '9:16' | '1:1';
    resolution?: '720p' | '1080p';
    duration?: number;
  } = {},
  onProgress?: (message: string, percentage: number) => void
): Promise<string> {
  const ai = new GoogleGenAI({ apiKey });
  
  const {
    aspectRatio = '9:16',
    resolution = '1080p',
    duration = 30,
  } = options;
  
  // Step 1: Start generation
  onProgress?.('Initializing video generation...', 0);
  
  const operation = await ai.models.generateVideos({
    model: 'veo-3.1-fast-generate-preview',
    prompt: `${prompt}. Duration: approximately ${duration} seconds. High quality, professional production.`,
    config: {
      numberOfVideos: 1,
      resolution,
      aspectRatio,
    }
  });
  
  // Step 2: Poll for completion
  let currentOperation = operation;
  let pollCount = 0;
  const maxPolls = 60; // 10 minutes max
  
  while (!currentOperation.done && pollCount < maxPolls) {
    const percentage = Math.min(90, (pollCount / maxPolls) * 100);
    onProgress?.(`Processing video... (${Math.round(percentage)}%)`, percentage);
    
    await new Promise(resolve => setTimeout(resolve, 10000)); // Wait 10s
    currentOperation = await ai.operations.getVideosOperation({ operation: currentOperation });
    pollCount++;
  }
  
  if (!currentOperation.done) {
    throw new Error('Video generation timed out');
  }
  
  // Step 3: Download video
  onProgress?.('Downloading video...', 95);
  
  const downloadLink = currentOperation.response?.generatedVideos?.[0]?.video?.uri;
  if (!downloadLink) {
    throw new Error('Video generation failed - no download link');
  }
  
  const response = await fetch(`${downloadLink}&key=${apiKey}`);
  if (!response.ok) {
    throw new Error(`Failed to download video: ${response.statusText}`);
  }
  
  const videoBlob = await response.blob();
  const videoUrl = URL.createObjectURL(videoBlob);
  
  onProgress?.('Video ready!', 100);
  
  return videoUrl;
}
```

### 3. Batch Processing with Parallel Execution

```typescript
async function batchAnalyzeVideos(
  videos: File[],
  apiKey: string,
  ptdOptimized: boolean = false,
  maxConcurrent: number = 3,
  onProgress?: (completed: number, total: number) => void
): Promise<Array<{ video: string; analysis: VideoAnalysisResult | null; error: string | null }>> {
  const results: Array<{ video: string; analysis: VideoAnalysisResult | null; error: string | null }> = [];
  let completed = 0;
  
  // Process in chunks to avoid rate limits
  for (let i = 0; i < videos.length; i += maxConcurrent) {
    const chunk = videos.slice(i, i + maxConcurrent);
    
    const chunkResults = await Promise.all(
      chunk.map(async (video) => {
        try {
          const analysis = await analyzeVideoComplete(video, apiKey, ptdOptimized);
          completed++;
          onProgress?.(completed, videos.length);
          return { video: video.name, analysis, error: null };
        } catch (error: any) {
          completed++;
          onProgress?.(completed, videos.length);
          return { video: video.name, analysis: null, error: error.message };
        }
      })
    );
    
    results.push(...chunkResults);
  }
  
  return results;
}
```

---

## 🔗 Integration Strategies

### 1. HubSpot Integration

```typescript
// Store video analysis in HubSpot as custom properties
async function saveToHubSpot(
  videoUrl: string,
  analysis: VideoAnalysisResult,
  contactEmail: string
) {
  const hubspotApiKey = process.env.HUBSPOT_API_KEY;
  
  // Find or create contact
  const contactResponse = await fetch(
    `https://api.hubapi.com/contacts/v1/contact/email/${contactEmail}/profile`,
    {
      headers: {
        'Authorization': `Bearer ${hubspotApiKey}`,
        'Content-Type': 'application/json',
      },
    }
  );
  
  const contact = await contactResponse.json();
  
  // Update contact with video analysis
  await fetch(
    `https://api.hubapi.com/contacts/v1/contact/vid/${contact.vid}/profile`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${hubspotApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        properties: [
          {
            property: 'video_analysis_url',
            value: videoUrl,
          },
          {
            property: 'video_conversion_score',
            value: analysis.conversionScore?.toString() || '0',
          },
          {
            property: 'video_hook_strength',
            value: analysis.scenes[0]?.score.toString() || '0',
          },
          {
            property: 'video_analyzed_date',
            value: new Date().toISOString(),
          },
        ],
      }),
    }
  );
}
```

### 2. n8n Workflow Integration

```typescript
// Trigger n8n workflow after video analysis
async function triggerN8nWorkflow(
  analysis: VideoAnalysisResult,
  videoUrl: string
) {
  const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
  
  await fetch(n8nWebhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      event: 'video_analyzed',
      data: {
        videoUrl,
        conversionScore: analysis.conversionScore,
        hookStrength: analysis.scenes[0]?.score,
        recommendations: analysis.recommendations.slice(0, 5), // Top 5
        timestamp: new Date().toISOString(),
      },
    }),
  });
}
```

### 3. Supabase Storage Integration

```typescript
import { createClient } from '@supabase/supabase-js';

async function saveToSupabase(
  videoFile: File,
  analysis: VideoAnalysisResult
) {
  const supabase = createClient(
    process.env.VITE_SUPABASE_URL!,
    process.env.VITE_SUPABASE_KEY!
  );
  
  // Upload video to Supabase Storage
  const fileName = `${Date.now()}_${videoFile.name}`;
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('videos')
    .upload(fileName, videoFile);
  
  if (uploadError) throw uploadError;
  
  // Get public URL
  const { data: urlData } = supabase.storage
    .from('videos')
    .getPublicUrl(fileName);
  
  // Store analysis in database
  const { data, error } = await supabase
    .from('video_analyses')
    .insert({
      video_url: urlData.publicUrl,
      analysis: analysis,
      conversion_score: analysis.conversionScore,
      hook_strength: analysis.scenes[0]?.score,
      created_at: new Date().toISOString(),
    });
  
  if (error) throw error;
  
  return data;
}
```

### 4. Meta CAPI Integration

```typescript
// Send conversion event to Meta CAPI after video analysis
async function sendMetaCAPIEvent(
  analysis: VideoAnalysisResult,
  userEmail: string,
  userPhone: string
) {
  const crypto = require('crypto');
  
  // Hash user data
  const hashedEmail = crypto.createHash('sha256').update(userEmail.toLowerCase()).digest('hex');
  const hashedPhone = crypto.createHash('sha256').update(userPhone.replace(/\D/g, '')).digest('hex');
  
  const conversionData = {
    data: [
      {
        event_name: 'VideoAnalyzed',
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'website',
        user_data: {
          em: [hashedEmail],
          ph: [hashedPhone],
        },
        custom_data: {
          conversion_score: analysis.conversionScore,
          hook_strength: analysis.scenes[0]?.score,
          currency: 'USD',
          value: 100.00, // Value of video analysis
        },
      },
    ],
  };
  
  await fetch(
    `https://graph.facebook.com/v18.0/${process.env.META_PIXEL_ID}/events`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...conversionData,
        access_token: process.env.META_ACCESS_TOKEN,
      }),
    }
  );
}
```

---

## 📊 Pre-Made Templates Usage

### Using PTD Fitness Template

```typescript
import { DubaiMen40PlusTemplate } from './templates/ptd-fitness-dubai-men-40plus';

// Generate video from template
async function generateFromTemplate(apiKey: string) {
  const template = DubaiMen40PlusTemplate;
  
  // Combine all prompts
  const fullPrompt = `
${template.structure.hook.prompt}

${template.structure.problemAgitation.prompt}

${template.structure.solution.prompt}

${template.structure.benefits.prompt}

${template.structure.cta.prompt}

Visual Style: ${template.visualStyle.pacing}, ${template.visualStyle.transitions}
Color Palette: ${template.visualStyle.colorPalette.join(', ')}
Text Style: ${template.visualStyle.textStyle}

Audio: ${template.audioGuidelines.voiceTone}, ${template.audioGuidelines.music}
  `.trim();
  
  const videoUrl = await generateVideoWithProgress(
    fullPrompt,
    apiKey,
    {
      aspectRatio: template.aspectRatio,
      duration: template.duration,
    },
    (message, percentage) => {
      console.log(`${message} (${percentage}%)`);
    }
  );
  
  return videoUrl;
}
```

---

## 🚀 Maximum Effectiveness Checklist

### ✅ Before Analysis

- [ ] Video file is < 100MB
- [ ] Video format is MP4, WebM, or MOV
- [ ] API key is valid and has sufficient quota
- [ ] PTD Fitness optimization is enabled (if applicable)

### ✅ During Analysis

- [ ] Extract 30 frames for comprehensive analysis
- [ ] Use Gemini 2.5 Pro (not Flash) for accuracy
- [ ] Set temperature to 0.4 for consistent results
- [ ] Monitor progress with callbacks

### ✅ After Analysis

- [ ] Review conversion score (target: 90+)
- [ ] Check hook strength (target: 85+)
- [ ] Implement high-priority recommendations first
- [ ] Store results in database (Supabase/HubSpot)
- [ ] Send conversion event to Meta CAPI

### ✅ Video Generation

- [ ] Use detailed, specific prompts
- [ ] Include style keywords (cinematic, high-energy)
- [ ] Specify duration explicitly
- [ ] Set aspect ratio based on platform (9:16 for mobile)
- [ ] Monitor generation progress
- [ ] Download and save generated video

---

## 📈 Performance Optimization

### 1. Reduce API Costs

```typescript
// Use Flash for quick scans, Pro for detailed analysis
const model = quickScan ? 'gemini-2.5-flash' : 'gemini-2.5-pro';
```

### 2. Cache Results

```typescript
// Cache analysis results to avoid re-analyzing
const cacheKey = `video_analysis_${videoFile.name}_${videoFile.size}`;
const cached = localStorage.getItem(cacheKey);

if (cached) {
  return JSON.parse(cached);
}

const analysis = await analyzeVideoComplete(videoFile, apiKey, ptdOptimized);
localStorage.setItem(cacheKey, JSON.stringify(analysis));
```

### 3. Parallel Processing

```typescript
// Process multiple videos in parallel (max 3 concurrent)
const results = await batchAnalyzeVideos(videos, apiKey, true, 3);
```

---

## 🎯 Success Metrics

| Metric | Target | Excellent |
|:---|:---|:---|
| Hook Strength | 80+ | 90+ |
| Problem Agitation | 75+ | 85+ |
| Solution Clarity | 85+ | 95+ |
| Transformation Appeal | 80+ | 90+ |
| CTA Effectiveness | 85+ | 95+ |
| **Overall Conversion Score** | **85+** | **95+** |

---

## 🔧 Troubleshooting

### Common Issues

1. **"API key not valid"**
   - Verify key at [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
   - Check environment variable is set correctly

2. **"Video generation timed out"**
   - Increase `maxPolls` in generation function
   - Reduce video duration (try 15-20s instead of 30s)

3. **"Out of memory"**
   - Reduce `extractFrames` parameter (try 15-20)
   - Process videos in smaller batches

4. **"Analysis is incomplete"**
   - Increase `maxOutputTokens` to 8192
   - Use Gemini 2.5 Pro (not Flash)

---

**This strategy document provides everything needed to build a maximum-effectiveness video analysis system. Follow the exact code, prompts, and integrations for best results.** 🎯
