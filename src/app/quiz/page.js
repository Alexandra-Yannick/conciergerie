// src/app/quiz/page.js
"use client";
import { Container, Card, Button } from "@/components/ui";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  return (
    <Container className="pt-8 pb-12">
      <h1 className="text-2xl font-bold mb-4">Êtes-vous fait pour la conciergerie locative ?</h1>
      <Card className="p-6 bg-white border">
        <h2 className="text-xl font-semibold mb-4">🧭 Où en êtes-vous aujourd’hui ?</h2>
        <div className="grid gap-3">
          <Button className="justify-start" onClick={() => router.push("/quiz/reconversion")}>
            🟢 Je découvre / reconversion
          </Button>
          <Button className="justify-start" variant="secondary" onClick={() => router.push("/quiz/lancement")}>
            🔵 J’ai déjà commencé / lancement
          </Button>
        </div>
      </Card>
    </Container>
  );
}
