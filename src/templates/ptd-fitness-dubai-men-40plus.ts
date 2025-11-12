import type { VideoTemplate } from '../types/video';

export const DubaiMen40PlusTemplate: VideoTemplate = {
  name: 'Dubai Men 40+ Executive Edge',
  targetAudience: 'Dubai men over 40, professionals, executives',
  duration: 40,
  aspectRatio: '9:16',
  
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
