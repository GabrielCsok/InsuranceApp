import PropTypes from "prop-types";

/**
 * Stat Card Component
 * A card component that is displayed on the dashboard and contains various statistics that are passed as props.
 * 
 * @param {string} title - The title of the card.
 * @param {number} value - The number displayed as a statistic.
 * @param {string} icon - The icon for the stat card.
 * @param {string} color -  The color of the card.
 * @returns {JSX.Element} The rendered stat card.
 */
const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className="col-xl-3 col-md-6 col-sm-12 mb-4"> {/* Now stacks properly on mobile */}
      <div className={`card border-left-${color} shadow h-100 py-2`}>
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <div className={`text-xs font-weight-bold text-${color} text-uppercase mb-1`}>
                {title}
              </div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">{value}</div>
            </div>
            <div className="col-auto">
              <i className={`fas ${icon} fa-2x text-gray-300`}></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  icon: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default StatCard;