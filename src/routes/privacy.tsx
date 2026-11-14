import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/privacy')({
  component: Privacy,
  head: () => ({
    meta: [
      { title: 'Privacy Policy | Dominic Bloomfield' },
      {
        name: 'description',
        content:
          'How dominicbloomfield.com collects, uses, and protects your information.',
      },
    ],
  }),
})

const EFFECTIVE_DATE = 'November 14, 2026'
const CONTACT_EMAIL = 'art@dominicbloomfield.com'

type Section = { heading: string; body: string[] }

/*
  Anything in [BRACKETS] is something only you can fill in. Search this file
  for "[" before publishing and replace or delete each one.
*/
const sections: Section[] = [
  {
    heading: 'Who I am',
    body: [
      'This website, dominicbloomfield.com, is run by Dominic Bloomfield, an independent artist. In this policy, "I", "me", and "my" mean Dominic Bloomfield. If you have questions about it, contact me at ' +
        CONTACT_EMAIL +
        '.',
    ],
  },
  {
    heading: 'What I collect',
    body: [
      'Newsletter signup: when you subscribe, I collect your email address. I also record that you signed up. I do not ask for your name or anything else.',
      'Messages: if you email me, I keep your message and email address so I can reply.',
      ' Orders: when you buy a print, I collect your name, shipping address, email address, and order details. Payment is handled by Stripe, and I do not see or store your full card number.',
      'Basic technical data: like most websites, my hosting provider may automatically log things such as IP address, browser type, and pages requested. This is used to keep the site running and secure.',
    ],
  },
  {
    heading: 'How I use it',
    body: [
      'I use your email address to send you the newsletter: news about new prints, exhibitions, and studio updates. I also use it to send a welcome message when you sign up.',
      'I do not sell your information, and I do not share it for advertising.',
    ],
  },
  {
    heading: 'Who handles your data for me',
    body: [
      'I use a few services to run the site and the newsletter. They process your information only to provide their service to me:',
      'Resend, to send email, Cloudflare to host the website, and Neon to store the newsletter list.',
      'Some of these providers are based in the United States, so your information may be processed there.',
    ],
  },
  {
    heading: 'Cookies and analytics',
    body: [
      'This site does not use advertising or tracking cookies. Any cookies or browser storage used are only those needed for the site to work',
      'This site uses Cloudflare Analytics to understand how many people visit and which pages they view. It does not use cookies.',
    ],
  },
  {
    heading: 'How long I keep it',
    body: [
      'I keep your newsletter email address until you unsubscribe or ask me to delete it. Order records are kept for 2 years for tax and accounting purposes. Emails you send me are kept as long as needed to answer you.',
    ],
  },
  {
    heading: 'Your choices and rights',
    body: [
      'Unsubscribe: every newsletter has an unsubscribe link at the bottom. You can also email me and I will remove you.',
      'Access and deletion: you can ask me what information I hold about you, ask me to correct it, or ask me to delete it. Email ' +
        CONTACT_EMAIL +
        ' and I will respond within a reasonable time, and within any deadline the law gives you.',
      'Depending on where you live (for example the EU, the UK, or California), you may have additional rights, such as objecting to certain uses of your data or complaining to your local data protection authority. I will honor those rights where they apply.',
    ],
  },
  {
    heading: 'Children',
    body: [
      'This site is not directed at children under 13, and I do not knowingly collect their information. If you think a child has given me their email address, contact me and I will delete it.',
    ],
  },
  {
    heading: 'Security',
    body: [
      'I take reasonable steps to protect your information, including using trusted providers and encrypted connections. No method of transmission or storage is completely secure, so I cannot guarantee absolute security.',
    ],
  },
  {
    heading: 'Changes to this policy',
    body: [
      'I may update this policy from time to time. When I do, I will change the effective date at the top of this page. If the changes are significant, I will tell newsletter subscribers by email.',
    ],
  },
  {
    heading: 'Contact',
    body: ['Questions or requests about your information: ' + CONTACT_EMAIL + '.'],
  },
]

function Privacy() {
  return (
    <main className="rise-in mx-auto w-full max-w-7xl px-5 pb-20 pt-28 lg:px-12 lg:pb-32 lg:pt-36">
      <h1 className="text-5xl font-black tracking-tight lg:text-8xl">
        Privacy policy
      </h1>
      <p className="mt-4 text-lg font-light text-black/60 lg:mt-6 lg:text-xl">
        Effective {EFFECTIVE_DATE}
      </p>

      <p className="mt-10 max-w-2xl text-xl font-light leading-relaxed lg:mt-16 lg:text-2xl">
        TLDR: I collect your email address if you join the
        newsletter, I only ever use it to send you the newsletter, and
        you can unsubscribe or ask me to delete it at any time. :-)
      </p>

      <div className="mt-16 lg:mt-24">
        {sections.map((section) => (
          <section
            key={section.heading}
            className="grid gap-4 border-t border-black/40  py-8 lg:grid-cols-[14rem_1fr] lg:gap-12 lg:py-12"
          >
            <h2 className="text-2xl font-bold tracking-tight lg:sticky lg:top-28 lg:self-start">
              {section.heading}
            </h2>
            <div className="flex max-w-prose flex-col gap-4 font-light leading-relaxed">
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}