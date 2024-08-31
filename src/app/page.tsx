import Header from './header';
import Footer from './footer';
import Map from './map'; 
import SearchAddressForm from './SearchAddressForm'; 

export default function Main() {
  return (
    <div className="text-black bg-white static">
      <Header />
      <Map />
      <SearchAddressForm />
      
      <Footer />
    </div>
  );
}
