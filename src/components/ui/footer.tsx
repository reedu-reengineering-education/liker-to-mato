import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-muted py-6 text-center text-xs text-muted-foreground">
      {/* <div className="container mx-auto px-4"> */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8"> */}
      {/* <div> */}
      {/* <h3 className="font-semibold mb-4">About Us</h3> */}
      {/* <p className="text-xs">
              Reedu GmbH & Co. KG specializes in innovative educational
              solutions, empowering learners and educators with cutting-edge
              tools and methodologies.
            </p> */}
      {/* </div> */}
      {/* <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/about"
                className="hover:text-primary transition-colors"
              >
                About
              </Link>
              <Link
                href="/services"
                className="hover:text-primary transition-colors"
              >
                Services
              </Link>
              <Link
                href="/contact"
                className="hover:text-primary transition-colors"
              >
                Contact
              </Link>
              <Link
                href="/privacy"
                className="hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
            </nav>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Connect With Us</h3>
            <div className="flex justify-center space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 hover:text-primary transition-colors" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 hover:text-primary transition-colors" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 hover:text-primary transition-colors" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 hover:text-primary transition-colors" />
              </a> */}
      {/* </div>
          </div> */}
      {/* </div> */}
      <div className="container">
        &copy; {new Date().getFullYear()} Reedu GmbH & Co. KG. Alle Rechte vorbehalten.
      </div>
      {/* </div> */}
    </footer>
  );
}
