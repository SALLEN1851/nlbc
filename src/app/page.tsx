import Header from './header';
import Footer from './footer';
import Map from './map'; 
import SearchAddressForm from './SearchAddressForm'; 
import { Analytics } from "@vercel/analytics/react"

export default function Main() {
  return (
    <div className="text-black bg-white static">
      <Header />
      <Map />
      <SearchAddressForm />
      <Footer />
      <Analytics />
    </div>
  );
}
