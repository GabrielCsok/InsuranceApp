import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import SidebarItem from './SidebarItem';
import '../../../public/css/insurance.css';
import logo from '../../../public/img/logo.png';

const Sidebar = () => {
  const { user } = useAuth();
  
  // Navigation config based on user role
  const navItems = [
    { 
      type: 'item',
      icon: 'bi-briefcase-fill',
      text: 'Dashboard',
      path: '/dashboard',
      roles: ['admin', 'user']
    },
    {
      type: 'collapse',
      icon: 'bi-shield-lock',
      text: 'Insurance',
      roles: ['admin'],
      subItems: [
        { text: 'Users', path: '/dashboard/users' },
        { text: 'Insurances', path: '/dashboard/insurances' }
      ]
    },
    {
      type: 'collapse',
      icon: 'bi-shield-lock',
      text: 'Insurance',
      roles: ['user'],
      subItems: [
        { text: 'File for new insurance', path: '/dashboard/new-insurance' },
        { text: 'My Insurances', path: '/dashboard/my-insurances' }
      ]
    }
  ];

  return (
    // The collapse container, with no forced display on small screens.
    <div className="collapse" id="sidebarCollapse">
      <ul className="navbar-nav sidebar accordion custom-sidebar">
        {/* Brand Logo */}
        <div className="sidebar-brand d-flex align-items-center justify-content-center">
          <div className="sidebar-brand-icon">
            <img src={logo} alt="Insurance Logo" className="sidebar-logo" />
          </div>
          <div className="sidebar-brand-text mx-3">Evergreen Insurance</div>
        </div>

        <hr className="sidebar-divider my-0" />

        {navItems.map((item, index) =>
          item.roles.includes(user.role.toLowerCase()) && (
            <SidebarItem key={index} item={item} />
          )
        )}
      </ul>
    </div>
  );
};

export default Sidebar;