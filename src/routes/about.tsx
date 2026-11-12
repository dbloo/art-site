import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About,
  head: () => ({
    meta: [
      { title: 'About | Dominic Bloomfield' },
      {
        name: 'description',
        content:
          'Dominic Bloomfield is an Afro-Caribbean multidisciplinary artist from Mandeville, Jamaica working in acrylic painting, illustration, and graphic design.',
      },
    ],
  }),
})

/* ---------- Content ---------- */

const bio =
  'Dominic Bloomfield is an Afro-Caribbean multidisciplinary artist from Mandeville, Jamaica that specializes in acrylic canvas paintings, illustrations, and graphic design. His work offers vibrant colors and warped anatomy and perspective against liminal and abstract backgrounds, which communicates a sense of playfulness, with a grace of unease, that leaves the viewer filling in the pieces with their own experiences.'

type Entry = { title: string; meta: string }
type YearGroup = { year: string; entries: Entry[] }
type CvBlock = { heading: string; groups: YearGroup[] }

const cv: CvBlock[] = [
  {
    heading: 'Solo exhibitions',
    groups: [
      {
        year: '2026',
        entries: [
          { title: 'Outside My Skin', meta: 'The Cutting Gallery, Miramar, FL' },
        ],
      },
    ],
  },
  {
    heading: 'Group exhibitions',
    groups: [
      {
        year: '2026',
        entries: [
          { title: 'Bazaar Broward', meta: 'MAD Arts, Dania Beach, FL' },
          {
            title: 'Hot Rod: Car Show and Art Exhibit',
            meta: 'The Wisteria, Southwest Ranches, FL',
          },
          {
            title: 'BIG: Culture & Arts Festival',
            meta: 'Downtown Gainesville, Gainesville, FL',
          },
          { title: 'Troubled Waters', meta: 'Downtown Miami, Miami, FL' },
        ],
      },
      {
        year: '2025',
        entries: [
          { title: 'Bazaar a La Carte', meta: 'Riverset Studios, Miami, FL' },
          { title: 'Miami Saves America', meta: 'Dear Eleanor, Miami, FL' },
        ],
      },
      {
        year: '2024',
        entries: [
          {
            title: 'Miami Underground Showcase Feat. Atomik',
            meta: '2300 NW 7th Ave, Miami, FL',
          },
        ],
      },
      {
        year: '2022',
        entries: [
          {
            title: 'Icon 2022',
            meta: 'Boomer Gallery, London, United Kingdom',
          },
        ],
      },
    ],
  },
  {
    heading: 'Awards',
    groups: [
      {
        year: '2024',
        entries: [
          {
            title: 'Creative Futures Collective Soho House Fellowship',
            meta: 'Soho House, Miami, FL',
          },
        ],
      },
    ],
  },
  {
    heading: 'Bibliography',
    groups: [
      {
        year: '2025',
        entries: [{ title: 'Selected Works', meta: 'Elated Magazine' }],
      },
      {
        year: '2022',
        entries: [{ title: 'Meet Dominic Bloomfield', meta: 'Canvas Rebel' }],
      },
      {
        year: '2021',
        entries: [
          { title: 'A Hushed Explosion', meta: '2020 Vision Digital' },
          {
            title:
              'Kasinator Visuals, With Space Between Us: An Anthology of Art During the COVID-19 Lockdown',
            meta: 'Blurb',
          },
        ],
      },
      {
        year: '2020',
        entries: [{ title: 'Meet Dominic Bloomfield', meta: 'Voyage MIA' }],
      },
    ],
  },
]



function CvSection({ heading, groups }: CvBlock) {
  const id = `cv-${heading.toLowerCase().replace(/\s+/g, '-')}`

  return (
    <section
      aria-labelledby={id}
      className="grid gap-6 border-t border-black py-10 lg:grid-cols-[14rem_1fr] lg:gap-12 lg:py-14"
    >
      <h3
        id={id}
        className="text-2xl font-bold tracking-tight lg:sticky lg:top-28 lg:self-start"
      >
        {heading}
      </h3>

      <div className="flex flex-col gap-8">
        {groups.map((group) => (
          <div
            key={group.year}
            className="grid grid-cols-[3.5rem_1fr] gap-4 lg:grid-cols-[5rem_1fr]"
          >
            <p className="text-lg font-medium tabular-nums lg:text-xl">
              {group.year}
            </p>
            <ul className="flex flex-col gap-3">
              {group.entries.map((entry) => (
                <li key={entry.title} className="max-w-prose font-light">
                  <span className="font-medium">{entry.title}</span>
                  {', '}
                  {entry.meta}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

function About() {
  return (
    <main className="rise-in mx-auto w-full max-w-7xl px-5 pb-20 pt-28 lg:px-12 lg:pb-32 lg:pt-36">
      <h1 className="mb-8 text-5xl font-black tracking-tight lg:mb-14 lg:text-8xl">
        About
      </h1>

      <section className="grid items-start gap-10 lg:grid-cols-[1fr_minmax(0,28rem)] lg:gap-20">
        <p className="max-w-2xl text-balance text-xl font-light leading-relaxed lg:text-3xl lg:leading-snug">
          {bio}
        </p>

        <img
          src="/assets/images/dompic-large.webp"
          alt="Portrait of Dominic Bloomfield"
          width={800}
          height={1000}
          decoding="async"
          className="aspect-4/5 rounded-md shadow-md w-full max-w-sm object-cover lg:max-w-none"
        />
      </section>

      <section aria-labelledby="cv-heading" className="mt-24 lg:mt-40">
        <h2
          id="cv-heading"
          className="mb-8 text-4xl font-black tracking-tight lg:mb-12 lg:text-6xl"
        >
          CV
        </h2>

        {cv.map((block) => (
          <CvSection key={block.heading} {...block} />
        ))}
      </section>
    </main>
  )
}