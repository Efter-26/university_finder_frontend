import Link from 'next/link';

const studyDestinations = [
  'Australia',
  'Switzerland',
  'UK',
  'Germany',
  'USA',
  'Canada',
  'Others',
];

const services = [
  'Personalized University Selection',
  'Application Assistance',
  'Scholarship and Financial Aid Guidance',
  'Visa and Immigration Support',
  'Pre-Departure and Post-Arrival Assistance',
  'Post-Graduation Support',
];

const companyLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Who we are', href: '/who-we-are' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Stay connected with us', href: '/connect' },
  { label: 'Awards', href: '/awards' },
  { label: 'IELTS', href: '/ielts' },
  { label: 'SELT', href: '/selt' },
];

export default function Footer() {
  return (
    <footer className="relative mt-auto border-t border-slate-200 bg-[#1e3a5f] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-[#7dd3fc]">
              About Shabuj Global Education
            </h3>
            <p className="text-sm leading-relaxed text-slate-200">
              Shabuj Global Education (SG Education) is a British Council-approved consultancy
              established in 2010. We take pride in helping students achieve their study abroad
              dreams with personalized support and expert guidance.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-[#7dd3fc]">
              Study Destinations
            </h3>
            <ul className="space-y-2">
              {studyDestinations.map((dest) => (
                <li key={dest}>
                  <Link
                    href={`/study-destination?country=${dest.toLowerCase()}`}
                    className="text-sm text-slate-200 transition-colors hover:text-white"
                  >
                    {dest}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-[#7dd3fc]">
              Services for Students
            </h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service} className="text-sm text-slate-200">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-[#7dd3fc]">
              Company
            </h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-200 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-600 pt-8 text-center text-sm text-slate-400">
          © {new Date().getFullYear()} Shabuj Global Education. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
