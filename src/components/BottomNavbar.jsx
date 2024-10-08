import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { House, Compass, MessageCircle, Users } from 'lucide-react';

function BottomNavbar({ show, hideOnRoutes = [] }) {
  const Menus = [
    { name: "Home", icon: <House />, activeIcon: <House className="text-white" />, path: "/home" },
    { name: "Discovery", icon: <Compass />, activeIcon: <Compass className="text-white" />, path: "/discover" },
    { name: "Message", icon: <img src='https://upload.wikimedia.org/wikipedia/commons/9/98/Color_circle_%28RGB%29.png' className='rounded-full '  width={30} />, activeIcon: <img src='https://upload.wikimedia.org/wikipedia/commons/9/98/Color_circle_%28RGB%29.png' className='rounded-full bg-white '  width={30} />, path: "/spin" },
    { name: "Photos", icon: <Users />, activeIcon: <Users className="text-white" />, path: "/groups" },
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
  const shouldShowNavbar = !hideOnRoutes.includes(location.pathname);

  return (
    <>
      {show && shouldShowNavbar && (
        <div className="bottom-nav bg-white w-full shadow px-3 py-3 rounded-full lg:hidden absolute md:hidden bottom-3">
          <ul className="flex justify-between items-center m-0 p-0 list-none relative rounded-lg">
            <span
              className="bg-red-600 border absolute rounded-full flex justify-center items-center active-indicator"
              style={{ transform: `translateX(calc(${active * 4}rem - 0.5rem))`, transition: 'transform 0.5s' }}
            ></span>

            {Menus.map((menu, i) => (
              <li key={i} className="flex text-sm flex-col justify-center items-center">
                <a
                  href={menu.path}
                  className="flex flex-col text-center text-[#6d3c65] items-center"
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
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default BottomNavbar;
