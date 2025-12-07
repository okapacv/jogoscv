import { useState } from 'react';
import { Gamepad2, Search, User, Menu, X, Heart, Bell } from 'lucide-react';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  user: any;
  onAuthClick: () => void;
}

export default function Header({ onNavigate, currentPage, user, onAuthClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Início' },
    { id: 'promotions', label: 'Promoções' },
    { id: 'news', label: 'Notícias' },
    { id: 'faq', label: 'FAQ' },
  ];

  return (
    <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700 sticky top-0 z-50 backdrop-blur-lg bg-opacity-95">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 group"
            >
              <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
                <Gamepad2 className="w-6 h-6 text-white" />
              </div>
              <div className="hidden md:block">
                <h1 className="text-xl font-bold text-white">GamePromo</h1>
                <p className="text-xs text-cyan-400">Cabo Verde</p>
              </div>
            </button>

            <nav className="hidden lg:flex items-center gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-sm font-medium transition-colors relative group ${
                    currentPage === item.id
                      ? 'text-cyan-400'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.label}
                  {currentPage === item.id && (
                    <span className="absolute -bottom-6 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500"></span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-gray-300 hover:text-white hover:bg-slate-700 rounded-lg transition-all duration-200"
            >
              <Search className="w-5 h-5" />
            </button>

            {user && (
              <>
                <button
                  onClick={() => onNavigate('favorites')}
                  className="p-2 text-gray-300 hover:text-white hover:bg-slate-700 rounded-lg transition-all duration-200 relative"
                >
                  <Heart className="w-5 h-5" />
                </button>
                <button
                  className="p-2 text-gray-300 hover:text-white hover:bg-slate-700 rounded-lg transition-all duration-200 relative"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
              </>
            )}

            <button
              onClick={onAuthClick}
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-lg transition-all duration-200 font-medium"
            >
              <User className="w-4 h-4" />
              <span>{user ? user.email?.split('@')[0] : 'Entrar'}</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-300 hover:text-white hover:bg-slate-700 rounded-lg transition-all duration-200"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="py-4 border-t border-slate-700 animate-fadeIn">
            <input
              type="text"
              placeholder="Buscar jogos, promoções..."
              className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              autoFocus
            />
          </div>
        )}

        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-700 animate-fadeIn">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left px-4 py-3 rounded-lg transition-colors ${
                    currentPage === item.id
                      ? 'bg-slate-700 text-cyan-400'
                      : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => {
                  onAuthClick();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 px-4 py-3 mt-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium"
              >
                <User className="w-4 h-4" />
                <span>{user ? user.email?.split('@')[0] : 'Entrar'}</span>
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
