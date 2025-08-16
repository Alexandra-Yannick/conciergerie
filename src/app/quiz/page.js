"use client";
import { useRouter } from "next/navigation";

export default function QuizEntry() {
  const router = useRouter();

  return (
    <main className="mx-auto max-w-2xl p-6 space-y-6">
      <h1 className="text-2xl font-bold">Êtes-vous fait pour la conciergerie locative ?</h1>
      <p className="text-gray-700">
        Faites le test et découvrez par où commencer pour réussir dans ce métier.
      </p>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">🧭 Où en êtes-vous aujourd’hui ?</h2>

        <button
          onClick={() => router.push("/quiz/reconversion")}
          className="w-full rounded-lg border p-4 text-left hover:bg-gray-50"
        >
          🟢 Je découvre le métier, je réfléchis à une éventuelle reconversion
        </button>

        <button
          onClick={() => router.push("/quiz/lancement")}
          className="w-full rounded-lg border p-4 text-left hover:bg-gray-50"
        >
          🔵 J’ai déjà commencé à me renseigner sérieusement ou lancé mon activité
        </button>
      </section>
    </main>
  );
}
