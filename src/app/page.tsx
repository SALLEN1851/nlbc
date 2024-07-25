import Header from './header';
import Footer from './footer';
import Map from './map'; 
import SearchAddressForm from './SearchAddressForm'; 
import ZoneContainer from './zoneContainer';

export default function Example() {
  return (
    <div className="text-black bg-white static">
      <Header />
      <Map />
      <SearchAddressForm />
      <ZoneContainer />
      <Footer />
    </div>
  );
}
