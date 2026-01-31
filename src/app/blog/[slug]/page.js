"use client";

import React from "react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { motion } from "framer-motion";
import { Clock, ArrowLeft, ArrowRight, BookOpen, Calendar } from "lucide-react";
import { Container, Card, Badge, Button } from "@/components/ui";
import { blogArticles, getArticleBySlug, formatDate } from "@/data/blog-articles";

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

// Composant pour rendre le contenu markdown simplifié
function ArticleContent({ content }) {
  // On découpe le contenu en blocs par double saut de ligne
  const blocks = content.trim().split(/\n\s*\n/);
  const elements = [];

  blocks.forEach((block, index) => {
    const trimmed = block.trim();
    if (!trimmed) return;

    // 1. GESTION DES IMAGES [IMAGE: chemin | description]
    if (trimmed.includes("[IMAGE:")) {
      const match = trimmed.match(/\[IMAGE:\s*([^|]+)\s*\|\s*([^\]]+)\s*\]/);
      if (match) {
        const src = match[1].trim();
        const alt = match[2].trim();
        elements.push(
          <div key={`img-${index}`} className="my-10">
            <img 
              src={src} 
              alt={alt} 
              className="rounded-2xl w-full h-auto shadow-xl border border-neutral-100" 
              onError={(e) => {
                e.target.style.display = 'none';
                console.error("Image introuvable :", src);
              }}
            />
            <p className="text-center text-sm text-neutral-400 mt-3 italic font-light">
              {alt}
            </p>
          </div>
        );
        return;
      }
    }

    // 2. TITRES (##)
    if (trimmed.startsWith("## ")) {
      elements.push(
        <h2 key={`h2-${index}`} className="text-2xl sm:text-3xl font-bold mt-12 mb-6 text-neutral-900 tracking-tight">
          {trimmed.replace("## ", "")}
        </h2>
      );
      return;
    }

    // 3. SOUS-TITRES (###)
    if (trimmed.startsWith("### ")) {
      elements.push(
        <h3 key={`h3-${index}`} className="text-xl font-bold mt-8 mb-4 text-neutral-800">
          {trimmed.replace("### ", "")}
        </h3>
      );
      return;
    }

    // 4. LISTES (Lignes commençant par "- ")
    if (trimmed.startsWith("- ")) {
      const items = trimmed.split("\n").map(li => li.replace("- ", "").trim());
      elements.push(
        <ul key={`list-${index}`} className="my-6 space-y-3">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-neutral-700">
              <span className="text-[var(--color-vivid)] mt-1.5">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
      return;
    }

    // 5. BLOCS AVEC HTML (Liens <a>)
    if (trimmed.includes("<a ") || trimmed.includes("<br") || trimmed.includes("</a>")) {
      elements.push(
        <div 
          key={`html-${index}`} 
          className="my-4 text-neutral-700 leading-relaxed text-lg" 
          dangerouslySetInnerHTML={{ __html: trimmed }} 
        />
      );
      return;
    }

    // 6. PARAGRAPHES NORMAUX (Gère le gras **texte**)
    const parts = trimmed.split(/\*\*(.+?)\*\*/g);
    elements.push(
      <p key={`p-${index}`} className="my-4 text-neutral-700 leading-relaxed text-lg">
        {parts.map((part, i) => 
          i % 2 === 1 ? <strong key={i} className="font-bold text-neutral-900">{part}</strong> : part
        )}
      </p>
    );
  });

  return <>{elements}</>;
}
// Suggestions d'articles similaires
function RelatedArticles({ currentSlug }) {
  const related = blogArticles
    .filter((a) => a.slug !== currentSlug)
    .slice(0, 2);

  if (related.length === 0) return null;

  return (
    <div className="mt-12">
      <h3 className="text-xl font-bold mb-4">Articles similaires</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        {related.map((article) => {
          const catColor = categoryColors[article.category] || { bg: colors.light, fg: colors.dark };
          return (
            <Link key={article.slug} href={`/blog/${article.slug}`} className="group">
              <Card className="p-4" bg="#ffffff" border={colors.pastel}>
                <Badge bg={catColor.bg} fg={catColor.fg} className="mb-2">
                  {article.category}
                </Badge>
                <h4 className="font-semibold text-neutral-900 group-hover:text-[var(--color-vivid)] transition-colors line-clamp-2">
                  {article.title}
                </h4>
                <p className="mt-1 text-sm text-neutral-600 line-clamp-2">
                  {article.metaDesc}
                </p>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
export default function ArticlePage() {
  const params = useParams();
  const article = getArticleBySlug(params.slug);

  // Si l'article n'existe pas
  if (!article) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundImage: `linear-gradient(to bottom, ${colors.light}, #ffffff)` }}
      >
        <Card className="p-8 text-center max-w-md" bg="#ffffff" border={colors.pastel}>
          <BookOpen className="size-12 mx-auto text-neutral-400 mb-4" />
          <h1 className="text-2xl font-bold">Article non trouvé</h1>
          <p className="mt-2 text-neutral-600">
            Cet article n&apos;existe pas ou a été déplacé.
          </p>
          <Button className="mt-6" href="/blog">
            <ArrowLeft className="mr-2 size-4" />
            Retour au blog
          </Button>
        </Card>
      </div>
    );
  }

  const catColor = categoryColors[article.category] || { bg: colors.light, fg: colors.dark };

  return (
    <div
      className="min-h-screen text-neutral-900"
      style={{ backgroundImage: `linear-gradient(to bottom, ${colors.light}, #ffffff)` }}
    >
      {/* Header */}
      <Container className="pt-8">
        <Link
          href="/blog"
          className="inline-flex items-center text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
        >
          <ArrowLeft className="mr-1 size-4" />
          Retour au blog
        </Link>
      </Container>

      {/* Article Header */}
      <Container className="pt-6 pb-8">
        <div className="max-w-3xl mx-auto">
        <img src={article.image} alt={article.title} className="w-full h-64 sm:h-96 object-cover rounded-2xl mb-8 shadow-lg" />
          <Badge bg={catColor.bg} fg={catColor.fg} className="mb-4">
            {article.category}
          </Badge>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-extrabold leading-tight"
          >
            {article.title}
          </motion.h1>

          <p className="mt-4 text-lg text-neutral-600">
            {article.metaDesc}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-neutral-500">
            <span className="flex items-center gap-1">
              <Calendar className="size-4" />
              {formatDate(article.date)}
            </span>
          </div>
        </div>
      </Container>

      {/* Article Content */}
      <Container className="pb-12">
        <div className="max-w-3xl mx-auto">
          <Card className="p-6 sm:p-10" bg="#ffffff" border={colors.pastel}>
            <article className="prose prose-neutral max-w-none">
              <ArticleContent content={article.content} />
            </article>
          </Card>

          {/* CTA formation */}
          <Card className="mt-8 p-6" bg={colors.pastel} border={colors.pastel}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-semibold" style={{ color: colors.dark }}>
                  Prêt à vous lancer ?
                </p>
                <p className="text-sm" style={{ color: colors.dark }}>
                  Découvrez notre formation complète pour créer votre conciergerie.
                </p>
              </div>
              <Button href="/" variant="primary">
                Voir la formation
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </div>
          </Card>

          {/* Articles similaires */}
          <RelatedArticles currentSlug={article.slug} />
        </div>
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
