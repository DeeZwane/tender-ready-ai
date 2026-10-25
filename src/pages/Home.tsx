import { useRef, useState } from 'react';
import {
  ArrowRight,
  CloudUpload,
  FileText,
  Sparkles,
  UploadCloud,
  X,
} from 'lucide-react';

type HomeProps = {
  onStartAnalysis: (file: File) => void;
};

export default function Home({ onStartAnalysis }: HomeProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const input = useRef<HTMLInputElement>(null);

  const pick = (selectedFile?: File) => {
    if (!selectedFile) return;

    if (
      !(
        selectedFile.type === 'application/pdf' ||
        selectedFile.name.toLowerCase().endsWith('.pdf')
      )
    ) {
      setError('Please select a PDF document.');
      setFile(null);
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setError('This demo accepts files up to 10 MB.');
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setError('');
  };

  const startAnalysis = () => {
    if (!file) {
      setError('Select a PDF first.');
      return;
    }

    onStartAnalysis(file);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <p className="small-label">Your workspace</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900 mt-2">
            Upload a tender document
          </h1>
          <p className="text-muted mt-3">
            Start by selecting a tender or RFQ PDF.
          </p>
        </div>

        <span className="text-sm bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold w-fit">
          Ready to get started
        </span>
      </div>

      <div className="grid xl:grid-cols-[1.6fr_1fr] gap-6">
        <div className="panel p-6 sm:p-9">
          <div className="flex gap-3 items-center mb-6">
            <div className="p-3 rounded-xl bg-blue-100 text-blue-700">
              <UploadCloud />
            </div>

            <div>
              <h2 className="font-bold text-xl text-navy-900">
                Tender PDF
              </h2>
              <p className="text-sm text-muted">
                Choose a document from your device
              </p>
            </div>
          </div>

          <input
            ref={input}
            className="hidden"
            type="file"
            accept=".pdf,application/pdf"
            onChange={(event) => {
              pick(event.target.files?.[0]);
              event.target.value = '';
            }}
          />

          <div
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              event.preventDefault();
              pick(event.dataTransfer.files?.[0]);
            }}
            className="border-2 border-dashed border-blue-600/40 bg-blue-100/40 rounded-2xl p-8 sm:p-12 text-center"
          >
            <CloudUpload className="mx-auto text-blue-700" size={43} />

            <h3 className="font-bold text-lg mt-4">
              Drag and drop your PDF here
            </h3>

            <p className="text-muted text-sm mt-2">
              or select a file to preview the upload workflow
            </p>

            <button
              type="button"
              className="btn btn-light mt-5"
              onClick={() => input.current?.click()}
            >
              Browse files
            </button>

            <p className="text-xs text-muted mt-4">
              PDF only · Demo limit: 10 MB
            </p>
          </div>

          {file && (
            <div className="mt-5 border border-line rounded-xl p-4 flex items-center gap-3">
              <FileText className="text-blue-700 shrink-0" />

              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{file.name}</p>
                <p className="text-xs text-muted">
                  {(file.size / 1024).toFixed(1)} KB · Selected locally, not uploaded
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setFile(null);
                  setError('');
                }}
                aria-label="Remove selected file"
              >
                <X size={18} />
              </button>
            </div>
          )}

          {error && (
            <p role="alert" className="text-red-700 text-sm mt-3">
              {error}
            </p>
          )}

          <button
            type="button"
            className="btn btn-primary w-full mt-6"
            disabled={!file}
            onClick={startAnalysis}
          >
            Preview sample analysis
            <ArrowRight size={18} />
          </button>

          <p className="text-xs text-muted mt-3">
            This button loads illustrative demo data; it does not process the selected PDF.
          </p>
        </div>

        <div className="space-y-5">
          <div className="panel p-6">
            <h3 className="font-bold text-lg text-navy-900">
              How it works
            </h3>

            {[
              ['1', 'Upload', 'Choose your tender PDF.'],
              ['2', 'Analyse', 'Textract and Bedrock will process it once connected.'],
              ['3', 'Prepare', 'Review summary, checklist and answers.'],
            ].map(([number, title, description]) => (
              <div className="flex gap-3 mt-6" key={number}>
                <span className="w-8 h-8 shrink-0 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center">
                  {number}
                </span>

                <div>
                  <b>{title}</b>
                  <p className="text-sm text-muted mt-1">{description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-navy-900 text-white rounded-2xl p-6">
            <Sparkles className="text-green-600 mb-3" />

            <h3 className="text-xl font-bold">Clarity for every bid</h3>

            <p className="text-blue-100 text-sm mt-3">
              See key dates, requirements and tender-specific guidance in one workspace.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
