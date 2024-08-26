import React from 'react';

interface PolygonMessageProps {
  fullAddress: string;
  areaType: string | null;
  hasSearched: boolean;
}

const PolygonMessage: React.FC<PolygonMessageProps> = ({
  fullAddress,
  areaType,
  hasSearched,
}) => {
  if (!hasSearched) {
    return null;
  }

  const messages: { [key: string]: React.ReactNode } = {
    qualified: (
      <>
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">You&apos;re Qualified!</h2>
        <p className="text-lg text-gray-600 leading-relaxed mb-4">
          <strong className="text-gray-900">{fullAddress}</strong> is qualified for fiber optic internet service.
        </p>
        <p className="text-lg text-gray-600 leading-relaxed mb-6">
          If you would like fiber optic internet service at your residence, please click the sign-up now
          button to fill out the residential service agreement.
        </p>
        <div className="mt-6 text-center">
          <a
            href="https://nlbcnltc.eversign.com/embedded/552f574523c247f0821d4b984484ea65"
            className="inline-block w-full md:w-auto px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 ease-in-out"
          >
            Sign up now
          </a>
        </div>
      </>
    ),
    leadLine: (
      <>
        <h2 className="section-heading">Area of Interest</h2>
        <p>
          <strong>{fullAddress}</strong> falls into an area that we are considering for near future fiber
          deployment. We must reach a set number of commitments before construction can begin in this area.
          If you would like to receive fiber optic internet service at this address, please fill out the
          information below and click the submit button.
        </p>
        <div id="message-section">
          <form id="LeadLineInterest">
            {/* Form fields as JSX */}
          </form>
        </div>
      </>
    ),
    rdof: (
      <>
        <h2 className="section-heading">Pre-Construction</h2>
        <p>
          <strong>{fullAddress}</strong> is an area that is currently in the pre-construction phase which
          means that we will soon begin placing fiber optic internet service in your area.
          If you would like to pre-order your residential internet service, please click the sign-up now
          button and you can fill out the agreement for service.
        </p>
        <div className="mt-4 text-center">
          <a
            href="https://nlbcnltc.eversign.com/embedded/552f574523c247f0821d4b984484ea65"
            className="button-link"
          >
            Sign up now
          </a>
        </div>
      </>
    ),
    nltc: (
      <>
        <h2 className="text-2xl font-semibold mb-4">You&apos;re Qualified!</h2>
        <p>
          <strong>{fullAddress}</strong> is qualified for fiber optic internet service.
        </p>
        <p className="mt-4">
          If you would like fiber optic internet service at your residence, please click the sign-up now
          button and you can fill out the residential service agreement.
        </p>
        <div className="mt-4 text-center">
          <a
            href="https://nlbcnltc.eversign.com/embedded/56177ffa0115439ea4d01d06007a99ff"
            className="inline-block px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600"
          >
            Sign up now
          </a>
        </div>
      </>
    ),
    default: (
      <p>
        Contact us to confirm service availability at <strong>{fullAddress}</strong>.
      </p>
    ),
  };

  return (
    <div className="mx-auto my-10 p-8 max-w-lg border border-gray-200 shadow-xl bg-white rounded-2xl">
      {messages[areaType] || messages.default}
      <p className="text-lg text-gray-600 leading-relaxed mt-8">
        If you are interested in commercial internet service or would like to speak with a representative,{' '}
        <a
          href="https://share.hsforms.com/1IXoUM1AlTMClAEYjqMJr7w473vr"
          id="form-link"
          className="text-blue-600 font-medium underline hover:text-blue-800 transition-colors duration-300 ease-in-out"
        >
          please click here to fill out our contact form to have a representative reach out to you.
        </a>
      </p>
    </div>
  );
};

export default PolygonMessage;
