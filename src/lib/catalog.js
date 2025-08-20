// src/lib/catalog.js
export const CATALOG = {
  module_m1: {
    name: "Module 1 — Comprendre le métier",
    price: 9900, // en centimes: 99 €
    files: ["/private/pdf/module_1.pdf"],
  },
  module_m2: {
    name: "Module 2 — Se lancer en toute légalité",
    price: 9900,
    files: ["/private/pdf/module_2.pdf"],
  },
  module_m3: {
    name: "Module 3 — Construire une offre rentable et pro",
    price: 9900,
    files: ["/private/pdf/module_3.pdf"],
  },
  module_m4: {
    name: "Module 4 — Gagner en organisation et productivité",
    price: 9900,
    files: ["/private/pdf/module_4.pdf"],
  },
  module_m5: {
    name: "Module 5 — Piloter son business et grandir",
    price: 9900,
    files: ["/private/pdf/module_5.pdf"],
  },
  pack_m1_m2_m3: {
    name: "Pack M1+M2+M3 — Bases, Légal & Offre",
    price: 29700,
    files: [
      "/private/pdf/module_1.pdf",
      "/private/pdf/module_2.pdf",
      "/private/pdf/module_3.pdf",
    ],
  },
  pack_m4_m5: {
    name: "Pack M4+M5 — Organisation & Pilotage",
    price: 19800,
    files: [
      "/private/pdf/module_4.pdf",
      "/private/pdf/module_5.pdf",
    ],
  },
  pack_m2_m3_m4: {
    name: "Pack M2+M3+M4 — Légal, Offre & Ops",
    price: 29700,
    files: [
      "/private/pdf/module_2.pdf",
      "/private/pdf/module_3.pdf",
      "/private/pdf/module_4.pdf",
    ],
  },
  pack_m1_m3: {
    name: "Pack M1+M3 — Comprendre & Vendre",
    price: 19800,
    files: [
      "/private/pdf/module_1.pdf",
      "/private/pdf/module_3.pdf",
    ],
  },
  pack_m1_m2: {
    name: "Pack M1+M2 — Bases & Légal",
    price: 19800,
    files: [
      "/private/pdf/module_1.pdf",
      "/private/pdf/module_2.pdf",
    ],
  },
  pack_complet: {
    name: "Pack complet (5 modules)",
    price: 39000,
    files: [
      "/private/pdf/module_1.pdf",
      "/private/pdf/module_2.pdf",
      "/private/pdf/module_3.pdf",
      "/private/pdf/module_4.pdf",
      "/private/pdf/module_5.pdf",
      "/private/fiches/fiches_outils.pdf",
    ],
  },
};