const LAST_UPDATED = '8 May 2026'
const EMAIL = 'info.europeonwheels@gmail.com'

function Section({ title, children }) {
  return (
    <div className="border-t border-white/[0.05] pt-10">
      <h2 className="mb-5 text-lg font-bold text-white">{title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  )
}

function P({ children }) {
  return <p className="text-stone-400 leading-relaxed">{children}</p>
}

function Bold({ label, children }) {
  return (
    <p className="text-stone-400 leading-relaxed">
      <span className="font-semibold text-stone-200">{label}</span>{children}
    </p>
  )
}

function Li({ children }) {
  return <p className="pl-4 text-stone-400 leading-relaxed">{children}</p>
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-stone-950 text-white">

      {/* Hero */}
      <div className="border-b border-white/[0.06] bg-gradient-to-b from-stone-900 to-stone-950 px-5 pb-12 pt-28 sm:px-8 sm:pt-36">
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.35em] text-amber-400">Legal</p>
          <h1 className="text-4xl font-bold text-white sm:text-5xl">Privacy Policy</h1>
          <p className="mt-4 text-sm text-stone-500">Last updated: {LAST_UPDATED}</p>
          <p className="mt-5 text-base leading-relaxed text-stone-400">
            This Privacy Policy explains how Europe on Wheels collects, uses, stores, and protects your personal data when you use our website or engage with our travel services. Please read it carefully.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-3xl space-y-12">

          <Section title="1. Who We Are and How to Contact Us">
            <P>Europe on Wheels ("we", "us", "our") is a private travel services company organising bespoke chauffeur-driven tours across Europe. Our registered principal place of business and primary point of contact for all data-related matters is reachable at {EMAIL}.</P>
            <P>We act as the data controller in respect of personal data collected through this website and in the course of providing our travel services. Where we engage third-party service providers (accommodation partners, vehicle operators, payment processors) who process your data on our behalf, we enter into appropriate data processing agreements with those parties.</P>
          </Section>

          <Section title="2. What Personal Data We Collect">
            <P>We collect and process the following categories of personal data:</P>
            <Bold label="Identity Data — ">full name, nationality, passport number and expiry date (where required for cross-border travel arrangements).</Bold>
            <Bold label="Contact Data — ">email address, telephone number (including WhatsApp), postal address.</Bold>
            <Bold label="Trip Preference Data — ">travel dates, destinations, group composition, hotel preferences, vehicle type, budget range, dietary requirements, accessibility needs, and any special requests you provide via our enquiry forms.</Bold>
            <Bold label="Financial Data — ">invoicing details. We do not store full payment card numbers; card transactions are handled exclusively by our PCI-DSS-compliant payment processors.</Bold>
            <Bold label="Technical Data — ">IP address, browser type, operating system, referring URL, pages visited, time and date of visit, and cookie identifiers. See our Cookie Policy for further detail.</Bold>
            <Bold label="Communications Data — ">the content of emails, WhatsApp messages, and enquiry form submissions you send us.</Bold>
          </Section>

          <Section title="3. How We Collect Your Data">
            <P>We collect personal data through the following channels:</P>
            <Bold label="Direct interactions — ">when you complete an enquiry form, contact us by email or WhatsApp, or call us, you provide us with data directly.</Bold>
            <Bold label="Automated technologies — ">as you interact with our website, we collect Technical Data automatically via cookies and similar tracking technologies, subject to your consent preferences.</Bold>
            <Bold label="Third parties — ">we may receive data from referral partners, review platforms, or publicly available sources where you have chosen to share information there.</Bold>
          </Section>

          <Section title="4. Legal Bases for Processing">
            <P>We rely on the following legal bases under applicable data protection law:</P>
            <Bold label="Contractual necessity — ">processing required to take pre-contractual steps at your request and to perform the travel services contract we enter into with you.</Bold>
            <Bold label="Legitimate interests — ">responding to enquiries, improving our services, preventing fraud, and maintaining the security of our systems, where these interests are not overridden by your fundamental rights.</Bold>
            <Bold label="Legal obligation — ">complying with applicable tax, customs, and financial record-keeping requirements.</Bold>
            <Bold label="Consent — ">for non-essential cookies, marketing emails, and any other processing where we ask for your consent. You may withdraw consent at any time by contacting us or updating your cookie preferences.</Bold>
          </Section>

          <Section title="5. How We Use Your Data">
            <P>We use your personal data for the following purposes:</P>
            <Li>(a) To respond to your travel enquiries and provide quotes and itinerary proposals.</Li>
            <Li>(b) To arrange and manage your tour bookings, including coordinating with accommodation providers, vehicle operators, and local guides.</Li>
            <Li>(c) To communicate important trip updates, travel advisories, and operational information before and during your journey.</Li>
            <Li>(d) To process payments and issue invoices.</Li>
            <Li>(e) To comply with legal and regulatory obligations, including anti-money-laundering checks where applicable.</Li>
            <Li>(f) To analyse website usage, improve our services, and develop new offerings.</Li>
            <Li>(g) To send you marketing communications about our tours and offers, where you have consented or where we rely on the soft opt-in rule for existing clients.</Li>
          </Section>

          <Section title="6. Sharing Your Data">
            <P>We share your personal data only in the following circumstances:</P>
            <Bold label="Service providers — ">hotels, vehicle operators, local guides, and transfer companies who need your details to fulfil the services you have booked. These parties are contractually required to protect your data and use it solely for the agreed purpose.</Bold>
            <Bold label="Payment processors — ">to securely handle financial transactions.</Bold>
            <Bold label="Professional advisers — ">lawyers, accountants, auditors, and insurers who require access to data in the performance of their professional services.</Bold>
            <Bold label="Regulatory authorities — ">where required by law, court order, or government mandate.</Bold>
            <Bold label="Business transfers — ">in the event of a merger, acquisition, or sale of all or part of our business, your data may be transferred to the acquiring entity subject to the same privacy protections.</Bold>
            <P>We do not sell, rent, or trade your personal data to third parties for their own marketing purposes.</P>
          </Section>

          <Section title="7. International Transfers">
            <P>Our services involve arranging travel across multiple European countries. Accordingly, your data may be transferred to, and processed by, service providers located within the European Economic Area (EEA) and, in some cases, outside it (for example, tour operators based in the UK or Switzerland).</P>
            <P>Where we transfer data outside the EEA to countries not recognised as providing an adequate level of data protection, we implement appropriate safeguards such as Standard Contractual Clauses approved by the European Commission, or we rely on your explicit consent for the specific transfer.</P>
          </Section>

          <Section title="8. Data Retention">
            <P>We retain your personal data for as long as is necessary to fulfil the purposes for which it was collected, subject to the following minimum periods:</P>
            <Bold label="Client records and booking data — ">7 years from the end of the contractual relationship, to comply with tax and financial record-keeping obligations.</Bold>
            <Bold label="Marketing enquiries that did not result in a booking — ">2 years from the date of last contact.</Bold>
            <Bold label="Website analytics data — ">up to 26 months, in accordance with industry standard practices.</Bold>
            <P>After the applicable retention period, data is securely deleted or anonymised.</P>
          </Section>

          <Section title="9. Your Rights">
            <P>Depending on your jurisdiction, you may have the following rights in relation to your personal data:</P>
            <Bold label="Right of access — ">to obtain a copy of the personal data we hold about you.</Bold>
            <Bold label="Right to rectification — ">to require correction of inaccurate or incomplete data.</Bold>
            <Bold label="Right to erasure — ">to request deletion of your data where there is no legitimate reason for continued processing.</Bold>
            <Bold label="Right to restriction — ">to request that we suspend processing of your data in certain circumstances.</Bold>
            <Bold label="Right to data portability — ">to receive your data in a structured, commonly used, machine-readable format.</Bold>
            <Bold label="Right to object — ">to object to processing based on legitimate interests or for direct marketing purposes.</Bold>
            <Bold label="Rights in relation to automated decision-making — ">we do not make decisions about you based solely on automated processing that produce legal or similarly significant effects.</Bold>
            <P>To exercise any of these rights, please contact us at <a href={`mailto:${EMAIL}`} className="text-white underline underline-offset-2 hover:text-amber-400 transition-colors">{EMAIL}</a>. We will respond within 30 days. You also have the right to lodge a complaint with your local supervisory authority.</P>
          </Section>

          <Section title="10. Security">
            <P>We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, accidental loss, destruction, or damage. These measures include encrypted data transmission (TLS), access controls, and regular security reviews.</P>
            <P>Where we have given you (or you have chosen) a password to access our systems, you are responsible for keeping it confidential. We will never ask you for your password by email.</P>
          </Section>

          <Section title="11. Third-Party Links">
            <P>Our website may contain links to third-party websites including review platforms, mapping services, and social media. This Privacy Policy does not apply to those sites and we are not responsible for their content or privacy practices. We encourage you to review the privacy policy of any third-party site you visit.</P>
          </Section>

          <Section title="12. Changes to This Policy">
            <P>We may update this Privacy Policy from time to time to reflect changes in our practices or applicable law. We will post the updated policy on this page with a revised "Last Updated" date. For material changes, we will notify you by email or a prominent notice on our website.</P>
          </Section>

          {/* Contact box */}
          <div className="rounded-2xl border border-amber-400/20 bg-amber-400/5 p-6">
            <p className="text-sm font-semibold text-amber-400">Questions about this policy?</p>
            <p className="mt-2 text-sm text-stone-400">
              Contact our privacy team at{' '}
              <a href={`mailto:${EMAIL}`} className="text-white underline underline-offset-2 hover:text-amber-400 transition-colors">
                {EMAIL}
              </a>
              . We are committed to resolving any concerns promptly and transparently.
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
