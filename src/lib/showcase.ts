// 3D interior render showcase.
// Images live in src/assets/showcase/<uuid>.jpg and are resolved to hashed URLs
// at build time. Scenes group renders by room; twin angles (same room, slight
// camera shift) are ordered adjacently so they can be crossfaded into a
// pseudo "camera move".
//
// NOTE: room grouping below is PROVISIONAL (clustered visually). Re-map the
// `images` uuids per scene once authoritative room labels are supplied.

const modules = import.meta.glob("../assets/showcase/*.jpg", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const byId: Record<string, string> = {};
for (const [path, url] of Object.entries(modules)) {
  const id = path.split("/").pop()!.replace(/\.jpg$/, "");
  byId[id] = url;
}

/** Resolve a render uuid to its built URL. */
export const img = (id: string): string => {
  const url = byId[id];
  if (!url && import.meta.env.DEV) {
    console.warn(`[showcase] unknown render id: ${id}`);
  }
  return url ?? "";
};

export interface Scene {
  id: string;
  /** Room category slug. */
  room: string;
  title: string;
  blurb: string;
  /** Render uuids; first is primary. Pairs of near-identical angles crossfade. */
  images: string[];
}

export const scenes: Scene[] = [
  {
    id: "grand-foyer",
    room: "Living",
    title: "The Grand Foyer",
    blurb:
      "A double-height entrance where brushed-gold screens, a cascading butterfly stair and sculptural seating set the tone for the whole home.",
    images: [
      // twin angles first so the crossfade reads as a real camera move
      "cd2b4dce-5c3c-4332-85df-30cdb2228c7e",
      "b02b0ee6-938d-4890-b89e-4d082e2d3ebc",
      "235b0364-08c0-4dfa-888c-6fcf46d710b9",
      "16059cc2-bb1a-4b45-87c4-a2958b40334f",
      "9b20e54e-c41e-425d-bd96-d9d95cea0911",
    ],
  },
  {
    id: "family-living",
    room: "Living",
    title: "Family Living",
    blurb:
      "A curved teal sofa anchors an open lounge lit by paired ring chandeliers and warm cove lighting.",
    images: [
      "3ab367b4-6781-499a-b9cd-a404d169005a",
      "bcb3416b-e053-47a5-96f6-71bb024bb7a0",
    ],
  },
  {
    id: "drawing-room",
    room: "Living",
    title: "The Drawing Room",
    blurb:
      "Classical wall panelling, an organic gilt mirror and mirrored twin sofas make an elegant space for guests.",
    images: [
      "757ae974-c9e9-4361-8eb5-64e72e3c872d",
      "9b20faec-8bb7-487e-af35-6f8ec61f805d",
    ],
  },
  {
    id: "dining",
    room: "Dining",
    title: "Formal Dining",
    blurb:
      "A gallery-lined approach opens to a soaring dining hall framed by a golden garden window and a suspended butterfly installation.",
    images: ["bf6e5e3a-78d9-4d30-8775-69e67ba4a491"],
  },
  {
    id: "master-green",
    room: "Bedroom",
    title: "Sage Master Suite",
    blurb:
      "Muted sage panelling, ornate mouldings and a rose-gold chandelier compose a serene, timeless master bedroom.",
    images: [
      "209d7641-b9c2-401b-9966-443604d2bce9",
      "843ed2a2-6bb5-476a-9728-47b8b41e4d0d",
    ],
  },
  {
    id: "master-cream",
    room: "Bedroom",
    title: "Ivory Master Suite",
    blurb:
      "A tufted classical bed beneath a crystal chandelier, wrapped in ivory panelling and warm oak floors.",
    images: ["a6dacc83-fab2-491d-8ad1-81b08ecad29b"],
  },
  {
    id: "modern-bedroom",
    room: "Bedroom",
    title: "Contemporary Bedroom",
    blurb:
      "Fluted headboard, sputnik lighting and a tan lounge chaise for a relaxed, modern retreat.",
    images: [
      "4961627d-aacf-423f-ac44-050345f65e6d",
      "3d78bc72-c7a1-48e5-9d04-e1bcd428ea7e",
    ],
  },
  {
    id: "guest-bedroom",
    room: "Bedroom",
    title: "Guest Bedroom",
    blurb:
      "Textured stone and leather panelling, brass sconces and a powder-blue bed create a calm guest retreat.",
    images: [
      "cab53033-fe46-4d0f-aa62-1e04e9288832",
      "81dafe00-ea61-45c4-a83f-452599997eef",
    ],
  },
  {
    id: "daughter-room",
    room: "Bedroom",
    title: "Daughter's Room",
    blurb:
      "A soft, playful palette with a floral chandelier, study nook and keepsake shelf for a growing child.",
    images: [
      "2ca34403-e8ff-4c03-be81-a23cc954ddbe",
      "de1e2199-8508-4261-87a0-cf9b79d75b26",
    ],
  },
];

export const sceneById = (id: string): Scene | undefined =>
  scenes.find((s) => s.id === id);

/** Flat list of every render url (primary + twins), in scene order. */
export const allRenders: string[] = scenes.flatMap((s) => s.images.map(img));

/** Hero rotation — strongest wide shots. */
export const heroScenes: Scene[] = [
  scenes[0], // grand foyer
  scenes[1], // family living
  scenes[4], // sage master
];
