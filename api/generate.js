export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'GEMINI_API_KEY not configured on server.' });

  try {
    const { audioBase64, audioMimeType, clientName, meetingDate, location, preparedBy, extraCtx } = req.body;

    // Step 1: Transcribe
    const transcriptRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: `Transcribe this audio recording completely and accurately. This is a client consultation meeting from The Housekraft, a luxury interior design company in Bangalore. Label each speaker clearly (e.g. "Sales Manager:", "Client:", etc. — use real names if mentioned). Include all dialogue. If non-English is spoken, transliterate to English. Capture everything accurately. Output only the transcript with speaker labels, no extra commentary.` },
              { inline_data: { mime_type: audioMimeType, data: audioBase64 } }
            ]
          }],
          generationConfig: { maxOutputTokens: 8192 }
        })
      }
    );

    const transcriptData = await transcriptRes.json();
    if (!transcriptRes.ok) throw new Error(transcriptData.error?.message || 'Transcription failed');
    const transcript = transcriptData.candidates?.[0]?.content?.parts?.[0]?.text || '';

    // Step 2: Generate MoM
    const momPrompt = `Create a formal Minutes of Meeting (MoM) for The Housekraft, a luxury interior design company in Bangalore.

MEETING DETAILS:
- Client: ${clientName}
- Date: ${meetingDate}
- Location/Medium: ${location}
- Prepared By: ${preparedBy}
${extraCtx ? '- Context: ' + extraCtx : ''}

TRANSCRIPT:
${transcript}

Generate clean inner HTML (no doctype/html/body tags) with these sections:
1. Title "Minutes of Meeting" + meta details using <div class="meta-grid"> with <span class="meta-label"> + <span> pairs
2. Attendees
3. Purpose / Agenda
4. Discussion Summary — detailed, <h2> for major topics, <p> for content, be thorough
5. Client Requirements & Preferences — thorough <ul><li> list
6. Action Items — <table class="action-table"> with columns: Action Item | Owner | Deadline
7. Next Steps
8. Closing Notes

Available CSS classes: h1, h2, h3, .meta-grid, .meta-label, .section-card, .divider, .action-table, ul, li. Be detailed and professional. Output only valid inner HTML — no markdown, no backticks.`;

    const momRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: momPrompt }] }],
          generationConfig: { maxOutputTokens: 8192 }
        })
      }
    );

    const momData = await momRes.json();
    if (!momRes.ok) throw new Error(momData.error?.message || 'MoM generation failed');
    let mom = momData.candidates?.[0]?.content?.parts?.[0]?.text || '';

    // Strip any markdown code fences if Gemini adds them
    mom = mom.replace(/^```html\n?/i, '').replace(/^```\n?/, '').replace(/\n?```$/, '');

    return res.status(200).json({ transcript, mom });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
