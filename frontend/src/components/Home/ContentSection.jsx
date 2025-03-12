import PropTypes from "prop-types";

/**
 * Content Section Component
 * A content section component that is displayed on the homepage and contains various text and images that are passed as props.
 * 
 * @param {string} image - The path to the image to be used.
 * @param {string} heading - The heading that is displayed for the section.
 * @param {string} text - The text of the section.
 * @param {boolean} reverse -  The prop that changes where the image is, left or right side. Can be true or false.
 * @param {string} id - The id for scrolling.
 * @returns {JSX.Element} The rendered content section.
 */
const ContentSection = ({ image, heading, text, reverse, id}) => (
    <section id={id}>
        <div className="container px-5">
            <div className={`row gx-5 align-items-center ${reverse ? 'flex-row-reverse' : ''}`}>
                <div className="col-lg-6">
                    <div className="p-5">
                        <img className="img-fluid rounded-circle" src={image} alt="..." />
                    </div>
                    </div>
                    <div className="col-lg-6">
                    <div className="p-5">
                        <h2 className="display-4">{heading}</h2>
                        <p>{text}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

ContentSection.propTypes = {
    image: PropTypes.string.isRequired,
    heading: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    reverse: PropTypes.bool.isRequired,
    id: PropTypes.string,
  };
  

export default ContentSection;