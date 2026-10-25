# TenderReady AI — frontend prototype

Responsive six-screen React + TypeScript + Tailwind CSS v4 interface. All colours are defined as reusable theme tokens in `src/styles.css`.

## Start on Windows (VS Code terminal / PowerShell)
1. Install Node.js LTS from nodejs.org.
2. Open this `tenderready-frontend` folder in VS Code.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open the localhost URL printed in the terminal.
6. Run `npm run build` to check the production build.

## Important demo limitations
- This is a **frontend-only demonstration**. It does not upload PDFs to S3, extract via Textract, call Bedrock, save to DynamoDB or authenticate with Cognito.
- Login is a **demo entry**, not real authentication. Do not use real credentials.
- PDF selection checks file extension/type and a 10 MB demo limit, but does not transmit the file.
- Clicking **Preview sample analysis** deliberately loads clearly labelled illustrative tender data. It is NOT analysis of the selected PDF.
- The Q&A panel responds only to a few preset sample questions; it is NOT connected to Bedrock.
- Progress stages represent the **sample preview** only, not AWS job status.
- No real tender content is uploaded or processed.

## Backend handoff
Agree on endpoints and response contracts before integration:
- POST /uploads/presign → { documentId, uploadUrl, ... }; browser PUTs PDF to presigned S3 URL.
- POST /documents/{documentId}/process → { status }.
- GET /documents/{documentId}/status → { status: 'uploaded'|'extracting'|'analysing'|'completed'|'failed', message? }.
- GET /documents/{documentId}/results → { title, reference, closingDate, briefing, duration, summary, checklist: [{id,text,page?}], ... }.
- POST /documents/{documentId}/questions → { answer, sourcePages? }.

Never put AWS credentials in the browser. Set CORS for your actual frontend origin. Show real progress only from actual backend states. Protect document access when integrating authentication. Keep original source-page evidence where feasible.
