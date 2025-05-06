import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Questionario from "../components/Questionario";
import QuestaoModel from "../model/questao";

const BASE_URL = "http://localhost:3000/api";

export default function Quiz() {
  const router = useRouter();
  const { assunto } = router.query;

  const [questoes, setQuestoes] = useState<QuestaoModel[]>([]);
  const [questaoAtual, setQuestaoAtual] = useState<QuestaoModel>();
  const [respostasCertas, setRespostasCertas] = useState<number>(0);
  const [indiceAtual, setIndiceAtual] = useState<number>(0);

  async function carregarQuestoes(assunto: string) {
    try {
      const resp = await fetch(
        `${BASE_URL}/questionario?assunto=${encodeURIComponent(assunto)}`
      );
      if (!resp.ok) {
        throw new Error(`Erro ao carregar questões: ${resp.status}`);
      }
      const questoesJson = await resp.json();

      if (!Array.isArray(questoesJson)) {
        throw new Error("Formato inesperado de questões");
      }

      const questoes = questoesJson.map((q: any) =>
        QuestaoModel.criarUsandoObjeto(q)
      );
      setQuestoes(questoes);
      setQuestaoAtual(questoes[0]);
    } catch (error) {
      console.error(error);
      alert("Não foi possível carregar o quiz. Tente novamente mais tarde.");
      router.push("/");
    }
  }

  useEffect(() => {
    if (assunto) {
      carregarQuestoes(assunto as string);
    }
  }, [assunto]);

  function questaoRespondida(questaoRespondida: QuestaoModel) {
    setQuestaoAtual(questaoRespondida);
    const acertou = questaoRespondida.acertou;
    setRespostasCertas(respostasCertas + (acertou ? 1 : 0));
  }

  function irPraProximoPasso() {
    const proximoIndice = indiceAtual + 1;
    if (proximoIndice < questoes.length) {
      setIndiceAtual(proximoIndice);
      setQuestaoAtual(questoes[proximoIndice]);
    } else {
      finalizar();
    }
  }

  function finalizar() {
    router.push({
      pathname: "/resultado",
      query: {
        total: questoes.length,
        certas: respostasCertas,
      },
    });
  }

  return questaoAtual ? (
    <Questionario
      questao={questaoAtual}
      ultima={indiceAtual === questoes.length - 1}
      questaoRespondida={questaoRespondida}
      irPraProximoPasso={irPraProximoPasso}
    />
  ) : (
    <div className="text-center mt-64 text-purple-600">Carregando...</div>
  );
}
