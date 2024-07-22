'use client';

import React from 'react';

export default function Footer() {
  return (
    <section className="footer-main bg-primary text-white">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="footer-info text-center mb-8">
          <a href="https://nlbc.com" className="block mb-4">
            <img
              className="mx-auto max-w-xs"
              src="https://nlbc.com/wp-content/uploads/2020/05/NLBC-logo-IG-REV@2x.png"
              alt="NLBC logo"
            />
          </a>
          <div className="footer-contact mb-4">
            <p>6369 East Dublin Pike, P.O. Box 38</p>
            <p>New Lisbon, IN 47366, 765-332-2885</p>
          </div>
          <div className="footer-contact mb-4">
            <p>1001 E. Washington Street</p>
            <p>Winchester, IN 47394, 765-584-2288</p>
          </div>
          <div className="footer-social flex justify-center space-x-4 mb-4">
            <a
              className="btn btn-primary"
              href="https://www.facebook.com/NLBCNLTC/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://nlbc.com/wp-content/uploads/2020/06/Facebook-nocircle.svg"
                alt="Facebook icon"
              />
            </a>
            <a
              className="btn btn-primary"
              href="https://twitter.com/NLTCNLBC"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://nlbc.com/wp-content/uploads/2020/06/Twitter-nocircle.svg"
                alt="Twitter icon"
              />
            </a>
            <a
              className="btn btn-primary"
              href="https://www.linkedin.com/company/new-lisbon-broadband-and-communications/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://nlbc.com/wp-content/uploads/2020/06/LinkedIn-nocircle.svg"
                alt="LinkedIn icon"
              />
            </a>
          </div>
        </div>

        <div className="footer-docs text-center mb-8">
          <ul className="list-none space-y-2">
            <li>
              <a
                href="/wp-content/uploads/2020/05/open-internet-principles-11-19.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                Open Internet Principles
              </a>
            </li>
            <li>
              <a
                href="/wp-content/uploads/2020/05/acceptable_use_policy-11-10-17.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                Acceptable Use Policy
              </a>
            </li>
            <li>
              <a
                href="https://7050087.fs1.hubspotusercontent-na1.net/hubfs/7050087/NLT_DSL%20T&Cs_2023.03%20(FINAL).pdf"
                target="_self"
                className="text-gray-400 hover:text-white"
              >
                WBITS
              </a>
            </li>
            <li>
              <a
                href="/wp-content/uploads/2020/05/0430_12132017_FCCLetter_CST8199_kr.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                Battery Backup Policy
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-ribbon text-center py-4 border-t border-gray-700">
          ©2024 <a href="https://nlbc.com" className="hover:underline">NLBC</a> Powered by{' '}
          <a href="https://irongatecreative.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">
            IronGate Creative
          </a>
        </div>
      </div>
    </section>
  );
}
