import React from 'react';
import PricingTiers from './pricingTiers';
import PricingTiersNLTC from './PricingTiersNLTC';
import PricingTiersPreConstruction from './PricingTiersPreConstruction';
import PricingTiersInterest from './PricingTiersInterest';

interface PolygonMessageProps {
  fullAddress: string;
  areaType: string | null;
  showPricingTiers: boolean;
  showPricingTiersNLTC: boolean;
  showPricingTiersPreConstruction: boolean;
  showPricingTiersInterest: boolean;
}

const PolygonMessage: React.FC<PolygonMessageProps> = ({ fullAddress, areaType, showPricingTiers, showPricingTiersNLTC, showPricingTiersPreConstruction, showPricingTiersInterest }) => {
  if (!areaType) {
    return null;
  }

  const messages: { [key: string]: React.ReactNode } = {
    qualified: showPricingTiers && <PricingTiers fullAddress={fullAddress} />,

    
    leadLine: showPricingTiersInterest && <PricingTiersInterest fullAddress={fullAddress} />,
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
