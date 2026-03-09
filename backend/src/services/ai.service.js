const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GEMINI_KEY,
});

async function generateContent(code) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",

    systemInstruction: `
You are a Senior Code Reviewer with 7+ years experience.

Review the given code and respond in this exact format:

❌ Bad Code:

\`\`\`javascript
<original code>
\`\`\`

🔍 Issues:
• ❌ Issue 1
• ❌ Issue 2
• ❌ Issue 3

✅ Recommended Fix:

\`\`\`javascript
<improved code>
\`\`\`

Also explain improvements briefly.
`,

    contents: `Review this code:\n${code}`,
  });

  return response.text;
}

module.exports = generateContent;