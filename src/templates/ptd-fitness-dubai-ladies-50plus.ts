import type { VideoTemplate } from '../types/video';

export const DubaiLadies50PlusTemplate: VideoTemplate = {
  name: 'Dubai Ladies 50+ Transformation',
  targetAudience: 'Dubai women over 50, seeking confidence and energy',
  duration: 45,
  aspectRatio: '9:16',
  
  structure: {
    hook: {
      duration: 5,
      prompt: `Direct-to-camera shot of an elegant, confident woman in her 50s in a beautiful Dubai setting (e.g., balcony overlooking the marina). She looks directly at the camera with a warm, empathetic smile. Text overlay: "Dubai Ladies Over 50..."`,
      textOverlays: [
        { text: 'Dubai Ladies Over 50', time: 0, duration: 2, style: 'elegant, large' },
        { text: 'Listen Closely...', time: 2, duration: 2, style: 'intriguing, soft gold' },
      ],
      conversionWords: ['listen closely', 'body fighting you', 'exhausted'],
    },
    
    problemAgitation: {
      duration: 10,
      prompt: `Show a montage of relatable struggles: a woman feeling tired while shopping, looking sadly at her wardrobe, feeling out of place at a social event. Quick, emotional cuts. Text overlays highlight pain points.`,
      textOverlays: [
        { text: 'Feel Like Your Body Is Fighting You?', time: 5, duration: 3 },
        { text: 'Tried Every Diet, But Nothing Lasts?', time: 8, duration: 3 },
        { text: 'Lost Your Spark?', time: 11, duration: 2 },
      ],
      conversionWords: ['fighting you', 'nothing lasts', 'exhausted', 'sad reality'],
    },
    
    solution: {
      duration: 10,
      prompt: `Show the transformation: The same woman working one-on-one with a supportive female coach. The setting is a private, high-end studio. Text: "Personalized Transformation Plan" appears. Tone is empowering and hopeful.`,
      textOverlays: [
        { text: "It's Not Your Fault. It's The Method.", time: 15, duration: 3, style: 'revelation' },
        { text: 'Personalized Transformation Plan', time: 18, duration: 3, style: 'bold, branded' },
        { text: "Designed For Your Stage of Life", time: 21, duration: 3, style: 'credibility' },
      ],
      conversionWords: ['hidden truth', 'cracked the code', 'personalized', 'master degree coaches'],
    },
    
    benefits: {
      duration: 15,
      prompt: `Show the results: The woman is now vibrant and energetic. She's laughing with friends, confidently trying on clothes, enjoying a healthy meal at a nice restaurant, and walking on the beach with a renewed sense of self. Quick, inspiring cuts.`,
      textOverlays: [
        { text: 'Feel Sexy & Confident Again', time: 25, duration: 3 },
        { text: 'Reclaim Your Peak Energy', time: 28, duration: 3 },
        { text: 'Enjoy Dubai Without Restriction', time: 31, duration: 3 },
        { text: 'Look in the Mirror and Say \'WOW\'', time: 34, duration: 4 },
      ],
      conversionWords: ['reclaim', 'peak energy', 'confident', 'permanent transformation', 'sexy'],
    },
    
    cta: {
      duration: 5,
      prompt: `Direct-to-camera shot. The woman smiles warmly. Large text overlay with a clear, inviting CTA.`,
      textOverlays: [
        { text: 'Book Your Free Consultation', time: 40, duration: 3, style: 'urgent, large, green' },
        { text: "Let's Start Your Transformation", time: 43, duration: 2, style: 'action' },
      ],
      conversionWords: ['free consultation', 'click below', 'start your transformation'],
    },
  },
  
  visualStyle: {
    colorPalette: ['#FF69B4', '#FFC0CB', '#FFFFFF', '#333333'], // Pinks, white, charcoal
    pacing: 'smooth cuts (3-4s per shot)',
    transitions: 'gentle fade, smooth zoom',
    textStyle: 'elegant, serif, high contrast',
  },
  
  audioGuidelines: {
    voiceTone: 'empathetic, empowering, warm, and friendly',
    music: 'uplifting, inspirational, subtle background score',
    soundEffects: 'gentle chimes for text overlays, subtle whoosh',
  },
  
  optimizationScore: {
    hookStrength: 88,
    problemAgitation: 90,
    solutionClarity: 92,
    transformationAppeal: 95,
    ctaEffectiveness: 90,
    overall: 91,
  },
};
