import ListOfCharacters from "./ListOfCharacters";
import "../styles/boxMenu.css";
import PropTypes from "prop-types";
import JwtHandler from "../scripts/JwtHandler";

function DropdownMenu({ jwt, postId, coordinates, characters }) {
    const checkPosition = (characterId) =>
        JwtHandler.checkPosition(
            jwt.jwt,
            postId,
            characterId,
            coordinates.x /*keep in mind image centering*/,
            coordinates.y /*keep in mind image centering*/
        );

    return (
        <div className="dropdown-menu">
            <ListOfCharacters
                characters={characters}
                checkPosition={checkPosition}
            />
        </div>
    );
}

DropdownMenu.propTypes = {
    jwt: PropTypes.objectOf({
        jwt: PropTypes.string.isRequired,
        setJwt: PropTypes.func.isRequired,
    }).isRequired,
    postId: PropTypes.number.isRequired,
    coordinates: PropTypes.exact({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
    }),
    characters: PropTypes.arrayOf({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
};

export default DropdownMenu;
