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

  if (isInsideNLTC) {
    return (
      `<div className="mx-auto my-10 p-6 max-w-lg border border-gray-300 shadow-lg bg-white rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">You're Qualified!</h2>
        <p>
          <strong>{fullAddress}</strong> is qualified for fiber optic internet service through NLTC.
        </p>
        <p className="mt-4">
          If you would like fiber optic internet service at your residence, please click the sign-up now button and you can fill out the residential service agreement.
        </p>
        <div className="mt-4">
          <a href="https://nlbcnltc.eversign.com/embedded/56177ffa0115439ea4d01d06007a99ff" className="inline-block px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600">
            Sign up now
          </a>
        </div>
        <p className="mt-4">
          If you are interested in a commercial internet service or would like to speak with a representative,{' '}
          <a href="https://share.hsforms.com/1IXoUM1AlTMClAEYjqMJr7w473vr" id="form-link" className="text-blue-500 underline hover:text-blue-700">
            please click here to fill out our contact form to have a representative reach out to you.
          </a>
        </p>
      </div>`
    );
  }

  if (
    isInsideMeekRd ||
    isInsideWhiteWater ||
    isInsideSunSetArea ||
    isInsideMattieHarris ||
    isInsidePolygon411
  ) {
    return (
      `<div className="mx-auto my-10 p-6 max-w-lg border border-gray-300 shadow-lg bg-white rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">You're Qualified!</h2>
        <p>
          <strong>{fullAddress}</strong> is qualified for fiber optic internet service.
        </p>
        <p className="mt-4">
          If you would like fiber optic internet service at your residence, please click the sign-up now button and you can fill out the residential service agreement.
        </p>
        <div className="mt-4">
          <a href="https://nlbcnltc.eversign.com/embedded/552f574523c247f0821d4b984484ea65" className="inline-block px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600">
            Sign up now
          </a>
        </div>
        <p className="mt-4">
          If you are interested in a commercial internet service or would like to speak with a representative,{' '}
          <a href="https://share.hsforms.com/1IXoUM1AlTMClAEYjqMJr7w473vr" id="form-link" className="text-blue-500 underline hover:text-blue-700">
            please click here to fill out our contact form to have a representative reach out to you.
          </a>
        </p>
      </div>`
    );
  }

  if (isInsideLeadLine) {
    return (
      `<div>
        <h2 className="section-heading">Area of Interest</h2>
        <p>
          <strong>{fullAddress}</strong> falls into an area that we are considering for near future fiber deployment.
        </p>
        <p>
          We must reach a set number of commitments before construction can begin in this area.
          <br />
          If you would like to receive fiber optic internet service at this address, please fill out the information below and click the submit button.
        </p>
        <div id="message-section">
          <form id="LeadLineInterest">
            <div className="form-group">
              <label htmlFor="firstName">First Name:</label>
              <input type="text" id="firstName" name="firstName" required />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name:</label>
              <input type="text" id="lastName" name="lastName" required />
            </div>
            <div className="form-group">
              <label htmlFor="streetAddress">Address:</label>
              <input type="text" id="streetAddress" name="streetAddress" required />
            </div>
            <div className="form-group">
              <label htmlFor="city">City:</label>
              <input type="text" id="city" name="city" required />
            </div>
            <div className="form-group">
              <label htmlFor="state">State:</label>
              <input type="text" id="state" name="state" required />
            </div>
            <div className="form-group">
              <label htmlFor="postalCode">Postal Code:</label>
              <input type="text" id="postalCode" name="postalCode" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number:</label>
              <input type="tel" id="phone" name="phone" required />
            </div>
            <div>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>`
    );
  }

  if (isInsideRDOF) {
    return (
      `<div>
        <h2 className="section-heading">Pre-Construction</h2>
        <p>
          <strong>{fullAddress}</strong> is an area that is currently in the pre-construction phase which means that we will soon begin placing fiber optic internet service in your area.
          <br />
          If you would like to pre-order your residential internet service, please click the sign-up now button and you can fill out the agreement for service.
        </p>
        <div>
          <a href="https://nlbcnltc.eversign.com/embedded/552f574523c247f0821d4b984484ea65" className="button-link">
            Sign up now
          </a>
        </div>
        <p>
          If you are interested in a commercial internet service or would like to speak with a representative,{' '}
          <a href="https://share.hsforms.com/1IXoUM1AlTMClAEYjqMJr7w473vr" id="form-link">
            please click here to fill out our contact form to have a representative reach out to you.
          </a>
        </p>
      </div>`
    );
  }

  return `<p>Contact us to confirm service availability at <strong>{fullAddress}</strong>.</p>`;
};

export default PolygonMessage;
