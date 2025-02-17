import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import SidebarItem from './SidebarItem';

const Sidebar = () => {
  const { user } = useAuth();
  
  // Navigation config based on user role
  const navItems = [
    { 
      type: 'item',
      icon: 'fa-tachometer-alt',
      text: 'Dashboard',
      path: '/dashboard',
      roles: ['admin', 'user']
    },
    {
      type: 'collapse',
      icon: 'fa-shield',
      text: 'Insurance',
      roles: ['admin'],
      subItems: [
        { text: 'Users', path: '/dashboard/users' }, // Full path
        { text: 'Insurances', path: '/dashboard/insurances' }
      ]
    },
    {
      type: 'collapse',
      icon: 'fa-shield',
      text: 'Insurance',
      roles: ['user'],
      subItems: [
        { text: 'File for new insurance', path: '/dashboard/new-insurance' },
        { text: 'My Insurances', path: '/dashboard/my-insurances' }
      ]
    }

  ];

  return (
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion">
      {/* Brand Logo */}
      <div className="sidebar-brand d-flex align-items-center justify-content-center">
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-laugh-wink"></i>
        </div>
        <div className="sidebar-brand-text mx-3">Evergreen Insurance</div>
      </div>

      <hr className="sidebar-divider my-0" />

      {navItems.map((item, index) => (
        item.roles.includes(user.role.toLowerCase()) && (
          <SidebarItem key={index} item={item} />
        )
      ))}
    </ul>
  );
};

export default Sidebar;