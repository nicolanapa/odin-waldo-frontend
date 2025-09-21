import ListOfCharacters from "./ListOfCharacters";
import "../styles/boxMenu.css";
import PropTypes from "prop-types";
import JwtHandler from "../scripts/JwtHandler";
import { useState } from "react";

function DropdownMenu({ jwt, postId, coordinates, characters = [] }) {
    const [stateCharacters, setStateCharacters] = useState(characters);

    const checkPosition = async (characterId) => {
        const res = await JwtHandler.checkPosition(
            jwt.jwt,
            postId,
            characterId,
            coordinates.x /*keep in mind image centering*/,
            coordinates.y /*keep in mind image centering*/
        );

        if (res.result) {
            for (let i = 0; i < characters.length; i++) {
                if (characters[i].id === characterId) {
                    characters[i].found = true;
                    setStateCharacters([...characters]);

                    break;
                }
            }
        }
    };

    return (
        <div className="dropdown-menu">
            <ListOfCharacters
                characters={stateCharacters}
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
