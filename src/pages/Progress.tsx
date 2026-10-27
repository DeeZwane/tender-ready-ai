
import { useEffect, useState } from 'react';

import { Check, Loader2, FileText } from 'lucide-react';

import { analyzeTender } from '../services/api';

export default function Progress({ file, tenderId, onAnalysisComplete }: { file: File | null, tenderId: string | null, onAnalysisComplete: (data: any) => void }) {

  const [step, setStep] = useState(1);

  const [error, setError] = useState('');

  useEffect(() => {

    if (!tenderId) return;

    const runAnalysis = async () => {

      try {

        // Visually step through while waiting for Bedrock/Textract

        const interval = setInterval(() => setStep(s => Math.min(s + 1, 3)), 3000);

        const result = await analyzeTender(tenderId);

        clearInterval(interval);

        setStep(4);

        // Brief pause to show the final checkmark before navigating

        setTimeout(() => onAnalysisComplete(result), 1500);

      } catch (err: any) {

        setError('Analysis failed. Please try again.');

      }

    };

    runAnalysis();

  }, [tenderId, onAnalysisComplete]);

  const stages = ['Uploading to S3', 'Text extraction (Textract)', 'AI analysis (Bedrock)', 'Checklist generation'];

  return (
<div className="panel p-8 max-w-3xl mx-auto mt-10">
<h1 className="text-2xl font-bold text-navy-900 mb-8 flex items-center gap-3">
<FileText className="text-blue-700" /> Processing {file?.name || 'Document'}
</h1>

      {error && <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-6">{error}</div>}
<div className="space-y-6">

        {stages.map((label, index) => (
<div className="flex gap-4 items-center" key={label}>
<span className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${step > index ? 'bg-green-100 text-green-700' : step === index ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-400'}`}>

              {step > index ? <Check size={20} /> : step === index ? <Loader2 size={20} className="animate-spin" /> : index + 1}
</span>
<div className="flex-1">
<p className={`font-semibold ${step > index ? 'text-green-700' : step === index ? 'text-blue-700' : 'text-gray-500'}`}>{label}</p>
</div>
</div>

        ))}
</div>
</div>

  );

}
