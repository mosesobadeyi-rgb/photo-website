export interface Credit {
  key: string;
  value: string;
}

export interface ProjectImage {
  src: string;
  alt: string;
  aspect: string; // Tailwind aspect-ratio class like 'aspect-[3/4]', 'aspect-[16/9]', 'aspect-[4/5]'
}

export interface MotionAsset {
  src: string;
  poster: string;
}

export interface Project {
  slug: string;
  title: string;
  client: string;
  genre: 'portrait' | 'editorial' | 'fashion' | 'documentary' | 'travel' | 'commercial';
  medium: string;
  year: string;
  description: string;
  credits: Credit[];
  images: ProjectImage[];
  motionAsset?: MotionAsset;
  featured: boolean;
}

export const projects: Project[] = [
  {
    slug: "inertia",
    title: "INERTIA",
    client: "Kinfolk Magazine",
    genre: "fashion",
    medium: "Medium Format Film (Hasselblad H6D)",
    year: "2025",
    description: "An editorial investigation into movement, drapery, and stillness. Shot against the brutalist concrete structures of the Berlin suburban fringe, Inertia studies how heavy woolens and fluid silks interact with rigid architectural geometries under harsh, overcast midday light.",
    featured: true,
    credits: [
      { key: "Client", value: "Kinfolk Magazine" },
      { key: "Stylist", value: "Elena Rostova" },
      { key: "MUA & Hair", value: "Yuki Sato" },
      { key: "Talent", value: "Amara Okereke (Elite)" },
      { key: "Production", value: "Studio Berlin" },
      { key: "Light Assistant", value: "Lukas Weber" }
    ],
    images: [
      { src: "/images/inertia-1.webp", alt: "Fluid silk dress flowing in contrast with brutalist concrete wall", aspect: "aspect-[3/4]" },
      { src: "/images/inertia-2.webp", alt: "Close-up portrait of model with soft light reflecting on drapery", aspect: "aspect-[4/5]" },
      { src: "/images/inertia-3.webp", alt: "Full length shot of model walking on concrete stairs", aspect: "aspect-[16/9]" }
    ],
    motionAsset: {
      src: "/videos/inertia-loop.mp4",
      poster: "/images/inertia-1.webp"
    }
  },
  {
    slug: "silent-tides",
    title: "SILENT TIDES",
    client: "National Geographic",
    genre: "documentary",
    medium: "35mm Leica M6 (Portra 400)",
    year: "2024",
    description: "Documenting the vanishing fishing communities along the wild Atlantic coast of Portugal. This series focuses on the tactile relationships between the fisherman's hands, the abrasive hemp nets, and the relentless saline mist. It is an unvarnished narrative of survival and silence.",
    featured: true,
    credits: [
      { key: "Client", value: "National Geographic" },
      { key: "Photographer", value: "Nathan Graphics" },
      { key: "Local Fixer", value: "João Silva" },
      { key: "Field Producer", value: "Marta Rocha" },
      { key: "Colorist", value: "Devon Harrison" }
    ],
    images: [
      { src: "/images/tides-1.webp", alt: "Weathered hands of an elderly fisherman holding a woven nylon net", aspect: "aspect-[4/5]" },
      { src: "/images/tides-2.webp", alt: "Wooden fishing trawler battling heavy Atlantic mist", aspect: "aspect-[3/2]" },
      { src: "/images/tides-3.webp", alt: "Solitary figure walking along the dark basalt coastline", aspect: "aspect-[3/4]" }
    ],
    motionAsset: {
      src: "/videos/tides-loop.mp4",
      poster: "/images/tides-1.webp"
    }
  },
  {
    slug: "chroma-studies",
    title: "CHROMA STUDIES",
    client: "Self-Published / Dazed",
    genre: "portrait",
    medium: "Digital (Phase One XF 150MP)",
    year: "2025",
    description: "A clinical examination of color theory and human emotion. By bathing subjects in narrow-spectrum monochromatic lighting, the portraits strip away structural context, leaving only raw expression, skin texture, and light diffraction.",
    featured: true,
    credits: [
      { key: "Publisher", value: "Dazed Digital" },
      { key: "Lighting Design", value: "Marcus Thorne" },
      { key: "Gaffer", value: "Kai Winters" },
      { key: "Talent", value: "Sasha Demidov" }
    ],
    images: [
      { src: "/images/chroma-1.webp", alt: "Subject bathed in rich electric red neon light, highlighting facial details", aspect: "aspect-[3/4]" },
      { src: "/images/chroma-2.webp", alt: "Abstract side profile under deep cobalt blue lighting", aspect: "aspect-[4/5]" },
      { src: "/images/chroma-3.webp", alt: "Double exposure silhouette under vivid green spectrum light", aspect: "aspect-[3/4]" }
    ]
  },
  {
    slug: "brutal-forms",
    title: "BRUTAL FORMS",
    client: "Architectural Digest",
    genre: "editorial",
    medium: "Large Format 8x10 Film (Arca-Swiss)",
    year: "2024",
    description: "Explorations of the shadow structures cast by mid-century brutalist masterpieces in London and Paris. Focusing on the interplay of sharp concrete edges, recessed windows, and dramatic afternoon shadows, these images frame buildings as living sculptures.",
    featured: true,
    credits: [
      { key: "Client", value: "Architectural Digest" },
      { key: "Art Direction", value: "Claire Dupont" },
      { key: "Post-Production", value: "Pixel & Grain Co." },
      { key: "Archival Research", value: "Arthur Pendelton" }
    ],
    images: [
      { src: "/images/brutal-1.webp", alt: "Brutalist concrete tower block framed against a stark clear sky", aspect: "aspect-[16/9]" },
      { src: "/images/brutal-2.webp", alt: "Dramatic shadow dividing a concrete stairwell in halves", aspect: "aspect-[3/4]" }
    ],
    motionAsset: {
      src: "/videos/brutal-loop.mp4",
      poster: "/images/brutal-1.webp"
    }
  },
  {
    slug: "solitude",
    title: "SOLITUDE",
    client: "Cereal Magazine",
    genre: "travel",
    medium: "Medium Format Film (Pentax 67)",
    year: "2023",
    description: "A quiet photographic journey through the snow-blanketed volcanic plateaus of northern Iceland. Shot during the winter solstice, the project captures the vast, empty landscapes and the profound silence of remote volcanic craters under a 3-hour twilight sun.",
    featured: true,
    credits: [
      { key: "Client", value: "Cereal Magazine" },
      { key: "Production", value: "Icelandic Expeditions" },
      { key: "Logistics", value: "Aron Halldórsson" }
    ],
    images: [
      { src: "/images/solitude-1.webp", alt: "Snow covered black sand beach under a dim winter sky", aspect: "aspect-[3/2]" },
      { src: "/images/solitude-2.webp", alt: "An isolated red house surrounded by vast snowfields", aspect: "aspect-[4/5]" }
    ]
  },
  {
    slug: "raw-lux",
    title: "RAW LUX",
    client: "Balenciaga",
    genre: "commercial",
    medium: "Digital (Hasselblad H6D-100c)",
    year: "2025",
    description: "Deconstructing luxury streetwear in raw industrial settings. The campaign plays with high-contrast shadows, textured iron backdrops, and functional accessories to challenge the boundaries between utility and luxury design.",
    featured: true,
    credits: [
      { key: "Client", value: "Balenciaga" },
      { key: "Creative Direction", value: "Demna" },
      { key: "Set Design", value: "Jean-Michel" },
      { key: "Production", value: "Paris Projects" }
    ],
    images: [
      { src: "/images/raw-1.webp", alt: "Oversized luxury jacket draped on an industrial iron scaffold", aspect: "aspect-[3/4]" },
      { src: "/images/raw-2.webp", alt: "Close-up of texturized high-end footwear against metallic dust", aspect: "aspect-[4/5]" }
    ],
    motionAsset: {
      src: "/videos/raw-loop.mp4",
      poster: "/images/raw-1.webp"
    }
  }
];
