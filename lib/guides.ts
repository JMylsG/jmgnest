// Hand-written local guides for the Things to Do activities.
// These render on /things-to-do/[slug] when there is no Sanity post for that
// slug, so the "Read guide" links on the activity cards open a real page.
// Add more entries here as guides are written, one per location slug.

export type GuideFact = { icon: string; label: string; value: string }
export type GuideSection = { heading: string; paragraphs: string[] }

export type LocalGuide = {
  slug: string
  name: string
  category: string
  eyebrow: string
  title: string
  lead: string
  heroImage: string
  heroAlt: string
  distance: string
  travelTime: string
  mapUrl: string
  facts: GuideFact[]
  sections: GuideSection[]
  note: GuideSection
  metaTitle: string
  metaDescription: string
}

const GUIDES: Record<string, LocalGuide> = {
  'igorot-stone-kingdom': {
    slug: 'igorot-stone-kingdom',
    name: 'Igorot Stone Kingdom',
    category: 'Culture',
    eyebrow: 'Culture · Field guide',
    title: 'Igorot Stone Kingdom: a mountain built by hand',
    lead: 'A young landmark with old roots. Come for the stone towers and the view, stay for the story of the people who have called these mountains home for centuries.',
    heroImage: '/things-to-do-images/igorot-stone-kingdom.jpg',
    heroAlt: 'Hand-stacked stone towers and terraces at Igorot Stone Kingdom, Baguio',
    distance: '5.2 km from the nest',
    travelTime: '15 minutes by car',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=16.3988,120.6114',
    facts: [
      { icon: 'i-clock', label: 'Hours', value: 'Open daily · about 6:00 AM to 6:00 PM. Hours can shift on holidays and in heavy rain, so it helps to confirm before you set out.' },
      { icon: 'i-ticket', label: 'Entrance', value: 'Around ₱50 per person. Bring small cash for the gate and the local stalls.' },
      { icon: 'i-calendar', label: 'Best time', value: 'Early morning for cool air and soft light, and the dry months from November to February for the clearest skies.' },
      { icon: 'i-pin', label: 'Getting there', value: 'Camp 7, along Marcos Highway on the eastern edge of Baguio City. About 5.2 km, roughly 15 minutes by car from JMG Nest.' },
    ],
    sections: [
      {
        heading: 'A kingdom made of stone',
        paragraphs: [
          'Just off Marcos Highway in Camp 7, on the eastern edge of Baguio City, a hillside has been turned into something that feels much older than it is. Igorot Stone Kingdom is a garden of hand-stacked stone. Arches, towers, mazes, and quiet nooks, all raised without cement, the way our ancestors shaped the land.',
          'It opened in 2018, which makes it one of the newer stops in the city. Yet it was built to carry a very old idea: that stone, patiently placed, can hold memory. You feel it the moment you step through the gate and the traffic noise falls away behind the walls.',
        ],
      },
      {
        heading: 'Who the Igorot are',
        paragraphs: [
          'Igorot is the name shared by the indigenous peoples of the Cordillera mountains, among them the Ibaloi, Kankanaey, Bontoc, Kalinga, and Ifugao. For generations we carved rice terraces into near-vertical slopes, wove cloth in patterns that name our clans, and treated the mountains not as scenery but as kin.',
          'The kingdom borrows that spirit. Every wall here nods to the dry-stone craft that holds up the famous terraces of the north, where a single misplaced stone can undo a season of work. To build this way is to be patient, and to trust that the next generation will keep the stones standing.',
        ],
      },
      {
        heading: 'What you will see',
        paragraphs: [
          'Follow the paths and you climb. Stone staircases lead up to lookout towers where the whole valley opens out, pine ridges folding into blue distance. There are narrow mazes that children love to lose themselves in, shaded alcoves for a rest, and a photo spot at nearly every turn.',
          'On clear mornings the light comes in low and gold, and the grey stone warms to honey. Bring a light jacket. Even in the summer months, Baguio air keeps a cool edge, and up on the towers the wind likes to remind you how high you have climbed.',
        ],
      },
      {
        heading: 'When to go, and what it costs',
        paragraphs: [
          'The kingdom is open daily, from early morning until early evening, roughly 6:00 in the morning to 6:00 in the evening. Come early if you can. The first hours after opening are cool, quiet, and kind to photographs, before the weekend crowds arrive.',
          'Entrance is modest, usually around fifty pesos per person, best paid in small cash. Wear shoes with grip. The stones are uneven by design, and the fun is in the climbing. Parking is available near the entrance, so from the nest it is an easy fifteen-minute start to a morning.',
        ],
      },
    ],
    note: {
      heading: 'Come with respect',
      paragraphs: [
        'This is a playful place, but it stands on living culture, not a museum piece behind glass. If you meet elders or performers in traditional dress, ask before you photograph them, and listen if they offer a story. Take your litter with you, and buy a snack or a woven souvenir from the local stalls if you can.',
        'The warmest way to visit any Cordillera site is the way we welcome guests at home: curious, unhurried, and grateful for the view. Ten or twenty years from now these stones will have settled deeper into the hillside and the pines will stand taller around them. That is the point. The kingdom is young, but it was built the old way, to last.',
      ],
    },
    metaTitle: 'Igorot Stone Kingdom: A Local Guide',
    metaDescription: 'A story-driven guide to Igorot Stone Kingdom in Baguio City. Hours, entrance fee, history, what to see, and how to visit with respect, 15 minutes from JMG Nest.',
  },
}

export function getLocalGuide(slug: string): LocalGuide | null {
  return GUIDES[slug] ?? null
}

export function getLocalGuideSlugs(): string[] {
  return Object.keys(GUIDES)
}
