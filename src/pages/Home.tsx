import { useState, useRef } from 'react';
import { FileUp, Loader2 } from 'lucide-react';
import { uploadTenderFile } from '../services/api';
export default function Home({ onFileSelected, onUploadSuccess }: { onFileSelected: (f: File) => void, onUploadSuccess: (id: string) => void }) {
 const [isUploading, setIsUploading] = useState(false);
 const [error, setError] = useState('');
 const fileInputRef = useRef<HTMLInputElement>(null);
 const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
   const file = e.target.files?.[0];
   if (!file) return;
   onFileSelected(file);
   setIsUploading(true);
   setError('');
   try {
     const id = await uploadTenderFile(file);
     onUploadSuccess(id);
   } catch (err: any) {
     setError(err.message || 'Upload failed');
     setIsUploading(false);
   }
 };
 return (
<div className="panel p-8 max-w-2xl mx-auto text-center mt-10">
<div className="mx-auto w-16 h-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mb-6">
<FileUp size={32} />
</div>
<h1 className="text-3xl font-bold text-navy-900 mb-4">Upload Tender Document</h1>
<p className="text-muted mb-8">Select a PDF to upload to AWS S3 and start the AI analysis.</p>
     {error && <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-6">{error}</div>}
<input type="file" accept=".pdf" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
<button
       className="btn btn-primary w-full py-4 text-lg flex justify-center items-center gap-2"
       onClick={() => fileInputRef.current?.click()}
       disabled={isUploading}
>
       {isUploading ? <><Loader2 className="animate-spin" /> Uploading to S3...</> : 'Select PDF File'}
</button>
</div>
 );
}
