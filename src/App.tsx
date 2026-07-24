import React, { useState, useEffect } from 'react';
import { ShieldAlert, Cpu, Activity, Database, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import { evaluateWarnings, Predictor, Configuration, WarningResult } from './engine';

const initialConfig: Configuration = {
  thresholds: {
    warning: 50,
    critical: 85
  },
  weights: {
    'sensor-cpu': 1.5,
    'sensor-memory': 1.0,
    'sensor-disk': 0.8,
    'sensor-network': 1.2
  }
};

const generateMockPredictors = (): Predictor[] => {
  return [
    { id: 'sensor-cpu', value: Math.random() * 40, timestamp: Date.now() },
    { id: 'sensor-memory', value: Math.random() * 60, timestamp: Date.now() },
    { id: 'sensor-disk', value: Math.random() * 20, timestamp: Date.now() },
    { id: 'sensor-network', value: Math.random() * 30, timestamp: Date.now() }
  ];
};

export default function App() {
  const [predictors, setPredictors] = useState<Predictor[]>([]);
  const [config, setConfig] = useState<Configuration>(initialConfig);
  const [result, setResult] = useState<WarningResult | null>(null);
  const [autoRun, setAutoRun] = useState(false);

  const runEngine = () => {
    const newPredictors = generateMockPredictors();
    setPredictors(newPredictors);
    const evalResult = evaluateWarnings(newPredictors, config);
    setResult(evalResult);
  };

  useEffect(() => {
    runEngine();
  }, []);

  useEffect(() => {
    let interval: number;
    if (autoRun) {
      interval = window.setInterval(runEngine, 2000);
    }
    return () => clearInterval(interval);
  }, [autoRun, config]);

  const getStatusColor = (level?: string) => {
    switch (level) {
      case 'CRITICAL': return 'bg-red-50 border-red-200 text-red-700';
      case 'WARNING': return 'bg-amber-50 border-amber-200 text-amber-700';
      case 'OK': return 'bg-emerald-50 border-emerald-200 text-emerald-700';
      default: return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  const getStatusIcon = (level?: string) => {
    switch (level) {
      case 'CRITICAL': return <XCircle className="w-8 h-8 text-red-600" />;
      case 'WARNING': return <AlertTriangle className="w-8 h-8 text-amber-500" />;
      case 'OK': return <CheckCircle2 className="w-8 h-8 text-emerald-600" />;
      default: return <Activity className="w-8 h-8 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-6 h-6 text-indigo-600" />
            <h1 className="text-xl font-bold tracking-tight text-slate-900">WARNING ENGINE <span className="text-slate-400 font-normal text-sm ml-2">v1.0</span></h1>
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-600 cursor-pointer">
              <input 
                type="checkbox" 
                checked={autoRun} 
                onChange={(e) => setAutoRun(e.target.checked)}
                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-600"
              />
              Auto-Simulation
            </label>
            <button 
              onClick={runEngine}
              className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors shadow-sm"
            >
              Run Pipeline
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* System Status Overview */}
        <div className={`rounded-xl border p-6 flex flex-col sm:flex-row items-center justify-between gap-6 transition-colors duration-300 shadow-sm ${getStatusColor(result?.level)}`}>
          <div className="flex items-center gap-4">
            {getStatusIcon(result?.level)}
            <div>
              <h2 className="text-2xl font-bold uppercase tracking-wide">{result?.level || 'INITIALIZING'}</h2>
              <p className="text-sm opacity-80 mt-1">Current system state based on SOL primitive evaluation</p>
            </div>
          </div>
          <div className="flex items-center gap-8 text-center">
            <div>
              <div className="text-3xl font-bold">{result?.score.toFixed(1) || '--'}</div>
              <div className="text-xs font-semibold uppercase tracking-wider opacity-70 mt-1">Total Score</div>
            </div>
            <div className="h-10 w-px bg-current opacity-20"></div>
            <div>
              <div className="text-3xl font-bold">{result?.diagnostics.processingTimeMs || 0}ms</div>
              <div className="text-xs font-semibold uppercase tracking-wider opacity-70 mt-1">Latency</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Predictors (SOURCE) */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
            <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
              <Database className="w-4 h-4 text-slate-500" />
              <h3 className="font-semibold text-slate-800">SOURCE: Predictors</h3>
            </div>
            <div className="p-4 space-y-3 flex-grow">
              {predictors.map(p => (
                <div key={p.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <div>
                    <div className="text-sm font-medium text-slate-700">{p.id}</div>
                    <div className="text-xs text-slate-400 mt-0.5">Weight: {config.weights?.[p.id] || 1}</div>
                  </div>
                  <div className="font-mono text-sm font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                    {p.value.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Configuration (CONSTRAINT & COMPARE) */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
            <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-slate-500" />
              <h3 className="font-semibold text-slate-800">COMPARE: Thresholds</h3>
            </div>
            <div className="p-6 flex-grow">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-amber-700">Warning Threshold</span>
                    <span className="font-mono">{config.thresholds.warning}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-amber-400 h-2 rounded-full shadow-sm" style={{ width: `${(config.thresholds.warning / 150) * 100}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-red-700">Critical Threshold</span>
                    <span className="font-mono">{config.thresholds.critical}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full shadow-sm" style={{ width: `${(config.thresholds.critical / 150) * 100}%` }}></div>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-slate-100 mt-6">
                  <h4 className="text-sm font-medium text-slate-600 mb-3">Live Score Tracking</h4>
                  <div className="w-full bg-slate-100 rounded-full h-4 relative overflow-hidden shadow-inner">
                    <div 
                      className={`h-4 rounded-full transition-all duration-500 ${
                        result?.level === 'CRITICAL' ? 'bg-red-500' : 
                        result?.level === 'WARNING' ? 'bg-amber-400' : 'bg-emerald-500'
                      }`} 
                      style={{ width: `${Math.min(((result?.score || 0) / 150) * 100, 100)}%` }}
                    ></div>
                    {/* Markers */}
                    <div className="absolute top-0 bottom-0 w-px bg-amber-700 z-10 shadow-sm" style={{ left: `${(config.thresholds.warning / 150) * 100}%` }}></div>
                    <div className="absolute top-0 bottom-0 w-px bg-red-700 z-10 shadow-sm" style={{ left: `${(config.thresholds.critical / 150) * 100}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Diagnostics (STATE) */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
            <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
              <Activity className="w-4 h-4 text-slate-500" />
              <h3 className="font-semibold text-slate-800">STATE: Diagnostics</h3>
            </div>
            <div className="p-4 flex-grow flex flex-col">
              <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm text-slate-300 overflow-x-auto shadow-inner h-48 flex-grow">
                <pre className="whitespace-pre-wrap">
{JSON.stringify(result, null, 2)}
                </pre>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-center">
                  <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Evaluated</div>
                  <div className="font-semibold text-slate-800">{result?.diagnostics.evaluatedPredictors || 0} sources</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-center">
                  <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Anomalies</div>
                  <div className="font-semibold text-slate-800">{result?.diagnostics.anomaliesDetected || 0} detected</div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}
