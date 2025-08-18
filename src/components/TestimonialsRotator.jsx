"use client";
import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui";
import { Star } from "lucide-react";

export default function TestimonialsRotator({ items, count = 3, interval = 6000, border, lightBg }) {
  // offset = 0 au premier rendu => contenu identique SSR/Client
  const [offset, setOffset] = useState(0);

  // Fait tourner les avis après montage
  useEffect(() => {
    if (!items?.length) return;
    const id = setInterval(() => {
      setOffset((o) => (o + 1) % items.length);
    }, interval);
    return () => clearInterval(id);
  }, [items, interval]);

  const visible = useMemo(() => {
    if (!items?.length) return [];
    const arr = [];
    for (let i = 0; i < Math.min(count, items.length); i++) {
      arr.push(items[(i + offset) % items.length]);
    }
    return arr;
  }, [items, count, offset]);

  return (
    <div className="grid md:grid-cols-3 gap-5">
      {visible.map((t, i) => (
        <Card key={`${t.name}-${i}`} className="p-6" bg="#ffffff" border={border}>
          {/* étoiles */}
          <div className="flex items-center gap-1" style={{ color: "#FFB300" }}>
            {Array.from({ length: t.rating }).map((_, j) => (
              <Star key={`f-${j}`} className="size-4 fill-current" />
            ))}
            {Array.from({ length: 5 - t.rating }).map((_, j) => (
              <Star key={`o-${j}`} className="size-4" />
            ))}
          </div>
          {/* texte + auteur */}
          <p className="mt-3 text-sm text-neutral-700">“{t.text}”</p>
          <p className="mt-3 text-xs text-neutral-500">{t.name}</p>
        </Card>
      ))}
    </div>
  );
}
