import { useState } from "react";
import DropdownMenu from "./DropdownMenu";
import TargetBox from "./TargetBox";
import PropTypes from "prop-types";

function ImageContainer({ image, jwt }) {
    const [showTargetBox, setShowTargetBox] = useState(false);
    const [showDropdownMenu, setShowDropdownMenu] = useState(false);
    const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

    const toggleBoxAndMenu = (e) => {
        setShowTargetBox(!showTargetBox);
        setShowDropdownMenu(!showDropdownMenu);

        console.log(e);
        setCoordinates({ x: e.pageX, y: e.pageY });
    };

    console.log(image);

    return (
        <>
            {showDropdownMenu && (
                <DropdownMenu
                    jwt={jwt}
                    postId={image.id}
                    coordinates={coordinates}
                    characters={image.characters}
                />
            )}

            {showTargetBox && (
                <TargetBox
                    coordinates={coordinates}
                    toggleBoxAndMenu={toggleBoxAndMenu}
                />
            )}

            <div className="image-container">
                {/* Handle when a Image it's too wide or tall */}
                <img
                    src={image.link}
                    alt="Test Photo"
                    width="90%"
                    height="auto"
                    onClick={toggleBoxAndMenu}
                />
            </div>
        </>
    );
}

ImageContainer.propTypes = {
    image: PropTypes.objectOf({
        id: PropTypes.number.isRequired,
        link: PropTypes.string.isRequired,
        characters: PropTypes.array.isRequired,
    }).isRequired,
    jwt: PropTypes.objectOf({
        jwt: PropTypes.string.isRequired,
        setJwt: PropTypes.func.isRequired,
    }).isRequired,
};

export default ImageContainer;
