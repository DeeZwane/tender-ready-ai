import { useEffect, useState } from 'react';
import {
  FileCheck2,
  Clock3,
  FileText,
  ClipboardCheck,
  MessageCircle,
  Menu,
  X,
  ShieldCheck,
  Info,
  ArrowRight,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import Login from './pages/Login';
import Home from './pages/Home';
import Progress from './pages/Progress';
import Summary from './pages/Summary';
import Checklist from './pages/Checklist';
import Ask from './pages/Ask';

type Page = 'login' | 'home' | 'progress' | 'summary' | 'checklist' | 'ask';
type WorkspacePage = Exclude<Page, 'login'>;

const navigation: {
  page: WorkspacePage;
  label: string;
  Icon: LucideIcon;
}[] = [
  { page: 'home', label: 'Home / Upload', Icon: FileCheck2 },
  { page: 'progress', label: 'Analysis Progress', Icon: Clock3 },
  { page: 'summary', label: 'Tender Summary', Icon: FileText },
  { page: 'checklist', label: 'Requirements Checklist', Icon: ClipboardCheck },
  { page: 'ask', label: 'Ask TenderReady', Icon: MessageCircle },
];

function App() {
  const [page, setPage] = useState<Page>('login');
  const [mobile, setMobile] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState(false);
  const [step, setStep] = useState(0);

  const navigate = (nextPage: Page) => {
    setPage(nextPage);
    setMobile(false);
    window.scrollTo(0, 0);
  };

  const gate = (nextPage: WorkspacePage) => {
    if (!preview && nextPage !== 'home') {
      navigate('home');
      return;
    }

    navigate(nextPage);
  };

  const startAnalysisPreview = (selectedFile: File) => {
    setFile(selectedFile);
    setPreview(true);
    setStep(0);
    navigate('progress');
  };

  // Preserve the original simulated progress behaviour.
  useEffect(() => {
    if (!preview || page !== 'progress' || step >= 4) {
      return;
    }

    const timer = window.setTimeout(() => {
      setStep((current) => current + 1);
    }, 850);

    return () => window.clearTimeout(timer);
  }, [preview, page, step]);

  if (page === 'login') {
    return <Login onEnter={() => navigate('home')} />;
  }

  const currentPageLabel =
    navigation.find((item) => item.page === page)?.label ?? 'Workspace';

  return (
    <div className="min-h-screen bg-canvas">
      <div className="min-h-screen lg:flex">
        <aside
          className={`${
            mobile ? 'fixed inset-y-0 left-0 z-30' : 'hidden'
          } lg:flex flex-col w-72 shrink-0 bg-navy-900 text-white p-5 lg:sticky lg:top-0 lg:h-screen`}
        >
          <div className="flex items-center justify-between px-2 py-4 mb-9">
            <div className="flex items-center gap-2 font-bold text-xl">
              <span className="bg-blue-600 p-2 rounded-xl">
                <FileCheck2 size={23} />
              </span>
              TenderReady <span className="text-green-600">AI</span>
            </div>

            <button
              type="button"
              className="lg:hidden"
              aria-label="Close menu"
              onClick={() => setMobile(false)}
            >
              <X />
            </button>
          </div>

          <div className="small-label !text-blue-100 px-4 mb-3">
            Workspace
          </div>

          <nav className="space-y-1">
            {navigation.map(({ page: targetPage, label, Icon }) => (
              <button
                type="button"
                key={targetPage}
                className={`navitem ${
                  page === targetPage ? 'active' : ''
                }`}
                onClick={() => gate(targetPage)}
              >
                <Icon size={19} />
                {label}
              </button>
            ))}
          </nav>

          <div className="mt-auto rounded-xl bg-white/10 p-4 text-sm">
            <ShieldCheck size={22} className="text-green-600 mb-2" />
            <b>Responsible AI</b>
            <p className="text-blue-100 mt-2">
              Always verify generated results against the original tender.
            </p>
          </div>

          <button
            type="button"
            className="text-blue-100 text-sm text-left px-4 py-5"
            onClick={() => navigate('login')}
          >
            ← Back to welcome
          </button>
        </aside>

        {mobile && (
          <button
            type="button"
            className="fixed inset-0 bg-navy-950/60 z-20 lg:hidden"
            aria-label="Close navigation"
            onClick={() => setMobile(false)}
          />
        )}

        <main className="flex-1 min-w-0">
          <header className="bg-white border-b border-line px-5 sm:px-9 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="lg:hidden"
                onClick={() => setMobile(true)}
                aria-label="Open navigation"
              >
                <Menu />
              </button>

              <span className="font-bold text-navy-900">
                TenderReady AI
              </span>

              <span className="hidden sm:inline text-muted text-sm">
                / {currentPageLabel}
              </span>
            </div>

            <span className="text-xs font-bold text-green-700 bg-green-100 px-3 py-2 rounded-full">
              FRONTEND DEMO
            </span>
          </header>

          <div className="max-w-6xl mx-auto px-5 sm:px-9 py-9">
            {page === 'home' && (
              <Home onStartAnalysis={startAnalysisPreview} />
            )}

            {page === 'progress' && (
              <Progress
                file={file}
                step={step}
                onStepChange={setStep}
                onViewSummary={() => navigate('summary')}
              />
            )}

            {page === 'summary' && (
              <Summary
                onViewChecklist={() => navigate('checklist')}
                onAsk={() => navigate('ask')}
              />
            )}

            {page === 'checklist' && <Checklist />}

            {page === 'ask' && <Ask />}

            <footer className="mt-10 pt-5 border-t border-line text-xs text-muted flex flex-wrap gap-3 justify-between">
              <span>© TenderReady AI · Hackathon frontend prototype</span>
              <span>Not connected to AWS services yet</span>
            </footer>

            {!preview && page !== 'home' && (
              <div className="mt-5 rounded-xl bg-blue-100 p-4 text-sm text-navy-800 flex gap-3">
                <Info size={19} className="shrink-0" />
                Select a PDF on the home page to start the sample workflow.
                The selected file is not uploaded or processed.
                <button
                  type="button"
                  className="underline font-semibold shrink-0"
                  onClick={() => navigate('home')}
                >
                  Go to upload
                  <ArrowRight size={14} className="inline ml-1" />
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;

