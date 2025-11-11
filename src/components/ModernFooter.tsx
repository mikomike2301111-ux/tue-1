import { Instagram } from 'lucide-react';

export default function ModernFooter() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center space-y-6">
          <h2
            className="text-3xl font-bold tracking-tight"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            Eddjos Collections .ke
          </h2>

          <p className="text-gray-400 max-w-md mx-auto">
            Redefining urban comfort with timeless, minimalist designs.
          </p>

          <div className="flex items-center justify-center gap-6 pt-4">
            <a
              href="https://www.instagram.com/eddjoscollection?igsh=cmF6bGxuMHNmdGtr"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
            >
              <Instagram className="w-5 h-5" />
              <span className="font-medium">Instagram</span>
            </a>

            <a
              href="https://www.tiktok.com/@eddjoscollections?_r=1&_t=ZM-91HLQYwOJL9"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
              <span className="font-medium">TikTok</span>
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © 2025 Eddjos Collections. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
