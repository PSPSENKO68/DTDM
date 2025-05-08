import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, GraduationCap, User, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
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

  // Kiểm tra trạng thái đăng nhập
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setIsLoggedIn(true);
        setUserEmail(data.session.user.email || null);
      } else {
        setIsLoggedIn(false);
        setUserEmail(null);
      }
    };

    checkAuth();

    // Đăng ký lắng nghe sự kiện thay đổi trạng thái xác thực
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          setIsLoggedIn(true);
          setUserEmail(session.user.email || null);
        } else if (event === 'SIGNED_OUT') {
          setIsLoggedIn(false);
          setUserEmail(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsProfileDropdownOpen(false);
  };

  const navLinks = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Khóa học', path: '/courses' },
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
          
          {isLoggedIn ? (
            <div className="relative ml-2">
              <button
                onClick={toggleProfileDropdown}
                className="flex items-center gap-2 px-4 py-2 text-gray-800 hover:text-primary-600 rounded-lg border border-gray-200 hover:border-primary-200"
              >
                <User size={18} />
                <span className="max-w-[150px] truncate">{userEmail}</span>
              </button>
              
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-100">
                  <Link
                    to="/account"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-t-md"
                    onClick={() => setIsProfileDropdownOpen(false)}
                  >
                    Tài khoản
                  </Link>
                  <Link
                    to="/registration"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsProfileDropdownOpen(false)}
                  >
                    Đăng ký khóa học
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-b-md"
                  >
                    <LogOut size={16} className="mr-2" />
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2 ml-2">
              <Link to="/login" className="btn btn-outline">
                Đăng nhập
              </Link>
              <Link to="/registration" className="btn btn-primary">
                Đăng ký
              </Link>
            </div>
          )}
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
            
            {isLoggedIn ? (
              <>
                <li>
                  <NavLink
                    to="/account"
                    onClick={toggleMenu}
                    className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Tài khoản
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/registration"
                    onClick={toggleMenu}
                    className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Đăng ký khóa học
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                    className="flex items-center w-full px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    <LogOut size={16} className="mr-2" />
                    Đăng xuất
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/login"
                    onClick={toggleMenu}
                    className="block px-4 py-3 mt-2 text-center rounded-lg border border-primary-600 text-primary-600"
                  >
                    Đăng nhập
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/registration"
                    onClick={toggleMenu}
                    className="block px-4 py-3 mt-2 text-center font-medium text-white rounded-lg bg-primary-600 hover:bg-primary-700"
                  >
                    Đăng ký
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;