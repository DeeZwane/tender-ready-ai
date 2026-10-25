import { Check, CheckCircle2, FileText, Info } from 'lucide-react';

type ProgressProps = {
  file: File | null;
  step: number;
  onStepChange: (step: number) => void;
  onViewSummary: () => void;
};

export default function Progress({
  file,
  step,
  onStepChange,
  onViewSummary,
}: ProgressProps) {
  const stages = [
    'PDF selected',
    'Text extraction preview',
    'AI analysis preview',
    'Checklist generation preview',
  ];

  return (
    <>
      <div className="mb-8">
        <p className="small-label">Document workflow</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900 mt-2">
          Analysis progress
        </h1>
        <p className="text-muted mt-3">
          Illustrative processing preview. These stages are not connected to AWS.
        </p>
      </div>

      <div className="panel p-7 sm:p-10 max-w-3xl">
        <div className="flex items-center gap-3 mb-8">
          <FileText className="text-blue-700" />

          <div>
            <b>{file?.name ?? 'Sample tender'}</b>
            <p className="text-sm text-muted">Sample preview only</p>
          </div>
        </div>

        {stages.map((label, index) => (
          <div className="flex gap-4 pb-7 last:pb-0" key={label}>
            <span
              className={`w-9 h-9 rounded-full shrink-0 flex items-center justify-center ${
                step > index
                  ? 'bg-green-100 text-green-700'
                  : step === index
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-canvas text-muted'
              }`}
            >
              {step > index ? <Check size={20} /> : index + 1}
            </span>

            <div className="flex-1 border-b border-line pb-5">
              <b>{label}</b>
              <p className="text-sm text-muted mt-1">
                {step > index
                  ? 'Sample step complete'
                  : step === index
                    ? 'Preview in progress'
                    : 'Waiting'}
              </p>
            </div>
          </div>
        ))}

        {step >= 4 && (
          <div className="mt-7 rounded-xl bg-green-100 p-5">
            <div className="flex gap-2 items-center font-bold text-green-700">
              <CheckCircle2 size={20} />
              Sample preview ready
            </div>

            <p className="text-sm text-green-700 mt-2">
              The next screens contain illustrative information, not results extracted from your PDF.
            </p>

            <button
              type="button"
              className="btn btn-primary mt-4"
              onClick={onViewSummary}
            >
              View sample summary
            </button>
          </div>
        )}

        {step < 4 && (
          <p className="text-xs text-muted mt-4 flex gap-2 items-start">
            <Info size={16} className="shrink-0" />
            This is a simulated progress indicator, not actual document processing.
          </p>
        )}

        {step < 4 && (
          <button
            type="button"
            className="btn btn-light mt-4"
            onClick={() => onStepChange(Math.min(step + 1, 4))}
          >
            Advance preview stage
          </button>
        )}
      </div>
    </>
  );
}
