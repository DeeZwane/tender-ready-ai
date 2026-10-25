import {
  ArrowRight,
  CalendarDays,
  Clock,
  FileText,
  ListChecks,
} from 'lucide-react';

import { example } from '../data/mockData';

type SummaryProps = {
  onViewChecklist: () => void;
  onAsk: () => void;
};

export default function Summary({
  onViewChecklist,
  onAsk,
}: SummaryProps) {
  return (
    <>
      <div className="mb-8">
        <p className="small-label">Document insights</p>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900 mt-2">
          Tender summary
        </h1>

        <p className="text-muted mt-3">
          Review the key details of the tender before preparing your response.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <section className="panel p-7 lg:col-span-2">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-blue-100 text-blue-700">
              <FileText size={24} />
            </div>

            <div>
              <p className="small-label">Sample document</p>
              <h2 className="text-xl sm:text-2xl font-bold text-navy-900 mt-1">
                {example.title}
              </h2>
              <p className="text-sm text-muted mt-2">
                Reference: {example.reference}
              </p>
            </div>
          </div>

          <div className="border-t border-line my-6" />

          <h3 className="font-bold text-navy-900 mb-3">Overview</h3>

          <p className="text-muted leading-relaxed">
            {example.summary}
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mt-7">
            <div className="rounded-xl bg-canvas p-4">
              <div className="flex items-center gap-2 text-muted text-sm">
                <CalendarDays size={17} />
                Closing date
              </div>

              <p className="font-semibold text-navy-900 mt-2">
                {example.closing}
              </p>
            </div>

            <div className="rounded-xl bg-canvas p-4">
              <div className="flex items-center gap-2 text-muted text-sm">
                <Clock size={17} />
                Contract duration
              </div>

              <p className="font-semibold text-navy-900 mt-2">
                {example.duration}
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-blue-100 p-4 mt-6">
            <p className="font-semibold text-navy-900">
              Briefing information
            </p>

            <p className="text-sm text-navy-800 mt-2">
              {example.briefing}
            </p>

            <p className="text-xs text-navy-800 mt-2">
              Confirm the date, venue and whether attendance is compulsory
              in the original tender document.
            </p>
          </div>
        </section>

        <aside className="panel p-6">
          <div className="p-3 rounded-xl bg-green-100 text-green-700 w-fit">
            <ListChecks size={23} />
          </div>

          <h3 className="text-xl font-bold text-navy-900 mt-4">
            Requirements checklist
          </h3>

          <p className="text-sm text-muted mt-2">
            Use the sample checklist to see how tender requirements
            will be organised.
          </p>

          <div className="mt-5 space-y-3">
            {example.items.slice(0, 3).map((item) => (
              <div key={item.id} className="flex gap-3 items-start">
                <span className="w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-bold shrink-0">
                  {item.id}
                </span>

                <p className="text-sm text-navy-900">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="btn btn-primary w-full mt-6"
            onClick={onViewChecklist}
          >
            View full checklist <ArrowRight size={17} />
          </button>

          <button
            type="button"
            className="btn btn-light w-full mt-3"
            onClick={onAsk}
          >
            Ask TenderReady AI
          </button>
        </aside>
      </div>

      <p className="text-xs text-muted mt-6">
        Demo disclaimer: these details are illustrative sample data,
        not information extracted from the PDF you selected.
        Backend document processing and AI analysis have not yet
        been connected.
      </p>
    </>
  );
}