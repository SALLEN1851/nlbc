import React from 'react';

interface PolygonMessageProps {
  fullAddress: string;
  isInsideMeekRd: boolean;
  isInsideWhiteWater: boolean;
  isInsideSunSetArea: boolean;
  isInsideLeadLine: boolean;
  isInsideRDOF: boolean;
  isInsideMattieHarris: boolean;
  isInsideNLTC: boolean;
  isInsidePolygon411: boolean;
  hasSearched: boolean;
}

const PolygonMessage: React.FC<PolygonMessageProps> = ({
  fullAddress,
  isInsideMeekRd,
  isInsideWhiteWater,
  isInsideSunSetArea,
  isInsideLeadLine,
  isInsideRDOF,
  isInsideMattieHarris,
  isInsideNLTC,
  isInsidePolygon411,
  hasSearched,
}) => {
  if (!hasSearched) {
    return null;
  }

  const qualifiedMessage = (signUpLink: string) => (
    <div className="mx-auto my-10 p-6 max-w-lg border border-gray-300 shadow-lg bg-white rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">You're Qualified!</h2>
      <p>
        <strong>{fullAddress}</strong> is qualified for fiber optic internet service.
      </p>
      <p className="mt-4">
        If you would like fiber optic internet service at your residence, please click the sign-up now button and fill out the residential service agreement.
      </p>
      <div className="mt-4">
        <a
          href={signUpLink}
          className="inline-block px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600"
        >
          Sign up now
        </a>
      </div>
      <p className="mt-4">
        If you are interested in commercial internet service or would like to speak with a representative,{' '}
        <a
          href="https://share.hsforms.com/1IXoUM1AlTMClAEYjqMJr7w473vr"
          className="text-blue-500 underline hover:text-blue-700"
        >
          please click here to fill out our contact form to have a representative reach out to you.
        </a>
      </p>
    </div>
  );

  const areaOfInterestMessage = (
    <div className="mx-auto my-10 p-6 max-w-lg border border-gray-300 shadow-lg bg-white rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Area of Interest</h2>
      <p>
        <strong>{fullAddress}</strong> falls into an area that we are considering for near future fiber deployment.
      </p>
      <p className="mt-4">
        We must reach a set number of commitments before construction can begin in this area.
        If you would like to receive fiber optic internet service at this address, please fill out the information below and click the submit button.
      </p>
      <form id="LeadLineInterest" className="mt-4 grid grid-cols-1 gap-4">
        <div className="flex flex-col">
          <label htmlFor="firstName" className="mb-1 font-medium">
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="lastName" className="mb-1 font-medium">
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="streetAddress" className="mb-1 font-medium">
            Address:
          </label>
          <input
            type="text"
            id="streetAddress"
            name="streetAddress"
            required
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="city" className="mb-1 font-medium">
            City:
          </label>
          <input
            type="text"
            id="city"
            name="city"
            required
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="state" className="mb-1 font-medium">
            State:
          </label>
          <input
            type="text"
            id="state"
            name="state"
            required
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="postalCode" className="mb-1 font-medium">
            Postal Code:
          </label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            required
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1 font-medium">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="phone" className="mb-1 font-medium">
            Phone Number:
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );

  const preConstructionMessage = (
    <div className="mx-auto my-10 p-6 max-w-lg border border-gray-300 shadow-lg bg-white rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Pre-Construction</h2>
      <p>
        <strong>{fullAddress}</strong> is an area that is currently in the pre-construction phase, which means that we will soon begin placing fiber optic internet service in your area.
        If you would like to pre-order your residential internet service, please click the sign-up now button and fill out the agreement for service.
      </p>
      <div className="mt-4">
        <a
          href="https://nlbcnltc.eversign.com/embedded/552f574523c247f0821d4b984484ea65"
          className="inline-block px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600"
        >
          Sign up now
        </a>
      </div>
      <p className="mt-4">
        If you are interested in commercial internet service or would like to speak with a representative,{' '}
        <a
          href="https://share.hsforms.com/1IXoUM1AlTMClAEYjqMJr7w473vr"
          className="text-blue-500 underline hover:text-blue-700"
        >
          please click here to fill out our contact form to have a representative reach out to you.
        </a>
      </p>
    </div>
  );

  const contactUsMessage = (
    <div className="mx-auto my-10 p-6 max-w-lg border border-yellow-300 shadow-lg bg-yellow-50 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
      <p>
        Please contact us to confirm service availability at <strong>{fullAddress}</strong>.
      </p>
      <div className="mt-4">
        <a
          href="mailto:support@yourcompany.com"
          className="inline-block px-4 py-2 bg-yellow-500 text-white font-semibold rounded-md shadow hover:bg-yellow-600"
        >
          Email Us
        </a>
      </div>
    </div>
  );

  let message;

  if (
    isInsideMeekRd ||
    isInsideMattieHarris ||
    isInsidePolygon411 ||
    isInsideWhiteWater ||
    isInsideSunSetArea
  ) {
    message = qualifiedMessage(
      'https://nlbcnltc.eversign.com/embedded/552f574523c247f0821d4b984484ea65'
    );
  } else if (isInsideNLTC) {
    message = qualifiedMessage(
      'https://nlbcnltc.eversign.com/embedded/56177ffa0115439ea4d01d06007a99ff'
    );
  } else if (isInsideLeadLine) {
    message = areaOfInterestMessage;
  } else if (isInsideRDOF) {
    message = preConstructionMessage;
  } else {
    message = contactUsMessage;
  }

  return <div>{message}</div>;
};

export default PolygonMessage;
