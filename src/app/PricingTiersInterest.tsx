import { CheckIcon } from '@heroicons/react/20/solid';

interface PricingTiersInterestProps {
    fullAddress: string;
}

const tiers = [
  {
    name: 'Standard Fiber',
    id: 'tier-hobby',
    href: "https://nlbcnltc.eversign.com/embedded/552f574523c247f0821d4b984484ea65",
    priceMonthly: '$65',
    description: 'Introducing our Standard Fiber Package, designed to deliver optimal performance for small households with efficient and reliable internet connectivity.',
    features: ['Ideal for households with less than 3 people', 'Suitable for basic internet usage', 'Supports light streaming activities', 'Provides 100x100 Mbps speed'],
  },
  {
    name: 'Pro Fiber',
    id: 'tier-team',
    href: "https://nlbcnltc.eversign.com/embedded/552f574523c247f0821d4b984484ea65",
    priceMonthly: '$85',
    description: 'Introducing our Pro Fiber Package, the ideal choice for those who need top-tier performance for streaming, gaming, or working from home.',
    features: [
      'Perfect for high-demand activities like streaming, gaming, and remote work',
      'Ensures seamless connectivity for multiple devices',
      'Provides blazing-fast 500x500 Mbps speed',
    ],
  },
  {
    name: 'Go Big & Go Gig Fiber',
    id: 'tier-enterprise',
    href: "https://nlbcnltc.eversign.com/embedded/552f574523c247f0821d4b984484ea65",
    priceMonthly: '$99',
    description: 'Introducing our Go Big & Go Gig Fiber Package, the ultimate solution for tech enthusiasts and large families who demand the fastest speeds and ample bandwidth.',
    features: [
      'Ideal for large households with multiple devices',
      'Offers unmatched performance for all your tech needs',
      'Perfect for heavy internet usage, including streaming, gaming, and smart home devices',
      'Blazing fast 1,000x1,000 Mbps (1 Gig) speed',
    ],
  },
];

export function PricingTiersInterest( {fullAddress}: PricingTiersInterestProps) {
    console.log('PricingTiers fullAddress:', fullAddress);

  return (
    <div className="isolate overflow-hidden bg-gray-900">
      <div className="w-full pb-96 pt-24 text-center sm:pt-32">
        <div className="w-full">
          <h2 className="text-base font-semibold leading-7 text-white">Fiber Packages</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            You&apos;re an Area of Interest
          </p>
        </div>
        <div className="relative mt-6 w-full">
          <p className="mx-auto text-lg w-full leading-8 text-white/60">
          <strong>{fullAddress}</strong> falls into an area that we are considering for near future fiber
          deployment.
          </p>
          <p className="mx-auto text-1xl mt-10 w-full leading-8 text-white/90">We must reach a set number of commitments before construction can begin in this area.
If you would like to receive fiber optic internet service at this address, please fill out the
information below and click the submit button.</p>
          <svg
  viewBox="0 0 1208 1024"
  className="absolute -top-10 left-1/2 -z-10 h-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:-top-12 md:-top-20 lg:-top-12 xl:top-0"
>
  <ellipse cx={604} cy={512} rx={604} ry={512} fill="url(#customGradient)" />
  <defs>
    <radialGradient id="customGradient">
      <stop offset="0%" stopColor="#00415A" />
      <stop offset="100%" stopColor="#06B4DF" />
    </radialGradient>
  </defs>
</svg>

        </div>
      </div>
      <div className="flow-root bg-white pb-24 sm:pb-32 w-full">
        <div className="-mt-80 w-full">
          <div className="w-full px-6 lg:px-10">
            <div className="grid w-full p-8 gap-8">
              {tiers.map((tier) => (
                <div
                  key={tier.id}
                  className="flex flex-col justify-between rounded-3xl bg-white p-8 shadow-xl ring-1 ring-gray-900/10 sm:p-10"
                >
                  <div>
                    <h3 id={tier.id} className="text-base font-semibold leading-7 text-primary">
                      {tier.name}
                    </h3>
                    <div className="mt-4 flex items-baseline gap-x-2">
                      <span className="text-5xl font-bold tracking-tight text-primary">{tier.priceMonthly}</span>
                      <span className="text-base font-semibold leading-7 text-primary">/month</span>
                    </div>
                    <p className="mt-6 text-base leading-7 text-gray-600">{tier.description}</p>
                    <ul role="list" className="mt-10 space-y-4 text-sm leading-6 text-gray-600">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex gap-x-3">
                          <CheckIcon aria-hidden="true" className="h-6 w-5 flex-none text-indigo-600" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <a
                    href={tier.href}
                    aria-describedby={tier.id}
                    className="mt-8 block rounded-md bg-secondary px-3.5 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Pre-Order
                  </a>
                </div>
              ))}
               <div className="flex flex-col items-start gap-x-8 gap-y-6 rounded-3xl p-8 ring-1 ring-gray-900/10 sm:gap-y-10 sm:p-10 lg:col-span-3 lg:flex-row lg:items-center">
                <div className="lg:min-w-0 lg:flex-1">
                  <h3 className="text-lg font-semibold leading-8 tracking-tight text-primary">Interested in Business Class Internet and Voice Solutions?</h3>
                  <p className="mt-1 text-base leading-7 text-gray-600">
                  Introducing Business Class – Internet & Voice Services from NLBC, tailored to meet the unique needs of businesses in East Central Indiana and beyond. We deliver customized solutions with reliable networks designed to grow with your business.
                  </p>
                </div>
                <a
                  href="https://share.hsforms.com/1IXoUM1AlTMClAEYjqMJr7w473vr"
                  className="rounded-md px-3.5 py-2 text-sm font-semibold leading-6 text-primary ring-1 ring-inset ring-primary hover:ring-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Get Business Internet Services<span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default PricingTiersInterest;
