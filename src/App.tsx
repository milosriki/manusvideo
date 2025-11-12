import React, { useState } from 'react';
import { GeminiVideoAnalyzer } from './services/geminiService';
import type { VideoAnalysisResult } from './types/video';
import './index.css';

const App: React.FC = () => {
  const [apiKey, setApiKey] = useState<string>('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<VideoAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ptdOptimized, setPtdOptimized] = useState(false);

  const handleAnalyze = async () => {
    if (!apiKey || !videoFile) {
      setError('Please provide API key and select a video file');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const analyzer = new GeminiVideoAnalyzer(apiKey);
      const result = await analyzer.analyzeVideo(videoFile, {
        extractFrames: 30,
        analyzeEmotions: true,
        detectObjects: true,
        generateTimestamps: true,
        ptdFitnessOptimized: ptdOptimized,
      });
      
      setAnalysis(result);
    } catch (err: any) {
      setError(err.message || 'Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-pink-400">
            Manus Video AI Studio
          </h1>
          <p className="text-xl text-slate-300">
            Comprehensive video analysis using Google's native AI tools
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Configuration Panel */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700">
              <h2 className="text-2xl font-bold mb-4">Configuration</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Gemini API Key</label>
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter your Gemini API key"
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Video File</label>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                    className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-600 file:text-white hover:file:bg-violet-700"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="ptd-optimized"
                    checked={ptdOptimized}
                    onChange={(e) => setPtdOptimized(e.target.checked)}
                    className="w-4 h-4 text-violet-600 bg-slate-900 border-slate-600 rounded focus:ring-violet-500"
                  />
                  <label htmlFor="ptd-optimized" className="text-sm">
                    PTD Fitness Optimization
                  </label>
                </div>

                <button
                  onClick={handleAnalyze}
                  disabled={loading || !apiKey || !videoFile}
                  className="w-full py-3 px-6 bg-gradient-to-r from-violet-600 to-pink-600 rounded-lg font-semibold hover:from-violet-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {loading ? 'Analyzing...' : 'Analyze Video'}
                </button>
              </div>

              {error && (
                <div className="mt-4 p-4 bg-red-500/20 border border-red-500 rounded-lg">
                  <p className="text-sm text-red-200">{error}</p>
                </div>
              )}
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2 space-y-6">
            {loading && (
              <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-12 border border-slate-700 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-violet-500 mx-auto mb-4"></div>
                  <p className="text-lg">Analyzing video with Gemini 2.5 Pro...</p>
                </div>
              </div>
            )}

            {analysis && !loading && (
              <>
                {/* Summary */}
                <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700">
                  <h2 className="text-2xl font-bold mb-4">Summary</h2>
                  <p className="text-slate-300">{analysis.summary}</p>
                </div>

                {/* Scenes */}
                <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700">
                  <h2 className="text-2xl font-bold mb-4">Scenes ({analysis.scenes.length})</h2>
                  <div className="space-y-4">
                    {analysis.scenes.map((scene, i) => (
                      <div key={i} className="bg-slate-900/50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold">Scene {i + 1}</span>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-1 bg-violet-600 rounded text-xs">
                              {scene.startTime.toFixed(1)}s - {scene.endTime.toFixed(1)}s
                            </span>
                            <span className="px-2 py-1 bg-blue-600 rounded text-xs">
                              {scene.dominantEmotion}
                            </span>
                            <span className="px-2 py-1 bg-green-600 rounded text-xs">
                              Score: {scene.score}/100
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-slate-300">{scene.description}</p>
                        {scene.objects.length > 0 && (
                          <p className="text-xs text-slate-400 mt-2">
                            Objects: {scene.objects.join(', ')}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700">
                  <h2 className="text-2xl font-bold mb-4">Recommendations ({analysis.recommendations.length})</h2>
                  <div className="space-y-4">
                    {analysis.recommendations.map((rec, i) => (
                      <div key={i} className="bg-slate-900/50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold capitalize">{rec.type}</span>
                          <span className="px-2 py-1 bg-orange-600 rounded text-xs">
                            Priority: {rec.priority}/10
                          </span>
                        </div>
                        <p className="text-sm text-slate-300 mb-2">{rec.description}</p>
                        <p className="text-xs text-slate-400">
                          <strong>Implementation:</strong> {rec.implementation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Timestamps */}
                {analysis.timestamps.length > 0 && (
                  <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700">
                    <h2 className="text-2xl font-bold mb-4">Key Timestamps</h2>
                    <div className="space-y-2">
                      {analysis.timestamps.map((ts, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-lg">
                          <span className="font-mono text-sm text-violet-400 min-w-[60px]">
                            {ts.time.toFixed(1)}s
                          </span>
                          <div className="flex-1">
                            <p className="text-sm">{ts.description}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`px-2 py-0.5 rounded text-xs ${
                                ts.importance === 'high' ? 'bg-red-500' :
                                ts.importance === 'medium' ? 'bg-yellow-500' :
                                'bg-green-500'
                              }`}>
                                {ts.importance}
                              </span>
                              {ts.actionable && (
                                <span className="px-2 py-0.5 bg-blue-500 rounded text-xs">
                                  Actionable
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
