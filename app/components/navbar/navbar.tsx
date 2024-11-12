import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from '@remix-run/react';
import { ModeToggle } from '@/components/theme/ModeToggle';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { HEADER_HEIGHT } from '@/constants/indes';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { state } = useLocation();

  useEffect(() => {
    if (state?.hash) {
      setActiveSection(state.hash);
    }
  }, [state]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { name: 'Home', href: '#intro' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-white shadow-lg dark:bg-gray-800">
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-4 h-[${HEADER_HEIGHT}rem] sm:px-6 lg:px-8`}
      >
        <div className="flex items-center gap-4">
          <Link to="/" className="flex-shrink-0">
            <Avatar className="my-4">
              <AvatarImage src="/logo.png" alt="SC" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
          </Link>
          <span className="text-2xl font-bold text-gray-800 dark:text-white">Sviatoslav Chyzh</span>
        </div>
        <div className="hidden md:block">
          <div className="ml-10 flex items-center gap-10 space-x-4">
            <div className="flex gap-2">
              {menuItems.map((item) => (
                <Link
                  to={item.href}
                  key={item.name}
                  className={`rounded-md p-4 hover:cursor-pointer ${item.href === activeSection ? 'bg-primary text-white' : ''}`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <ModeToggle />
          </div>
        </div>
        <div className="-mr-2 flex md:hidden">
          <Button onClick={toggleMenu} aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300"
                onClick={toggleMenu}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="px-4 py-3">
            <div className="flex items-center justify-center space-x-2">
              <ModeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
