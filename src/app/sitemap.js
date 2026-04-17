import { blogArticles } from "@/data/blog-articles";

const BASE_URL = "https://www.cap-conciergerie.com";

export default function sitemap() {
  const staticPages = [
    { url: BASE_URL, priority: 1.0, changeFrequency: "weekly" },
    { url: `${BASE_URL}/quiz`, priority: 0.9, changeFrequency: "monthly" },
    { url: `${BASE_URL}/offre`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE_URL}/blog`, priority: 0.7, changeFrequency: "weekly" },
    { url: `${BASE_URL}/cgu`, priority: 0.2, changeFrequency: "yearly" },
  ];

  const blogPages = blogArticles.map((article) => ({
    url: `${BASE_URL}/blog/${article.slug}`,
    lastModified: article.date ? new Date(article.date) : new Date(),
    priority: 0.6,
    changeFrequency: "monthly",
  }));

  return [...staticPages, ...blogPages];
}
