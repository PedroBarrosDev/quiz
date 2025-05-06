import { NextApiRequest, NextApiResponse } from "next";
import { gerarQuestoes } from "../../api/geradorDeQuestoes";

export default async function questionario(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { assunto } = req.query;

  if (!assunto || typeof assunto !== "string") {
    return res.status(400).json({ erro: "Assunto inválido" });
  }

  try {
    const questoes = await gerarQuestoes(assunto);
    res.status(200).json(questoes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao gerar questões" });
  }
}
