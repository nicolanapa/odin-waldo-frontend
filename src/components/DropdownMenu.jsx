import ListOfCharacters from "./ListOfCharacters";
import "../styles/boxMenu.css";
import PropTypes from "prop-types";
import JwtHandler from "../scripts/JwtHandler";

function DropdownMenu({ jwt, postId, coordinates, characters }) {
    const checkPosition = async (characterId) => {
        const res = await JwtHandler.checkPosition(
            jwt.jwt,
            postId,
            characterId,
            coordinates.x /*keep in mind image centering*/,
            coordinates.y /*keep in mind image centering*/
        );

        if (res.result) {
            for (let i = 0; i < characters.characters.length; i++) {
                if (
                    characters.characters[i].id === characterId &&
                    characters.characters[i]?.found !== true
                ) {
                    let tempCharacters = [...characters.characters];
                    tempCharacters[i].found = true;

                    characters.setCharacters([...characters.characters]);
                    jwt.setJwt(res.jwt);

                    break;
                }
            }
        }
    };

    return (
        <div className="dropdown-menu">
            <ListOfCharacters
                characters={characters.characters}
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
    characters: PropTypes.objectOf({
        characters: PropTypes.arrayOf({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
        }).isRequired,
        setCharacters: PropTypes.func.isRequired,
    }).isRequired,
};

export default DropdownMenu;
