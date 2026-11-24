import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { House, Compass, MessageCircle, Users, Sparkles } from 'lucide-react';

function BottomNavbar({ show, hideOnRoutes = [] }) {
  const Menus = [
    { name: "Home", icon: <House />, activeIcon: <House className="text-white" />, path: "/home" },
    { name: "Discovery", icon: <Compass />, activeIcon: <Compass className="text-white" />, path: "/discover" },
    { name: "Spin", icon: <Sparkles />, activeIcon: <Sparkles className="text-white" />, path: "/spin" },
    { name: "Groups", icon: <Users />, activeIcon: <Users className="text-white" />, path: "/groups" },
    { name: "Chat", icon: <MessageCircle />, activeIcon: <MessageCircle className="text-white" />, path: "/message" },
  ];

  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    const activeIndex = Menus.findIndex(menu => menu.path === currentPath);
    setActive(activeIndex !== -1 ? activeIndex : 0);
  }, [location.pathname]);

  // Check if the current route is in the hideOnRoutes array
  const shouldShowNavbar = !hideOnRoutes.some(
    (r) => location.pathname === r || location.pathname.startsWith(r + '/')
  );

  return (
    <>
      {show && shouldShowNavbar && (
        <div className="bottom-nav bg-white shadow-lg px-3 py-2 rounded-full lg:hidden md:hidden fixed bottom-3 left-1/2 -translate-x-1/2 w-[calc(100%-1.5rem)] max-w-md z-40">
          <ul className="flex justify-between items-center m-0 p-0 list-none relative rounded-lg">
            {Menus.map((menu, i) => (
              <li key={i} className="flex text-sm flex-col justify-center items-center">
                <Link
                  to={menu.path}
                  className="flex flex-col text-center text-[#6d3c65] items-center"
                  aria-label={menu.name}
                  onClick={(e) => {
                    e.preventDefault();
                    setActive(i);
                    navigate(menu.path);
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <span
                    className={`text-xl ${i === active ? "text-white bg-[#dd88cf] px-3 py-3 " : "px-3 py-3 "}`}
                    style={{ borderRadius: "100%" }}
                  >
                    {i === active ? menu.activeIcon : menu.icon}
                  </span>
                  <span
                    className={`${active === i ? "opacity-100" : "opacity-0"}`}
                    style={{ transition: '0.7s', transform: active === i ? 'translateY(-0.25rem)' : 'translateY(0.625rem)' }}
                  >
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default BottomNavbar;
