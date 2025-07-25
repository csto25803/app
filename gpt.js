async function fetchPersonalityFromGPT(name, type) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer YOUR_API_KEY"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{
        role: "system",
        content: `あなたは食材に人格を与えるAIです。${type}の食材「${name}」の性格は？`
      }]
    })
  });
  const data = await response.json();
  return data.choices[0].message.content;
}