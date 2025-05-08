import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, GraduationCap } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Khóa học', path: '/courses' },
    { name: 'Đăng ký', path: '/registration' },
    { name: 'Liên hệ', path: '/contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <GraduationCap size={32} className="text-primary-600" />
          <span className="text-xl font-bold text-primary-800">EduCare Center</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'text-primary-700 font-medium'
                        : `${isScrolled ? 'text-gray-700' : 'text-gray-800'} hover:text-primary-600`
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
          <NavLink to="/account" className="btn btn-primary ml-2">
            Tài khoản học viên
          </NavLink>
        </div>

        {/* Mobile Navigation Button */}
        <button
          className="inline-flex items-center p-2 ml-3 md:hidden"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <X size={24} className="text-primary-700" />
          ) : (
            <Menu size={24} className={`${isScrolled ? 'text-gray-700' : 'text-gray-800'}`} />
          )}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`fixed inset-0 top-[60px] z-40 bg-white transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
      >
        <div className="container py-5">
          <ul className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  onClick={toggleMenu}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary-50 text-primary-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink
                to="/account"
                onClick={toggleMenu}
                className="block px-4 py-3 mt-2 font-medium text-white rounded-lg bg-primary-600 hover:bg-primary-700"
              >
                Tài khoản học viên
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;