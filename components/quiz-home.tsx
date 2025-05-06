"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import { ArrowRight, BrainCircuit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function QuizHome() {
  const [quizTopic, setQuizTopic] = useState("");
  const router = useRouter(); // aqui

  const handleStartQuiz = () => {
    if (quizTopic.trim()) {
      router.push(`/quiz?assunto=${encodeURIComponent(quizTopic.trim())}`);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-16">
      <div className="flex flex-col items-center mb-8">
        <div className="bg-purple-600 p-4 rounded-full mb-4">
          <BrainCircuit className="h-12 w-12 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-center text-purple-900">
          QuizMaster
        </h1>
        <p className="text-black-600 text-center mt-2">
          Teste seus conhecimentos em qualquer assunto
        </p>
      </div>

      <Card className="border-purple-200 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-center">Novo Quiz</CardTitle>
          <CardDescription className="text-center">
            Digite o assunto para gerar um quiz personalizado
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              placeholder="Ex: História do Brasil, Matemática, Astronomia..."
              value={quizTopic}
              onChange={(e) => setQuizTopic(e.target.value)}
              className="border-purple-200 focus:border-purple-400"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleStartQuiz}
            disabled={!quizTopic.trim()}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            Iniciar Quiz
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>

      <div className="mt-8 text-center text-sm text-black-500">
        <p>Crie quizzes sobre qualquer assunto e teste seus conhecimentos</p>
      </div>
    </div>
  );
}
