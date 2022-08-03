import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useLogout from '../../hooks/useLogout';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import avatar from '../../assets/avatar.png';
import { sidebarItems } from '../../listItems/common/sidebarItems';
import { MdOutlineLogout } from 'react-icons/md';

const Sidebar = ({ className }) => {
  const { auth } = useAuth();
  const logout = useLogout();

  const location = useLocation();
  const navigate = useNavigate();

  const [activeMenu, setActiveMenu] = useState();

  useEffect(() => {
    sidebarItems.forEach((item) => {
      if (item.link === location.pathname) {
        return setActiveMenu(item.id);
      }
      item.children &&
        item.children.forEach((subItem) => {
          if (subItem.link === location.pathname) {
            return setActiveMenu(subItem.id);
          }
        });
    });
  }, [location.pathname]);

  const logoutHandler = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div
      className={`${className} py-4 px-2 space-y-7 border-r border-gray-200`}
    >
      {/* logo */}

      <Link to='/'>
        <div className='flex items-center gap-2'>
          <img src={logo} alt='logo' className='w-8 h-8' />
          <h1 className='font-bold text-2xl mb-0 text-purple-600 font-inter tracking-tight'>
            meraRetail
          </h1>
        </div>
      </Link>

      {/* logo ends */}
      {/* menu section */}
      <ul className='space-y-1'>
        {sidebarItems.map((item, index) => (
          <li key={index}>
            <Link
              to={item.link}
              onClick={() => setActiveMenu(item.id)}
              className={`block w-full rounded px-2 py-1 hover:bg-purple-50
              ${
                parseInt(activeMenu) === parseInt(item.id) &&
                'bg-purple-100 font-bold'
              }`}
            >
              {item.text}
            </Link>
            <ul
              className={`ml-4 border-l ${
                parseInt(activeMenu) === parseInt(item.id) ? 'block' : 'hidden'
              }`}
            >
              {item.children &&
                item.children.map((child, childIndex) => (
                  <li
                    key={childIndex}
                    className='text-sm ml-4 text-gray-500 first:mt-1'
                  >
                    <Link
                      to={child.link}
                      onClick={() => setActiveMenu(child.id)}
                      className={`block w-full rounded hover:bg-gray-100 px-2 py-0.5 ${
                        (activeMenu === child.id ||
                          child.link === location.pathname) &&
                        'font-bold text-purpleDark group-hover:visible'
                      }`}
                    >
                      {child.text}
                    </Link>
                  </li>
                ))}
            </ul>
          </li>
        ))}
      </ul>
      {/* menu section ends */}
      {/* bottom section */}
      <div className='border-t absolute bottom-0 left-3 pb-4'>
        {auth?.user && (
          <div className='mt-2'>
            <div className='flex items-center gap-2'>
              <img
                src={auth?.user?.avatar || avatar}
                alt='avatar'
                className='w-10 h-10 rounded-full'
              />

              <h4 className='m-0'>Welcome, {auth?.user?.firstName}</h4>
            </div>
            <div>
              <button
                onClick={logoutHandler}
                className='bg-white text-gray-500 font-semibold font-inter py-1
                            rounded-lg flex items-center hover:bg-gray-100 w-full'
              >
                <div className='flex items-center tracking-wide pl-12 w-full'>
                  <MdOutlineLogout className='w-4 h-4 mr-2' />
                  <span>Logout</span>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
      {/* bottom section ends */}
    </div>
  );
};

export default Sidebar;
