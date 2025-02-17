import { NavLink } from 'react-router-dom';

const SidebarItem = ({ item }) => {
  if (item.type === 'collapse') {
    return (
      <li className="nav-item">
        <a className="nav-link collapsed" href={`#collapse${item.text}`} data-toggle="collapse">
          <i className={`fas fa-fw fa-${item.icon}`}></i>
          <span>{item.text}</span>
        </a>
        <div id={`collapse${item.text}`} className="collapse">
          <div className="bg-white py-2 collapse-inner rounded">
            {item.subItems.map((subItem, index) => (
              <NavLink 
                key={index}
                to={subItem.path}
                className="collapse-item"
              >
                {subItem.text}
              </NavLink>
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
        className={({ isActive}) => "nav-link" + (isActive ? " active" : "")}
      >
        <i className={`fas fa-fw fa-${item.icon}`}></i>
        <span>{item.text}</span>
      </NavLink>
    </li>
  );
};

export default SidebarItem;