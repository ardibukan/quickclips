import React from 'react';

const plans = [
    { name: 'Free', price: '$0', description: 'For individuals and small projects.', features: ['100 extractions/month', 'Standard quality models', 'Community support'], buttonText: 'Get Started', popular: false, primary: false },
    { name: 'Pro', price: '$49', description: 'For professionals and growing businesses.', features: ['5,000 extractions/month', 'High-accuracy models', 'Priority email support', 'API Access'], buttonText: 'Choose Pro', popular: true, primary: true },
    { name: 'Business', price: '$199', description: 'For teams that need advanced features.', features: ['25,000 extractions/month', 'All Pro features', 'SSO & Advanced Security', 'Higher API Limits'], buttonText: 'Choose Business', popular: false, primary: false },
    { name: 'Enterprise', price: 'Custom', description: 'For large organizations with custom needs.', features: ['Unlimited extractions', 'Highest-accuracy models', 'Dedicated support agent', 'Custom integrations'], buttonText: 'Contact Sales', popular: false, primary: false },
];

const pricingDetails = [
  { section: 'Core Features', isHeader: true },
  { label: 'Monthly Extractions', free: '100', pro: '5,000', business: '25,000', enterprise: 'Custom' },
  { label: 'Document Templates', free: '3', pro: '20+', business: 'Unlimited', enterprise: 'Custom Templates' },
  { label: 'Supported File Types', free: 'JPG, PNG', pro: 'All Free types + PDF', business: 'All Pro types + TIFF', enterprise: 'Custom Parsers' },
  { label: 'User Seats Included', free: '1', pro: '3', business: '10', enterprise: 'Unlimited' },

  { section: 'Performance & Accuracy', isHeader: true },
  { label: 'Standard AI Model', free: '✓', pro: '✓', business: '✓', enterprise: '✓' },
  { label: 'High-Accuracy AI Model', free: '—', pro: '✓', business: '✓', enterprise: '✓' },
  { label: 'Batch Processing (per job)', free: '5 files', pro: '100 files', business: '1,000 files', enterprise: 'Unlimited' },
  { label: 'Processing Speed', free: 'Standard', pro: 'Priority', business: 'High Priority', enterprise: 'Dedicated Queue' },

  { section: 'API & Integrations', isHeader: true },
  { label: 'API Access', free: '—', pro: '✓', business: '✓', enterprise: '✓' },
  { label: 'API Rate Limit (req/min)', free: '—', pro: '60', business: '300', enterprise: 'Custom' },
  { label: 'Webhooks', free: '—', pro: '✓', business: '✓', enterprise: '✓' },
  { label: 'Zapier & Make.com', free: '—', pro: '✓', business: '✓', enterprise: '✓' },

  { section: 'Support & Security', isHeader: true },
  { label: 'Community Support', free: '✓', pro: '✓', business: '✓', enterprise: '✓' },
  { label: 'Email Support', free: '—', pro: '✓', business: '✓', enterprise: '✓' },
  { label: 'Dedicated Account Manager', free: '—', pro: '—', business: '$250/mo add-on', enterprise: '✓' },
  { label: 'SSO & Advanced Security', free: '—', pro: '—', business: '✓', enterprise: '✓' },
];

const PricingPage: React.FC = () => {
  return (
    <main className="container mx-auto px-6 pt-32 pb-20 min-h-screen">
      <div className="text-center">
        <h1 className="text-5xl md:text-7xl font-medium tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-br from-yellow-400 to-orange-400 !leading-snug">
          Pricing
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-400">
          Simple, transparent pricing that scales with your needs.
        </p>
      </div>
       <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
         {plans.map(plan => (
             <div key={plan.name} className={`bg-light-card dark:bg-dark-card rounded-2xl p-8 shadow-lg flex flex-col relative ${plan.popular ? 'border-2 border-brand-blue' : 'border border-gray-200 dark:border-gray-800'}`}>
                {plan.popular && <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-brand-blue text-white text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</div>}
                <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
                <p className="text-4xl font-bold mb-4">{plan.price}<span className="text-lg font-normal text-gray-500 dark:text-gray-400">{!plan.price.toLowerCase().includes('custom') && '/mo'}</span></p>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{plan.description}</p>
                <ul className="space-y-2 mb-8 flex-grow text-gray-700 dark:text-gray-300">
                    {plan.features.map(feature => <li key={feature}>✓ {feature}</li>)}
                </ul>
                <button className={`w-full font-semibold py-3 px-6 rounded-full transition-colors ${plan.primary ? 'bg-brand-blue text-white hover:opacity-90' : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'}`}>{plan.buttonText}</button>
             </div>
         ))}
       </div>

      <div className="mt-24">
        <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-center mb-12">
            Compare all features
        </h2>
        <div className="w-full overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800 no-scrollbar shadow-lg dark:shadow-brand-blue/10">
          <table className="w-full min-w-[640px] divide-y divide-gray-200 dark:divide-gray-800">
            <thead className="bg-gray-50 dark:bg-zinc-900">
              <tr>
                <th scope="col" className="sticky left-0 bg-gray-50 dark:bg-zinc-900 z-10 px-4 py-3 text-left text-xs font-semibold text-gray-900 dark:text-white w-1/3 md:w-1/4">
                  Features
                </th>
                <th scope="col" className="px-4 py-3 text-center text-xs font-semibold text-gray-900 dark:text-white">Free</th>
                <th scope="col" className="px-4 py-3 text-center text-xs font-semibold text-gray-900 dark:text-white">Pro</th>
                <th scope="col" className="px-4 py-3 text-center text-xs font-semibold text-gray-900 dark:text-white">Business</th>
                <th scope="col" className="px-4 py-3 text-center text-xs font-semibold text-gray-900 dark:text-white">Enterprise</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800 bg-light-card dark:bg-dark-card">
              {pricingDetails.map((item, index) => 
                item.isHeader ? (
                  <tr key={`header-${index}`}>
                    <td colSpan={5} className="bg-gray-100 dark:bg-black/50 px-4 py-3">
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white">{item.section}</h3>
                    </td>
                  </tr>
                ) : (
                  <tr key={item.label} className="group">
                    <th scope="row" className="sticky left-0 bg-light-card dark:bg-zinc-900 z-10 px-4 py-3 text-xs font-medium text-gray-800 dark:text-gray-200 text-left whitespace-nowrap group-hover:bg-gray-100 dark:group-hover:bg-zinc-800 transition-colors">
                      {item.label}
                    </th>
                    <td className="px-4 py-3 text-center text-xs text-gray-600 dark:text-gray-400 group-hover:bg-gray-50 dark:group-hover:bg-white/5 transition-colors">{item.free}</td>
                    <td className="px-4 py-3 text-center text-xs text-gray-600 dark:text-gray-400 group-hover:bg-gray-50 dark:group-hover:bg-white/5 transition-colors">{item.pro}</td>
                    <td className="px-4 py-3 text-center text-xs text-gray-600 dark:text-gray-400 group-hover:bg-gray-50 dark:group-hover:bg-white/5 transition-colors">{item.business}</td>
                    <td className="px-4 py-3 text-center text-xs text-gray-600 dark:text-gray-400 group-hover:bg-gray-50 dark:group-hover:bg-white/5 transition-colors">{item.enterprise}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default PricingPage;