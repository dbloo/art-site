import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from 'react-email'

type WelcomeEmailProps = {
  /** Used for the greeting. Falls back to a generic one. */
  firstName?: string
  /** Your live site URL, no trailing slash. */
  siteUrl?: string
  /**
   * Optional artwork shown under the headline. Must be an absolute, public URL.
   * Use JPG or PNG: WebP isn't supported by every email client (notably Outlook).
   */
  imageUrl?: string
  /** Resend replaces this placeholder automatically in broadcasts. */
  unsubscribeUrl?: string
}

const ACCENT = '#FADE3E'
const INK = '#000000'
const MUTED = '#6b6b6b'
const FONT =
  "'Helvetica Neue', Helvetica, Arial, 'Segoe UI', sans-serif"

export function WelcomeEmail({
  firstName,
  siteUrl = 'https://dominicbloomfield.com',
  imageUrl,
  unsubscribeUrl = '{{{RESEND_UNSUBSCRIBE_URL}}}',
}: WelcomeEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>
        You're on the list. New drops, straight to your inbox.
      </Preview>

      <Body style={body}>
        <Container style={container}>
          {/* Wordmark */}
          <Section style={{ paddingBottom: 40 }}>
            <Link href={siteUrl} style={wordmark}>
              Dominic Bloomfield Art
            </Link>
          </Section>

          {/* Headline */}
          <Section>
            <Text style={headline}>
              You're{' '}
              <span style={highlight}>&nbsp;in!&nbsp;</span>
            </Text>
          </Section>

          {/* Intro */}
          <Section style={{ paddingTop: 24 }}>
            <Text style={lead}>
              {firstName ? `Hey ${firstName}, thanks` : 'Thanks'} for joining
              my newsletter.
            </Text>
            <Text style={paragraph}>
              I'll send you word when new prints and originals drop, or when I have a show
              coming up
            </Text>

            <Text style={paragraph}>
                Promise I wont spam u!
            </Text>
          </Section>

          {/* Optional artwork */}
          {imageUrl ? (
            <Section style={{ paddingTop: 16 }}>
              <Img
                src={imageUrl}
                alt="Artwork by Dominic Bloomfield"
                width="520"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </Section>
          ) : null}

          {/* CTA */}
          <Section style={{ paddingTop: 32, paddingBottom: 8 }}>
            <Button href={`${siteUrl}/prints`} style={button}>
              Shop prints
            </Button>
          </Section>

          <Section style={{ paddingTop: 12 }}>
            <Text style={paragraph}>
              Want to know more about my work?{' '}
              <Link href={`${siteUrl}/about`} style={inlineLink}>
                Read about me here.
              </Link>
              .
            </Text>
          </Section>

          <Hr style={rule} />

          {/* Footer */}
          <Section>
            <Text style={footer}>
              You're getting this because you signed up for the Dominic
              Bloomfield Art newsletter.
            </Text>
            <Text style={footer}>
              <Link href={unsubscribeUrl} style={footerLink}>
                Unsubscribe here.
              </Link>
              
            </Text>
            {/* Add your mailing address here, required by CAN-SPAM for marketing email. */}
            <Text style={footer}>Dominic Bloomfield Art | 3540 SW 195TH AVE, Miramar, FL 33029</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}


const body: React.CSSProperties = {
  backgroundColor: '#ffffff',
  margin: 0,
  padding: '32px 0',
  fontFamily: FONT,
  color: INK,
}

const container: React.CSSProperties = {
  maxWidth: 560,
  margin: '0 auto',
  padding: '0 24px',
}

const wordmark: React.CSSProperties = {
  fontSize: 16,
  fontWeight: 900,
  letterSpacing: '-0.01em',
  color: INK,
  textDecoration: 'none',
}

const headline: React.CSSProperties = {
  margin: 0,
  fontSize: 64,
  lineHeight: '1',
  fontWeight: 900,
  letterSpacing: '-0.03em',
  color: INK,
}

const highlight: React.CSSProperties = {
  backgroundColor: ACCENT,
  color: INK,
}

const lead: React.CSSProperties = {
  margin: '0 0 16px',
  fontSize: 22,
  lineHeight: '1.35',
  fontWeight: 300,
  color: INK,
}

const paragraph: React.CSSProperties = {
  margin: '0 0 16px',
  fontSize: 16,
  lineHeight: '1.6',
  fontWeight: 300,
  color: INK,
}

const button: React.CSSProperties = {
  backgroundColor: ACCENT,
  color: INK,
  border: `1px solid ${INK}`,
  padding: '14px 28px',
  fontSize: 16,
  fontWeight: 700,
  textDecoration: 'none',
  display: 'inline-block',
  borderRadius: 10,
}

const inlineLink: React.CSSProperties = {
  color: INK,
  textDecoration: 'underline',
  textUnderlineOffset: 3,
}

const rule: React.CSSProperties = {
  border: 'none',
  borderTop: `1px solid ${INK}`,
  margin: '40px 0 24px',
}

const footer: React.CSSProperties = {
  margin: '0 0 8px',
  fontSize: 12,
  lineHeight: '1.5',
  color: MUTED,
}

const footerLink: React.CSSProperties = {
  color: MUTED,
  textDecoration: 'underline',
}