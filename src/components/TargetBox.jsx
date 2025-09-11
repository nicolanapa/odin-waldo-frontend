import PropTypes from "prop-types";

function TargetBox({ coordinates, toggleBoxAndMenu }) {
    return (
        <img
            src="/icons/targetBox.svg"
            alt="Target Box"
            className="target-box"
            style={{
                top: coordinates.y - 16,
                left: coordinates.x - 16,
            }}
            onClick={toggleBoxAndMenu}
        />
    );
}

TargetBox.propTypes = {
    coordinates: PropTypes.exact({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
    }),
    toggleBoxAndMenu: PropTypes.func.isRequired,
};

export default TargetBox;
