"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, ArrowRight, ArrowLeft } from "lucide-react";
import { Container, Card, Badge, Button } from "@/components/ui";
import { blogArticles, formatDate } from "@/data/blog-articles";

const colors = {
  pastel: "var(--color-pastel)",
  vivid: "var(--color-vivid)",
  light: "var(--color-light)",
  dark: "var(--color-dark)",
};

// Couleurs par catégorie
const categoryColors = {
  "Démarrage": { bg: "#E8F5E9", fg: "#2E7D32" },
  "Conseils": { bg: "#FFF3E0", fg: "#E65100" },
  "Reconversion": { bg: "#E3F2FD", fg: "#1565C0" },
  "Stratégie": { bg: "#F3E5F5", fg: "#7B1FA2" },
};

function ArticleCard({ article, index }) {
  const catColor = categoryColors[article.category] || { bg: colors.light, fg: colors.dark };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link href={`/blog/${article.slug}`} className="block group">
        <Card className="overflow-hidden h-full flex flex-col" bg="#ffffff" border={colors.pastel}>
          {/* Remplacement du Placeholder par la vraie Image */}
          <div className="h-48 relative overflow-hidden bg-neutral-100">
            <img 
              src={article.image} 
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Badge catégorie */}
            <div className="absolute top-3 left-3">
              <Badge bg={catColor.bg} fg={catColor.fg}>
                {article.category}
              </Badge>
            </div>
          </div>

          {/* Contenu */}
          <div className="p-5 flex-1 flex flex-col">
            <h2 className="text-lg font-bold text-neutral-900 group-hover:text-[var(--color-vivid)] transition-colors line-clamp-2">
              {article.title}
            </h2>

            <p className="mt-2 text-sm text-neutral-600 line-clamp-3 flex-1">
              {article.metaDesc}
            </p>

            <div className="mt-4 flex items-center justify-between text-xs text-neutral-500">
              <span>{formatDate(article.date)}</span>
            </div>

            <div className="mt-4 flex items-center text-sm font-medium" style={{ color: colors.vivid }}>
              Lire l&apos;article
              <ArrowRight className="ml-1 size-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}

export default function BlogPage() {
  return (
    <div
      className="min-h-screen text-neutral-900"
      style={{ backgroundImage: `linear-gradient(to bottom, ${colors.light}, #ffffff)` }}
    >
      {/* Header */}
{/* Header */}
<Container className="pt-8 pb-10">
        {/* Bouton Retour Home */}
        <div className="flex justify-start mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-black transition-colors group"
          >
            <div className="p-2 rounded-full bg-white border border-neutral-200 group-hover:border-black transition-all">
              <ArrowLeft className="size-4" />
            </div>
            Retour à l&apos;accueil
          </Link>
        </div>

        <div className="text-center max-w-3xl mx-auto">
          <Badge className="mb-4" bg={colors.pastel} fg={colors.dark}>
            Blog • Conseils & Ressources
          </Badge>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl font-extrabold"
          >
            Le blog de la conciergerie
          </motion.h1>

          <p className="mt-4 text-lg text-neutral-700">
            Conseils pratiques, retours d&apos;expérience et stratégies pour réussir dans le métier de concierge.
          </p>
        </div>
      </Container>

      {/* Articles Grid */}
      <Container className="pb-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogArticles.map((article, index) => (
            <ArticleCard key={article.slug} article={article} index={index} />
          ))}
        </div>

        {/* CTA vers le quiz */}
        <Card className="mt-12 p-8 text-center" bg={colors.dark} border={colors.dark}>
          <h2 className="text-2xl font-extrabold text-white">
            Prêt à vous lancer ?
          </h2>
          <p className="mt-2" style={{ color: colors.light }}>
            Faites le questionnaire pour découvrir votre profil et la formation adaptée.
          </p>
          <Button className="mt-5" href="/quiz">
            Commencer le questionnaire <ArrowRight className="ml-2 inline size-4" />
          </Button>
        </Card>
      </Container>

      {/* Footer */}
      <Container className="pb-8">
        <p className="text-center text-xs text-neutral-500">
          © {new Date().getFullYear()} — Cap Conciergerie. Tous droits réservés.
          <Link href="/cgu" className="ml-2 underline hover:text-neutral-700">
            CGU
          </Link>
        </p>
      </Container>
    </div>
  );
}
