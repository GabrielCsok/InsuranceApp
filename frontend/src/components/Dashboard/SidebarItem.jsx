import { useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import Collapse from 'bootstrap/js/dist/collapse';
import PropTypes from 'prop-types';

/**
 * Sidebar Item Component
 * Used in the sidebar to render navigation items.
 * 
 * @returns {JSX.Element} a navigation item to be used in the sidebar.
 */
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

  //If the item is of type collapse, it returns a collapsible element which contain nested elements
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

SidebarItem.propTypes = {
  item: PropTypes.shape({
    type: PropTypes.oneOf(['collapse', 'item']).isRequired,
    text: PropTypes.string.isRequired,
    icon: PropTypes.string, // optional if not always provided
    path: PropTypes.string, // optional for collapse type
    subItems: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
};

export default SidebarItem;