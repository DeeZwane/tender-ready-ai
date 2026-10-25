import { ArrowRight, FileCheck2, Info } from 'lucide-react';

type LoginProps = {
  onEnter: () => void;
};

export default function Login({ onEnter }: LoginProps) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Welcome / branding section */}
      <section className="bg-navy-900 text-white px-8 py-14 lg:p-20 flex flex-col justify-between">
        <div className="flex items-center gap-3 text-xl font-bold">
          <span className="p-2 rounded-xl bg-blue-600">
            <FileCheck2 />
          </span>
          TenderReady <span className="text-green-600">AI</span>
        </div>

        <div className="py-16 max-w-xl">
          <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm text-blue-100">
            AI-powered tender preparation
          </span>

          <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight leading-tight mt-6">
            Understand every tender.{' '}
            <span className="text-green-600">
              Prepare with confidence.
            </span>
          </h1>

          <p className="text-blue-100 text-lg mt-6 leading-relaxed">
            Turn complicated procurement documents into clear summaries,
            actionable checklists and useful answers.
          </p>

          <div className="grid sm:grid-cols-3 gap-4 mt-10 text-sm">
            {[
              ['01', 'Upload PDF'],
              ['02', 'Review insights'],
              ['03', 'Get ready'],
            ].map(([number, title]) => (
              <div className="rounded-xl bg-white/10 p-4" key={number}>
                <b className="text-green-600">{number}</b>
                <p className="mt-2">{title}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-sm text-blue-100">
          Built for South African SMMEs and first-time bidders.
        </p>
      </section>

      {/* Demo access section */}
      <section className="flex items-center justify-center p-6 sm:p-12">
        <div className="panel p-8 sm:p-10 w-full max-w-md">
          <div className="p-3 rounded-xl bg-blue-100 text-blue-700 w-fit">
            <FileCheck2 />
          </div>

          <h2 className="text-3xl font-bold mt-6 text-navy-900">
            Welcome to TenderReady
          </h2>

          <p className="text-muted mt-2">
            Explore the frontend demonstration.
          </p>

          <div className="mt-8 rounded-xl bg-blue-100 p-4 text-sm text-navy-800 flex gap-3">
            <Info className="shrink-0" size={19} />
            <p>
              Demo access only. Authentication is not connected.
              Please do not enter real passwords or confidential tenders.
            </p>
          </div>

          <button
            className="btn btn-primary w-full mt-7"
            onClick={onEnter}
          >
            Enter demo workspace
            <ArrowRight size={18} />
          </button>

          <p className="text-xs text-muted mt-6 text-center">
            Real sign-in / sign-up will be integrated with Amazon Cognito later.
          </p>
        </div>
      </section>
    </div>
  );
}
