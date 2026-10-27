import { FileText, Calendar, Info } from 'lucide-react';
export default function Summary({ analysis, onViewChecklist }: { analysis: any, onViewChecklist: () => void }) {
 // Parse data safely in case Bedrock returns a stringified JSON
 const data = typeof analysis === 'string' ? JSON.parse(analysis) : analysis;
 return (
<div className="panel p-8 max-w-4xl mx-auto mt-10">
<h1 className="text-3xl font-bold text-navy-900 mb-2">Tender Summary</h1>
<p className="text-muted mb-8">AI-extracted information from your document.</p>
<div className="grid md:grid-cols-2 gap-6">
<div className="bg-canvas p-5 rounded-xl border border-line">
<div className="flex items-center gap-2 text-blue-700 font-bold mb-2"><Calendar size={18}/> Closing Date</div>
<p>{data?.closing_date || 'Not found in document'}</p>
</div>
<div className="bg-canvas p-5 rounded-xl border border-line">
<div className="flex items-center gap-2 text-blue-700 font-bold mb-2"><Info size={18}/> Briefing Details</div>
<p>{data?.briefing_details || 'Not found in document'}</p>
</div>
</div>
<div className="mt-6 bg-canvas p-5 rounded-xl border border-line">
<div className="flex items-center gap-2 text-blue-700 font-bold mb-2"><FileText size={18}/> Evaluation Criteria</div>
<p className="whitespace-pre-wrap">{data?.evaluation_criteria || 'Not found in document'}</p>
</div>
<button onClick={onViewChecklist} className="btn btn-primary mt-8 w-full py-4">
       View Required Documents Checklist
</button>
</div>
 );
}
