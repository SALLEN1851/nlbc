
import Header from './header';
import Footer from './footer';
import Map from './map'; 
import SearchAddressForm from './SearchAddressForm'; 

export default function Example() {
  return (
    <div className="text-black bg-white static">
      <Header />
      <Map />
    <div className="container mx-auto px-4 py-8 relative -top-20 z-10 max-w-xl">
      <SearchAddressForm />
    </div>
      <Footer />
    </div>
  );
}