import React, { useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import Collapse from 'bootstrap/js/dist/collapse';

const SidebarItem = ({ item }) => {
  const location = useLocation();

  useEffect(() => {
    if (item.type === 'collapse') {
      const collapseId = `collapse-${item.text.replace(/\s+/g, '-')}`;
      const collapseElement = document.getElementById(collapseId);
      if (collapseElement && collapseElement.classList.contains('show')) { 
        let bsCollapse = Collapse.getInstance(collapseElement);
        if (!bsCollapse) {
          bsCollapse = new Collapse(collapseElement);
        }
        bsCollapse.hide();
      }
    }
  }, [location, item.type, item.text]);

  if (item.type === 'collapse') {
    return (
      <li className="nav-item">
        <a
          className="nav-link collapsed"
          href="#!"
          data-bs-toggle="collapse"
          data-bs-target={`#collapse-${item.text.replace(/\s+/g, '-')}`}
          aria-expanded="false"
        >
          <i className={`bi ${item.icon} me-2`}></i>
          <span>{item.text}</span>
        </a>
        <div
          id={`collapse-${item.text.replace(/\s+/g, '-')}`}
          className="collapse"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            {item.subItems.map((subItem, idx) => (
              <Link key={idx} className="collapse-item" to={subItem.path}>
                {subItem.text}
              </Link>
            ))}
          </div>
        </div>
      </li>
    );
  }

  return (
    <li className="nav-item">
      <NavLink
        to={item.path}
        className={({ isActive }) =>
          "nav-link" + (isActive ? " active" : "")
        }
      >
        <i className={`bi ${item.icon} me-2`}></i>
        <span>{item.text}</span>
      </NavLink>
    </li>
  );
};

export default SidebarItem;