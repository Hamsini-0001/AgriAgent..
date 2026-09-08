/**
 * AgriAgent Production Backend Server
 * Handles Google Gemini AI interactions securely with environment API key
 */

import http from 'http';
import fs from 'fs';
import path from 'path';

const PORT = process.env.PORT || 5000;

function getApiKey() {
  if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim().length > 0) {
    return process.env.GEMINI_API_KEY.trim();
  }
  const envPath = path.resolve(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf-8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (trimmed.startsWith('GEMINI_API_KEY=')) {
        return trimmed.substring('GEMINI_API_KEY='.length).trim().replace(/^["']|["']$/g, '');
      }
    }
  }
  return '';
}

const server = http.createServer(async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.url === '/api/ai/status' && req.method === 'GET') {
    const key = getApiKey();
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      configured: key.length > 0,
      activeModel: 'gemini-2.5-flash',
      availableModels: ['gemini-2.5-flash', 'gemini-1.5-pro', 'gemini-1.5-flash']
    }));
    return;
  }

  if (req.url === '/api/ai/chat' && req.method === 'POST') {
    const key = getApiKey();
    if (!key) {
      res.statusCode = 403;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({
        success: false,
        error: 'API_KEY_NOT_CONFIGURED',
        message: 'GEMINI_API_KEY is not configured in backend environment (.env).'
      }));
      return;
    }

    let bodyStr = '';
    req.on('data', chunk => { bodyStr += chunk; });
    req.on('end', async () => {
      try {
        const { prompt, context, model = 'gemini-2.5-flash' } = JSON.parse(bodyStr || '{}');
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: `${context}\n\n${prompt}` }] }]
          })
        });

        const data = await response.json();
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
          success: response.ok,
          model,
          replyText: data.candidates?.[0]?.content?.parts?.[0]?.text || data.error?.message
        }));
      } catch (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: false, message: err.message }));
      }
    });
    return;
  }

  res.statusCode = 404;
  res.end('Not Found');
});

server.listen(PORT, () => {
  console.log(`AgriAgent backend server running on port ${PORT}`);
});
