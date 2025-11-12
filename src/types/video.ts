// Core video analysis types
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

export interface EmotionData {
  timestamp: number;
  emotion: string;
  intensity: number;
}

export interface ObjectDetection {
  name: string;
  confidence: number;
  timestamps: number[];
}

// Vertex AI types
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

export interface Face {
  thumbnails: any[];
  segments: { startTime: number; endTime: number }[];
}

export interface TextAnnotation {
  text: string;
  segments: {
    startTime: number;
    endTime: number;
    confidence: number;
  }[];
}

export interface ObjectTracking {
  entity: string;
  confidence: number;
  frames: {
    time: number;
    boundingBox: any;
  }[];
}

export interface ExplicitContentFrame {
  time: number;
  pornographyLikelihood: string;
}

// Video reconstruction types
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

// Template types
export interface VideoTemplate {
  name: string;
  targetAudience: string;
  duration: number;
  aspectRatio: '16:9' | '9:16' | '1:1';
  structure: {
    hook: TemplateSection;
    problemAgitation: TemplateSection;
    solution: TemplateSection;
    benefits: TemplateSection;
    cta: TemplateSection;
  };
  visualStyle: {
    colorPalette: string[];
    pacing: string;
    transitions: string;
    textStyle: string;
  };
  audioGuidelines: {
    voiceTone: string;
    music: string;
    soundEffects: string;
  };
  optimizationScore: {
    hookStrength: number;
    problemAgitation: number;
    solutionClarity: number;
    transformationAppeal: number;
    ctaEffectiveness: number;
    overall: number;
  };
}

export interface TemplateSection {
  duration: number;
  prompt: string;
  textOverlays: TextOverlay[];
  conversionWords: string[];
}

export interface TextOverlay {
  text: string;
  time: number;
  duration: number;
  style?: string;
}

// Analysis options
export interface AnalysisOptions {
  extractFrames?: number;
  analyzeEmotions?: boolean;
  detectObjects?: boolean;
  generateTimestamps?: boolean;
  ptdFitnessOptimized?: boolean;
}

// Combined analysis result
export interface CombinedAnalysis {
  gemini: VideoAnalysisResult;
  vertex: VertexAIAnalysis;
  combined: {
    summary: string;
    scenes: Scene[];
    timestamps: Timestamp[];
    recommendations: Recommendation[];
    labels: Label[];
    faces: Face[];
    text: TextAnnotation[];
    objects: ObjectTracking[];
    qualityScore: number;
    conversionScore: number;
  };
}
