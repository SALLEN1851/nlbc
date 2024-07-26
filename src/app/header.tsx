'use client';
import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md fixed top-0 w-full z-50 font-sans">
      <nav aria-label="Global" className="mx-auto max-w-6xl p-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center">
          <a href="https://nlbc.com/" className="-m-1.5 p-1.5">
            <span className="sr-only">NLBC</span>
            <img alt="NLBC" src="https://nlbc.com/wp-content/themes/wp-bootstrap-starter/images/logo-black.png" className="h-18 w-auto" />
          </a>
        </div>
        <div className="hidden lg:flex flex-col items-end space-y-2">
          <div className="flex space-x-8">
            <a href="https://nlbc.com/about/career-opportunities/" className="text-sm font-normal leading-6 my-2 text-gray-900">
              Career Opportunities
            </a>
            <a href="https://userportal.nltc.net/login" target="_blank" className="text-sm font-normal leading-6 my-2 text-gray-900">
              Email
            </a>
            <a href="http://speedtest.nlbc.com/" target="_blank" className="text-sm font-normal leading-6 my-2 text-gray-900">
              Speed Test
            </a>
            <a href="https://nlbc.com/tutorial/" className="text-sm font-normal leading-6 my-2 text-gray-900">
              Tutorials
            </a>
            <a href="https://nlbc.com/pay-your-bill/" className="text-sm font-semibold leading-6 text-white bg-secondary hover:bg-blue-600 px-8 py-2 rounded-3xl">
              Pay Bill
            </a>
          </div>
          <div className="flex space-x-8 mx-12 py-2 font-black">
            <a href="https://nlbc.com/internet/" className="text-m font-bold leading-6 text-gray-900">
              Internet
            </a>
            <a href="https://nlbc.com/tv/" className="text-m font-bold leading-6 text-gray-900">
              TV
            </a>
            <a href="https://nlbc.com/business/" className="text-m font-bold leading-6 text-gray-900">
              Business
            </a>
            <a href="https://nlbc.com/about/" className="text-m font-bold leading-6 text-gray-900">
              About
            </a>
          </div>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="https://nlbc.com/" className="-m-1.5 p-1.5">
              <span className="sr-only">NLBC</span>
              <img alt="NLBC" src="https://nlbc.com/wp-content/themes/wp-bootstrap-starter/images/logo-black.png" className="h-8 w-auto" />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <a href="https://nlbc.com/internet/" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                  Internet
                </a>
                <a href="https://nlbc.com/tv/" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                  TV
                </a>
                <a href="https://nlbc.com/business/" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                  Business
                </a>
                <a href="https://nlbc.com/about/" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                  About
                </a>
                <a href="https://nlbc.com/about/career-opportunities/" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                  Career Opportunities
                </a>
                <a href="https://userportal.nltc.net/login" target="_blank" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                  Email
                </a>
                <a href="http://speedtest.nlbc.com/" target="_blank" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                  Speed Test
                </a>
                <a href="https://nlbc.com/tutorial/" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                  Tutorials
                </a>
                <a href="https://nlbc.com/pay-your-bill/" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white bg-blue-500 hover:bg-blue-600 rounded-md">
                  Pay Bill
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

export default Header;
