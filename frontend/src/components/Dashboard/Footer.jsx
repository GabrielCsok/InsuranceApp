/**
 * Footer Component
 * Renders a footer for the page with branding
 * @returns {JSX.Element} The rendered footer
 */
const Footer = () => {
    return (
      <footer className="sticky-footer bg-white">
        <div className="container my-auto">
          <div className="copyright text-center my-auto">
            <span>Copyright &copy; Evergreen Insurance {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;