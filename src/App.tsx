
import { useState } from 'react';

import { Amplify } from 'aws-amplify';

import { Authenticator } from '@aws-amplify/ui-react';

import '@aws-amplify/ui-react/styles.css';

import { FileCheck2, Clock3, FileText, ClipboardCheck, MessageCircle, Menu, X, ShieldCheck } from 'lucide-react';

import Home from './pages/Home';

import Progress from './pages/Progress';

import Summary from './pages/Summary';

import Checklist from './pages/Checklist';

import Ask from './pages/Ask';

Amplify.configure({

  Auth: {

    Cognito: {

      userPoolId: 'us-east-1_gjfs2ke9Z',

      userPoolClientId: '4i4vnbegcdv9ndug9k7t22tmvb',

      loginWith: { email: true }

    }

  }

});

type Page = 'home' | 'progress' | 'summary' | 'checklist' | 'ask';

function App() {

  return (
<Authenticator>

      {({ signOut, user }) => <AppWorkspace signOut={signOut} user={user} />}
</Authenticator>

  );

}

function AppWorkspace({ signOut, user }: { signOut?: () => void, user?: any }) {

  const [page, setPage] = useState<Page>('home');

  const [mobile, setMobile] = useState(false);

  const [file, setFile] = useState<File | null>(null);

  const [tenderId, setTenderId] = useState<string | null>(null);

  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const navigate = (nextPage: Page) => {

    setPage(nextPage);

    setMobile(false);

    window.scrollTo(0, 0);

  };

  const navigation = [

    { page: 'home' as Page, label: 'Home / Upload', Icon: FileCheck2 },

    { page: 'progress' as Page, label: 'Analysis Progress', Icon: Clock3 },

    { page: 'summary' as Page, label: 'Tender Summary', Icon: FileText },

    { page: 'checklist' as Page, label: 'Requirements Checklist', Icon: ClipboardCheck },

    { page: 'ask' as Page, label: 'Ask TenderReady', Icon: MessageCircle },

  ];

  return (
<div className="min-h-screen bg-canvas">
<div className="min-h-screen lg:flex">
<aside className={`${mobile ? 'fixed inset-y-0 left-0 z-30' : 'hidden'} lg:flex flex-col w-72 shrink-0 bg-navy-900 text-white p-5 lg:sticky lg:top-0 lg:h-screen`}>
<div className="flex items-center justify-between px-2 py-4 mb-9">
<div className="flex items-center gap-2 font-bold text-xl">
<span className="bg-blue-600 p-2 rounded-xl"><FileCheck2 size={23} /></span>

              TenderReady <span className="text-green-600">AI</span>
</div>
<button className="lg:hidden" onClick={() => setMobile(false)}><X /></button>
</div>
<nav className="space-y-1">

            {navigation.map(({ page: targetPage, label, Icon }) => (
<button key={targetPage} className={`navitem w-full text-left flex items-center gap-3 p-3 rounded-lg ${page === targetPage ? 'bg-blue-600' : 'hover:bg-white/10'}`} onClick={() => navigate(targetPage)}>
<Icon size={19} /> {label}
</button>

            ))}
</nav>
<div className="mt-auto rounded-xl bg-white/10 p-4 text-sm">
<ShieldCheck size={22} className="text-green-600 mb-2" />
<b>Responsible AI</b>
<p className="text-blue-100 mt-2">Always verify generated results against the original tender.</p>
</div>
<button className="text-blue-100 text-sm text-left px-4 py-5 hover:text-white" onClick={signOut}>

            ← Sign Out ({user?.signInDetails?.loginId})
</button>
</aside>

        {mobile && <button className="fixed inset-0 bg-black/60 z-20 lg:hidden" onClick={() => setMobile(false)} />}
<main className="flex-1 min-w-0">
<header className="bg-white border-b border-line px-5 py-5 flex items-center justify-between">
<div className="flex items-center gap-3">
<button className="lg:hidden" onClick={() => setMobile(true)}><Menu /></button>
<span className="font-bold text-navy-900">TenderReady AI</span>
</div>
<span className="text-xs font-bold text-green-700 bg-green-100 px-3 py-2 rounded-full">LIVE APP</span>
</header>
<div className="max-w-6xl mx-auto px-5 py-9">

            {page === 'home' && (
<Home onFileSelected={setFile} onUploadSuccess={(id) => { setTenderId(id); navigate('progress'); }} />

            )}

            {page === 'progress' && (
<Progress file={file} tenderId={tenderId} onAnalysisComplete={(data) => { setAnalysisResult(data); navigate('summary'); }} />

            )}

            {page === 'summary' && (
<Summary analysis={analysisResult} onViewChecklist={() => navigate('checklist')} />

            )}

            {page === 'checklist' && <Checklist analysis={analysisResult} />}

            {page === 'ask' && <Ask tenderId={tenderId} />}
</div>
</main>
</div>
</div>

  );

}

export default App;
