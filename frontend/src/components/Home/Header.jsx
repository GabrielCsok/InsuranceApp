import '../../../public/css/insurance.css';

/**
 * Header Component
 * Renders a Header element on the homepage.
 * 
 * @returns {JSX.Element} Header element for the homepage
 */
const Header = () => (
  <header 
    className="masthead text-center text-white position-relative d-flex align-items-center"
    style={{ 
      backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(/public/img/header.png)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center 30%',
      backgroundRepeat: 'no-repeat',
      height: '70vh', // Reduced height
      minHeight: '400px' // Minimum height for smaller screens
    }}>
    
    {/* Blur overlay */}
    <div 
      className="position-absolute top-0 start-0 end-0 bottom-0"
      style={{
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)'
      }}
    />

    <div className="masthead-content position-relative z-2 container">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h1 className="display-4 fw-bold mb-4">Welcome to Evergreen Insurance</h1>
          <h2 className="lead fs-3 mb-5">Protecting Your Future with Confidence</h2>
          <a className="btn custom-submit-button btn-lg rounded-pill px-4 py-3" href="#scroll">
            Learn More
          </a>
        </div>
      </div>
    </div>
  </header>
);

export default Header;