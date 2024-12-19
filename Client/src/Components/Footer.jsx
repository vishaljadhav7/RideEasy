import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="flex flex-wrap justify-between items-center">
          {/* Logo & Branding */}
          <div className="mb-6 md:mb-0">
          <h1 className="text-2xl font-bold text-yellow-400">
            Ryde<span className="text-slate-500">Easy</span>
          </h1>
            <p className="text-sm text-gray-400 mt-2">
              Your trusted ride-sharing partner.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap gap-8">
            <div>
              <h3 className="text-lg font-semibold text-yellow-400 mb-2">
                Company
              </h3>
              <ul className="space-y-2 text-gray-400 ">
                <li className="hover:text-yellow-400">
                    About Us
                </li>
                <li className="hover:text-yellow-400">
                    Careers
                </li>
                <li className="hover:text-yellow-400">
                    Blog
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-yellow-400 mb-2">
                Support
              </h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-yellow-400">
                    Help Center
                </li>
                <li className="hover:text-yellow-400">
                    Safety Information
                </li>
                <li className="hover:text-yellow-400">
                    Contact Us
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-gray-700"></div>

        {/* Bottom Section */}
        <div className="flex flex-wrap justify-between items-center text-sm">
          <p className="text-gray-500">
            © {new Date().getFullYear()} RydeEasy. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#terms" className="hover:text-yellow-400">
              Terms of Service
            </a>
            <a href="#privacy" className="hover:text-yellow-400">
              Privacy Policy
            </a>
          </div>
          {/* Social Links */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
