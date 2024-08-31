import React from 'react';
import PricingTiers from './pricingTiers';
import PricingTiersNLTC from './PricingTiersNLTC';
import PricingTiersPreConstruction from './PricingTiersPreConstruction';

interface PolygonMessageProps {
  fullAddress: string;
  areaType: string | null;
  showPricingTiers: boolean;
  showPricingTiersNLTC: boolean;
  showPricingTiersPreConstruction: boolean;
}

const PolygonMessage: React.FC<PolygonMessageProps> = ({ fullAddress, areaType, showPricingTiers, showPricingTiersNLTC, showPricingTiersPreConstruction }) => {
  if (!areaType) {
    return null;
  }

  const messages: { [key: string]: React.ReactNode } = {
    qualified: showPricingTiers && <PricingTiers fullAddress={fullAddress} />,

    
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
    rdof: showPricingTiersPreConstruction && <PricingTiersPreConstruction fullAddress={fullAddress} />,
    nltc: showPricingTiersNLTC && <PricingTiersNLTC fullAddress={fullAddress} />,
  };
  return (
  <div className="mx-auto max-w-full">
    {messages[areaType] || messages.default}
    </div>
  );
};

export default PolygonMessage;
