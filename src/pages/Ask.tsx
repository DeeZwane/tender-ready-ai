import { useState, type FormEvent } from 'react';
import { Bot, MessageCircle, Send, Sparkles, UserRound } from 'lucide-react';
import { answers } from '../data/mockData';

type Message = {
  role: 'assistant' | 'user';
  text: string;
};

const suggestions = [
  'What is the closing date?',
  'Which documents are required?',
  'Is the briefing compulsory?',
  'How long is the contract?',
];

export default function Ask() {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: "Hi! I'm TenderReady AI. You can ask me about the sample tender using one of the suggested questions below.",
    },
  ]);

  const getAnswer = (userQuestion: string) => {
    const normalizedQuestion = userQuestion.toLowerCase().trim();

    const match = answers.find(([prompt]) => {
      const normalizedPrompt = prompt.toLowerCase();

      return (
        normalizedQuestion === normalizedPrompt ||
        normalizedQuestion.includes(normalizedPrompt.replace('?', '')) ||
        normalizedPrompt
          .replace('?', '')
          .split(' ')
          .filter((word) => word.length > 3)
          .every((word) => normalizedQuestion.includes(word))
      );
    });

    if (match) {
      return match[1];
    }

    return "I can't answer that from the available sample responses yet. Once the backend AI service is connected, TenderReady will be able to answer questions using information extracted from your tender document. For now, please check the original document.";
  };

  const submitQuestion = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedQuestion = question.trim();

    if (!trimmedQuestion) return;

    const answer = getAnswer(trimmedQuestion);

    setMessages((current) => [
      ...current,
      { role: 'user', text: trimmedQuestion },
      { role: 'assistant', text: answer },
    ]);

    setQuestion('');
  };

  const askSuggestedQuestion = (suggestion: string) => {
    const answer = getAnswer(suggestion);

    setMessages((current) => [
      ...current,
      { role: 'user', text: suggestion },
      { role: 'assistant', text: answer },
    ]);
  };

  return (
    <>
      <div className="mb-8">
        <p className="small-label">Tender question assistant</p>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900 mt-2">
          Ask TenderReady AI
        </h1>

        <p className="text-muted mt-3">
          Ask questions to help you understand the tender requirements.
        </p>
      </div>

      <section className="panel max-w-4xl overflow-hidden">
        <div className="flex items-center gap-3 p-5 sm:p-6 border-b border-line">
          <div className="rounded-xl bg-blue-100 text-blue-700 p-3">
            <Bot size={24} />
          </div>

          <div>
            <h2 className="font-bold text-navy-900">TenderReady assistant</h2>
            <p className="text-sm text-muted">
              Frontend demonstration · Sample responses only
            </p>
          </div>

          <span className="ml-auto flex items-center gap-2 text-xs text-muted">
            <span className="w-2 h-2 rounded-full bg-green-600" />
            Demo mode
          </span>
        </div>

        <div className="p-4 sm:p-6 bg-canvas">
          <div className="space-y-5">
            {messages.map((message, index) => (
              <div
                key={`${index}-${message.role}`}
                className={`flex items-start gap-3 ${
                  message.role === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                <div
                  className={`p-2 rounded-xl shrink-0 ${
                    message.role === 'assistant'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-navy-900 text-white'
                  }`}
                >
                  {message.role === 'assistant' ? (
                    <Bot size={19} />
                  ) : (
                    <UserRound size={19} />
                  )}
                </div>

                <div
                  className={`rounded-2xl p-4 max-w-[85%] ${
                    message.role === 'assistant'
                      ? 'bg-white border border-line text-navy-900'
                      : 'bg-blue-600 text-white'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {message.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 sm:p-6">
          <div className="mb-5">
            <p className="text-sm font-semibold text-navy-900 mb-3 flex items-center gap-2">
              <Sparkles size={17} className="text-blue-700" />
              Try asking
            </p>

            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => askSuggestedQuestion(suggestion)}
                  className="rounded-full border border-line px-3 py-2 text-sm text-navy-900 hover:bg-canvas transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={submitQuestion} className="flex gap-3 items-end">
            <label htmlFor="tender-question" className="sr-only">
              Your question
            </label>

            <div className="relative flex-1">
              <MessageCircle
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
              />

              <input
                id="tender-question"
                type="text"
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                placeholder="Ask a question about the sample tender..."
                className="w-full rounded-xl border border-line bg-white py-3 pl-10 pr-4 text-sm text-navy-900 outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <button
              type="submit"
              disabled={!question.trim()}
              className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Send question"
            >
              <Send size={17} />
              <span className="hidden sm:inline">Send</span>
            </button>
          </form>

          <p className="text-xs text-muted mt-3">
            Demo only: answers are predefined and are not generated from your
            uploaded PDF. Avoid entering confidential tender information until
            the integrated service and its data-handling arrangements have
            been reviewed.
          </p>
        </div>
      </section>
    </>
  );
}