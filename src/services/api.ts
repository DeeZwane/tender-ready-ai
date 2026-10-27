
import { fetchAuthSession } from 'aws-amplify/auth';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';

export async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {

  if (!API_BASE_URL) throw new Error('Backend API is not configured. Check your .env file.');

  // 1. Get the live Cognito token

  let token = '';

  try {

    const session = await fetchAuthSession();

    token = session.tokens?.idToken?.toString() || '';

  } catch (err) {

    console.warn('No active session found', err);

  }

  // 2. Make request with token

  const response = await fetch(`${API_BASE_URL.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`, {

    ...options,

    headers: {

      ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),

      ...(token ? { Authorization: token } : {}), // API Gateway expects the raw token here

      ...options.headers,

    },

  });

  if (!response.ok) throw new Error(await response.text());

  return (await response.json()) as T;

}

// --- Specific TenderReady Endpoints ---

export async function uploadTenderFile(file: File): Promise<string> {

  // 1. Get Presigned URL

  const { tenderId, uploadUrl } = await apiRequest<{ tenderId: string; uploadUrl: string }>('/upload', {

    method: 'POST',

    body: JSON.stringify({ filename: file.name }),

  });

  // 2. Upload file directly to S3

  const uploadRes = await fetch(uploadUrl, {

    method: 'PUT',

    headers: { 'Content-Type': 'application/pdf' },

    body: file,

  });

  if (!uploadRes.ok) throw new Error('Failed to upload to S3');

  return tenderId;

}

export async function analyzeTender(tenderId: string) {

  return apiRequest<any>('/analyse', {

    method: 'POST',

    body: JSON.stringify({ tenderId }),

  });

}

export async function askQuestion(tenderId: string, question: string) {

  return apiRequest<{ answer: string }>('/ask', {

    method: 'POST',

    body: JSON.stringify({ tenderId, question }),

  });

}
