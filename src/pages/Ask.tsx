
import { useState, type FormEvent } from 'react';

import { Bot, Send, UserRound, Loader2 } from 'lucide-react';

import { askQuestion } from '../services/api';

type Message = { role: 'assistant' | 'user'; text: string };

export default function Ask({ tenderId }: { tenderId: string | null }) {

  const [question, setQuestion] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([

    { role: 'assistant', text: "Hi! I'm TenderReady AI. Ask me anything about the tender you uploaded." },

  ]);

  const submitQuestion = async (e: FormEvent) => {

    e.preventDefault();

    const q = question.trim();

    if (!q || !tenderId || isLoading) return;

    setMessages((prev) => [...prev, { role: 'user', text: q }]);

    setQuestion('');

    setIsLoading(true);

    try {

      const res = await askQuestion(tenderId, q);

      setMessages((prev) => [...prev, { role: 'assistant', text: res.answer }]);

    } catch (err) {

      setMessages((prev) => [...prev, { role: 'assistant', text: "Sorry, I couldn't process that request. Please try again." }]);

    } finally {

      setIsLoading(false);

    }

  };

  return (
<div className="panel max-w-4xl mx-auto mt-10 flex flex-col h-[75vh]">
<div className="p-5 border-b border-line flex items-center gap-3 bg-white rounded-t-xl">
<div className="bg-blue-100 text-blue-700 p-2 rounded-lg"><Bot size={24} /></div>
<div>
<h2 className="font-bold text-navy-900">TenderReady Assistant</h2>
<p className="text-xs text-muted">Powered by Amazon Bedrock</p>
</div>
</div>
<div className="flex-1 overflow-y-auto p-6 space-y-6 bg-canvas">

        {messages.map((msg, i) => (
<div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
<div className={`p-2 rounded-lg shrink-0 h-fit ${msg.role === 'user' ? 'bg-navy-900 text-white' : 'bg-blue-100 text-blue-700'}`}>

              {msg.role === 'user' ? <UserRound size={18} /> : <Bot size={18} />}
</div>
<div className={`p-4 rounded-xl max-w-[80%] text-sm whitespace-pre-wrap ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white border border-line text-navy-900 rounded-tl-none'}`}>

              {msg.text}
</div>
</div>

        ))}

        {isLoading && <div className="flex gap-3 text-muted text-sm items-center"><Loader2 className="animate-spin" size={16}/> AI is typing...</div>}
</div>
<form onSubmit={submitQuestion} className="p-4 bg-white border-t border-line flex gap-3 rounded-b-xl">
<input

          type="text"

          value={question}

          onChange={(e) => setQuestion(e.target.value)}

          placeholder="Ask about closing dates, required documents..."

          className="flex-1 rounded-lg border border-line p-3 text-sm outline-none focus:border-blue-600"

          disabled={isLoading}

        />
<button type="submit" disabled={!question.trim() || isLoading} className="btn btn-primary px-5">
<Send size={18} />
</button>
</form>
</div>

  );

}
