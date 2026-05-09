const LAST_UPDATED = '8 May 2026'
const COMPANY = 'Europe on Wheels'
const EMAIL = 'hello@europeonwheels.com'

const sections = [
  {
    title: '1. Definitions and Interpretation',
    body: [
      '"Agreement" means these Terms of Service together with any booking confirmation, itinerary document, and payment schedule issued to you.',
      '"Services" means the private chauffeur-driven travel arrangements, itinerary planning, accommodation coordination, and related travel concierge services provided by us.',
      '"Client", "you", "your" refers to the individual or legal entity entering into this Agreement with us.',
      '"Lead Traveller" means the individual named on the booking who accepts these Terms on behalf of all members of their travelling party.',
      '"Itinerary" means the personalised day-by-day travel plan prepared for your trip.',
      '"Force Majeure Event" has the meaning given in clause 12.',
    ],
  },
  {
    title: '2. Acceptance of Terms',
    body: [
      'By submitting an enquiry through our website, by email, or via WhatsApp, and by proceeding with a booking following receipt of our proposal, you agree to be bound by these Terms of Service in their entirety.',
      'The Lead Traveller accepts these Terms on behalf of all members of the travelling party and is responsible for ensuring that all travellers are aware of and comply with them.',
      'We reserve the right to amend these Terms at any time. The version in force at the date of your booking confirmation shall apply to your trip.',
    ],
  },
  {
    title: '3. Bookings and Confirmation',
    body: [
      '3.1  All bookings are subject to availability and are not confirmed until you receive a written booking confirmation from us and have paid the required deposit.',
      '3.2  A non-refundable deposit of 25% of the total trip cost is due within 7 days of receiving your booking confirmation to secure your arrangements.',
      '3.3  The balance of the total trip cost is due no later than 60 days before the commencement of your trip. Bookings made within 60 days of the travel start date require full payment at the time of confirmation.',
      '3.4  We reserve the right to treat a booking as cancelled if payments are not received by the due dates, in which case the cancellation charges in clause 5 will apply.',
    ],
  },
  {
    title: '4. Pricing and Payment',
    body: [
      '4.1  All prices are quoted in Euros (EUR) unless otherwise stated. Equivalent amounts in INR or USD shown on our website are indicative only and subject to exchange-rate fluctuations.',
      '4.2  Quoted prices include private vehicle hire and driver for the agreed itinerary, accommodation at the specified hotel category, and itinerary planning and coordination by our team.',
      '4.3  The following are expressly excluded from quoted prices unless stated in your booking confirmation: international and domestic flights, visa fees, travel insurance, meals (unless specified), personal expenses, gratuities, entry fees to attractions, and any services not listed in the Itinerary.',
      '4.4  We reserve the right to pass on to you any material increase in costs attributable to fuel surcharges, government-imposed taxes, or currency fluctuations exceeding 5% occurring after the date of your booking confirmation and before the date of travel. We will notify you in writing of any such increase.',
      '4.5  Payments may be made by bank transfer or such other methods as we may advise. All bank charges associated with international transfers are the responsibility of the Client.',
    ],
  },
  {
    title: '5. Cancellation by the Client',
    body: [
      'If you wish to cancel your confirmed booking, you must notify us in writing to the email address specified in your booking confirmation. Cancellation charges are calculated as a percentage of the total trip cost, based on the number of days before the trip commencement date on which written notice is received:',
      '**More than 90 days** — loss of deposit only (25% of total cost).',
      '**60–90 days** — 40% of total cost.',
      '**30–59 days** — 60% of total cost.',
      '**15–29 days** — 80% of total cost.',
      '**0–14 days or no-show** — 100% of total cost.',
      'We strongly recommend that you obtain comprehensive travel insurance that includes cancellation cover for the full value of your trip.',
    ],
  },
  {
    title: '6. Cancellation or Alteration by Us',
    body: [
      '6.1  We reserve the right to cancel your booking in exceptional circumstances beyond our control. In such cases, we will offer you a full refund of all monies paid, or an alternative trip of equivalent or greater value.',
      '6.2  We reserve the right to make minor alterations to your Itinerary (for example, substituting a hotel of equivalent standard, adjusting the order of sightseeing stops, or modifying driving routes) without liability, provided the overall character and quality of your trip is maintained.',
      '6.3  If we are required to make a significant alteration to essential elements of the trip (such as a change of destination country or a material reduction in trip duration), we will notify you as soon as possible and offer you the choice of: (a) accepting the modified arrangements; (b) an alternative trip; or (c) a full refund.',
    ],
  },
  {
    title: '7. Amendments by the Client',
    body: [
      '7.1  Requests to amend a confirmed booking must be made in writing and are subject to availability and any additional costs incurred as a result of the amendment, including supplier amendment fees.',
      '7.2  We will use reasonable endeavours to accommodate amendment requests but cannot guarantee that all changes will be possible, particularly within 30 days of the travel start date.',
      '7.3  A per-booking administration fee may apply for amendments made after the booking confirmation is issued.',
    ],
  },
  {
    title: '8. Your Responsibilities',
    body: [
      '8.1  You are responsible for ensuring that all members of your travelling party hold valid passports and all required visas, travel permits, and health documentation for each country included in your Itinerary. We provide no warranty as to visa or entry requirements and accept no liability for any failure to obtain necessary documentation.',
      '8.2  You must obtain comprehensive travel insurance covering medical emergency, medical evacuation, trip cancellation, personal liability, and loss of baggage before the commencement of your trip. Proof of insurance may be requested.',
      '8.3  You are responsible for arriving at all agreed meeting points at the times specified. Additional costs arising from late arrival — including driver waiting time charged at an hourly rate — will be charged to you.',
      '8.4  You agree to treat all vehicles, accommodations, and service providers with respect. We reserve the right to terminate your participation in a trip without refund if your conduct is deemed by us to endanger the safety or wellbeing of other passengers, service providers, or third parties, or if you cause wilful damage to property.',
      '8.5  All travellers must comply with the laws and regulations of each country visited.',
    ],
  },
  {
    title: '9. Our Responsibilities and Limitation of Liability',
    body: [
      '9.1  We will use reasonable skill and care in the selection of service providers and the organisation of your Itinerary. We act as principal in respect of our own services and as agent on your behalf when contracting with third-party providers (hotels, vehicle operators, local guides).',
      '9.2  Our total liability to you for any claim arising out of or in connection with your booking, whether in contract, tort (including negligence), or otherwise, shall not exceed the total price paid by you for the affected services.',
      '9.3  We shall not be liable for: (a) any failure in performance caused by a Force Majeure Event; (b) any act or omission of a third-party service provider not acting under our direct control; (c) death or personal injury other than where caused by our negligence; (d) indirect, consequential, or special losses of any nature.',
      '9.4  Nothing in these Terms shall exclude or limit our liability for death or personal injury caused by our negligence, fraud or fraudulent misrepresentation, or any other liability that cannot be limited or excluded by applicable law.',
    ],
  },
  {
    title: '10. Travel Insurance',
    body: [
      'Comprehensive travel insurance is a condition of booking with us. Your policy must include, at a minimum: emergency medical treatment and hospitalisation, medical evacuation and repatriation, trip cancellation and curtailment up to the full value of your trip, personal liability, and loss or theft of baggage and personal effects.',
      'We accept no responsibility for any costs or losses suffered as a result of your failure to obtain adequate insurance cover.',
    ],
  },
  {
    title: '11. Complaints and Disputes',
    body: [
      '11.1  If you experience a problem during your trip, you must notify your driver or our duty contact immediately so that we have the opportunity to resolve the issue at the time.',
      `11.2  Any formal complaint must be submitted in writing to ${EMAIL} within 28 days of the end of your trip. We will acknowledge your complaint within 5 business days and aim to provide a substantive response within 28 days.`,
      '11.3  These Terms are governed by the laws of England and Wales (or such other jurisdiction as specified in your booking confirmation), and any disputes shall be subject to the exclusive jurisdiction of the courts of that jurisdiction, save that either party may seek injunctive relief in any competent court.',
    ],
  },
  {
    title: '12. Force Majeure',
    body: [
      '"Force Majeure Event" means any event beyond our reasonable control, including but not limited to: acts of God, war, terrorism, civil unrest, pandemic or epidemic declared by a governmental or international health authority, government travel restrictions, strikes, natural disaster, or extreme weather conditions.',
      'We shall not be liable for any failure or delay in performing our obligations under this Agreement resulting from a Force Majeure Event. In such circumstances, we will use reasonable endeavours to notify you promptly and to offer alternative arrangements or, where no alternative is reasonably practicable, a credit note or partial refund based on amounts recovered from our suppliers.',
    ],
  },
  {
    title: '13. Intellectual Property',
    body: [
      'All content on this website — including text, photography, itinerary templates, and branding — is the property of Europe on Wheels or our licensors and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative works from any content without our prior written consent.',
    ],
  },
  {
    title: '14. Severability',
    body: [
      'If any provision of these Terms is found by a court to be invalid, unlawful, or unenforceable, that provision shall be severed from the Agreement and the remaining provisions shall continue in full force and effect.',
    ],
  },
  {
    title: '15. Entire Agreement',
    body: [
      'These Terms, together with your booking confirmation and any itinerary or schedule issued to you, constitute the entire agreement between you and us in relation to your booking and supersede all prior representations, negotiations, and agreements. No variation to these Terms shall be binding unless agreed in writing by an authorised representative of Europe on Wheels.',
    ],
  },
]

function renderBody(text) {
  if (text.startsWith('**') && text.includes('** —')) {
    const parts = text.split('** — ')
    const bold = parts[0].replace('**', '')
    const rest = parts.slice(1).join(' — ')
    return (
      <p className="mt-3 pl-4 text-stone-400 leading-relaxed">
        <span className="font-semibold text-stone-200">{bold}</span>
        {rest ? ` — ${rest}` : ''}
      </p>
    )
  }
  return <p className="mt-3 text-stone-400 leading-relaxed">{text}</p>
}

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-stone-950 text-white">
      {/* Hero */}
      <div className="border-b border-white/[0.06] bg-gradient-to-b from-stone-900 to-stone-950 px-5 pb-12 pt-28 sm:px-8 sm:pt-36">
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.35em] text-amber-400">Legal</p>
          <h1 className="text-4xl font-bold text-white sm:text-5xl">Terms of Service</h1>
          <p className="mt-4 text-sm text-stone-500">Last updated: {LAST_UPDATED}</p>
          <p className="mt-5 text-base leading-relaxed text-stone-400">
            These Terms of Service ("Terms") govern your use of this website and your purchase of travel services from {COMPANY}. Please read them carefully before making a booking. By booking with us, you accept these Terms without reservation.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-3xl space-y-12">
          {sections.map(({ title, body }) => (
            <div key={title} className="border-t border-white/[0.05] pt-10 first:border-0 first:pt-0">
              <h2 className="mb-4 text-lg font-bold text-white">{title}</h2>
              <div className="space-y-1">
                {body.map((text, i) => (
                  <div key={i}>{renderBody(text)}</div>
                ))}
              </div>
            </div>
          ))}

          {/* Contact box */}
          <div className="rounded-2xl border border-amber-400/20 bg-amber-400/5 p-6">
            <p className="text-sm font-semibold text-amber-400">Questions about these Terms?</p>
            <p className="mt-2 text-sm text-stone-400">
              Contact us at{' '}
              <a href={`mailto:${EMAIL}`} className="text-white underline underline-offset-2 hover:text-amber-400 transition-colors">
                {EMAIL}
              </a>
              {' '}before making a booking if you require clarification on any provision.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
