import openai from "../api/openai";

export async function gerarQuestoes(assunto: string) {
  const prompt = `
Crie 5 perguntas sobre "${assunto}" no formato de quiz.

Formato de cada pergunta:
- "id": número único começando de 1
- "enunciado": a pergunta em texto
- "respostas": 4 alternativas, sendo:
  - 1 correta (campo "certa": true)
  - 3 incorretas (campo "certa": false)

Formato de resposta em JSON:
[
  {
    "id": 1,
    "enunciado": "Pergunta aqui",
    "respostas": [
      {"valor": "Resposta correta", "certa": true},
      {"valor": "Resposta errada 1", "certa": false},
      {"valor": "Resposta errada 2", "certa": false},
      {"valor": "Resposta errada 3", "certa": false}
    ]
  },
  ...
]
Apenas envie o JSON, sem comentários, texto extra ou explicações.
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: 2000,
  });

  const content = response.choices[0].message?.content || "";

  return JSON.parse(content);
}
