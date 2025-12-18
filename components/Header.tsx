import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Mail, Phone, MapPin, Facebook, Linkedin, Instagram, ArrowRight } from 'lucide-react';
import { Button } from './Button';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Navigation Items Mapping
  const navItems = [
    { label: 'Giới thiệu', href: '#ky-nguyen-moi' },
    { label: 'Giá trị', href: '#vien-canh-tuong-lai' },
    { label: 'Giải pháp', href: '#nen-tang-hop-nhat' },
    { label: 'Hiệu quả', href: '#bao-cao-thong-minh' },
  ];

  // Smooth scroll handler with offset for fixed header
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 100; // Adjust based on header height (~80px + padding)
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsOpen(false);
  };

  return (
    <div className="fixed top-0 w-full z-50 flex flex-col font-sans transition-all duration-500">
      {/* === TOP BAR (Menubar) === */}
      <div 
        className={`bg-gray-50 bg-subtle-pattern bg-subtle-pattern text-gray-600 text-xs transition-all duration-500 ease-in-out border-b border-gray-200 overflow-hidden ${
          scrolled ? 'max-h-0 opacity-0' : 'max-h-12 opacity-100 py-2.5'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-8 flex flex-col sm:flex-row justify-between items-center gap-2">
           <div className="flex items-center gap-4 sm:gap-6 font-medium">
              <a href="mailto:hello@fastyear.vn" className="flex items-center gap-1.5 hover:text-brand-yellow transition-colors group">
                 <Mail size={14} className="text-gray-400 group-hover:text-brand-yellow transition-colors" /> 
                 <span className="hidden sm:inline">hello@fastyear.vn</span>
                 <span className="sm:hidden">Email</span>
              </a>
              <div className="w-px h-3 bg-gray-300 hidden sm:block"></div>
              <a href="tel:0939373789" className="flex items-center gap-1.5 hover:text-brand-yellow transition-colors group">
                 <Phone size={14} className="text-gray-400 group-hover:text-brand-yellow transition-colors" /> 
                 <span className="hidden sm:inline">(+84) 939 373 789</span>
                 <span className="sm:hidden">Hotline</span>
              </a>
              <div className="w-px h-3 bg-gray-300 hidden md:block"></div>
              <span className="hidden md:flex items-center gap-1.5 text-gray-500 cursor-default">
                 <MapPin size={14} className="text-gray-400" /> Ho Chi Minh City
              </span>
           </div>

           <div className="flex items-center gap-4">
              <span className="text-gray-400 hidden sm:inline text-[10px] uppercase tracking-wider font-bold">Follow us</span>
              <div className="flex gap-3">
                 <a href="https://www.facebook.com/marcusthemartian/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#1877F2] transition-colors transform hover:scale-110"><Facebook size={14}/></a>
                 <a href="https://www.linkedin.com/in/markthemartian" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0A66C2] transition-colors transform hover:scale-110"><Linkedin size={14}/></a>
                 <a href="#" className="text-gray-400 hover:text-[#E4405F] transition-colors transform hover:scale-110"><Instagram size={14}/></a>
              </div>
           </div>
        </div>
      </div>

      {/* === MAIN HEADER === */}
      <header 
        className={`w-full transition-all duration-300 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-xl border-b border-gray-100 py-3 shadow-sm' 
            : 'bg-white/80 backdrop-blur-sm border-b border-transparent py-5'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-8">
          <div className="flex justify-between items-center">
            
            {/* Logo Section */}
            <a href="#" onClick={(e) => handleNavClick(e, '#ky-nguyen-moi')} className="flex items-center gap-3 group">
              <div className={`p-2 rounded-xl transition-all duration-300 bg-brand-yellow text-white shadow-lg shadow-brand-yellow/30 group-hover:scale-105`}>
                 <ShoppingBag size={20} fill="currentColor" className="text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900 group-hover:text-brand-yellow transition-colors">
                FastYear
              </span>
            </a>
            
            {/* Minimalist Desktop Nav */}
            <nav className="hidden xl:flex items-center gap-10">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="relative text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors py-2"
                >
                  {item.label}
                  {/* Subtle Yellow Dot on Hover */}
                  <span className="absolute -bottom-1 left-1/2 w-1 h-1 bg-brand-yellow rounded-full opacity-0 -translate-x-1/2 transition-all duration-300 group-hover:opacity-100"></span>
                </a>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <div className="hidden xl:block">
                <a 
                  href="tel:0939373789"
                  className="group relative px-6 py-2.5 rounded-full bg-transparent overflow-hidden text-sm font-bold text-gray-900 border-2 border-gray-900 hover:text-white transition-colors duration-300 inline-flex items-center"
                >
                  <span className="absolute inset-0 w-full h-full bg-brand-yellow translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
                  <span className="relative flex items-center gap-2">
                    Liên Hệ <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
                  </span>
                </a>
              </div>

              {/* Mobile Menu Button */}
              <div className="xl:hidden">
                <button
                  onClick={toggleMenu}
                  className="p-2 text-gray-600 hover:text-brand-yellow hover:bg-yellow-50 rounded-full transition-colors"
                >
                  {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Nav Drawer */}
      <div
        className={`fixed inset-0 z-40 bg-white transform transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) xl:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full p-8 bg-white bg-subtle-pattern bg-subtle-pattern">
          <div className="flex justify-between items-center mb-12">
             <div className="flex items-center gap-2">
                <div className="bg-brand-yellow text-white p-2 rounded-lg shadow-lg shadow-brand-yellow/20">
                  <ShoppingBag size={20} fill="currentColor" />
                </div>
                <span className="text-2xl font-bold text-gray-900">FastYear</span>
             </div>
             <button onClick={toggleMenu} className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors">
               <X size={24} />
             </button>
          </div>
          
          <nav className="flex flex-col space-y-4">
            {navItems.map((item, idx) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-lg font-semibold text-gray-600 hover:text-brand-yellow hover:pl-2 transition-all duration-300 border-b border-gray-100 pb-3 flex items-center justify-between"
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                {item.label}
                <ArrowRight size={16} className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-brand-yellow" />
              </a>
            ))}
          </nav>
          
          <div className="mt-auto space-y-6">
            <div className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm space-y-4">
               <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Contact Info</h4>
               <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-8 h-8 rounded-full bg-yellow-50 flex items-center justify-center text-brand-yellow">
                    <Mail size={14} />
                  </div>
                  hello@fastyear.vn
               </div>
               <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-500">
                    <Phone size={14} />
                  </div>
                  (+84) 939 373 789
               </div>
            </div>
            <Button fullWidth className="bg-brand-yellow text-white hover:bg-yellow-500 border-none shadow-brand-yellow/40" onClick={() => {setIsOpen(false); document.getElementById('cta')?.scrollIntoView()}}>
              Tư vấn ngay
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};