import { useEffect, useRef, useState } from "react";
import DropdownMenu from "./DropdownMenu";
import TargetBox from "./TargetBox";
import PropTypes from "prop-types";
import checkIfAllCharactersAreFound from "../scripts/checkIfAllCharactersAreFound";

function ImageContainer({ image, jwt }) {
    const [showTargetBox, setShowTargetBox] = useState(false);
    const [showDropdownMenu, setShowDropdownMenu] = useState(false);
    const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
    const [characters, setCharacters] = useState(image.characters);
    const nameRef = useRef("");

    const toggleBoxAndMenu = (e) => {
        setShowTargetBox(!showTargetBox);
        setShowDropdownMenu(!showDropdownMenu);

        console.log(e);
        setCoordinates({ x: e.pageX, y: e.pageY });
    };

    // console.log(image);

    useEffect(
        () => async () => {
            if (checkIfAllCharactersAreFound(characters)) {
                if (nameRef.current) return;

                setTimeout(() => {}, 1000);

                let response = {};
                const newJwt = await fetch(
                    import.meta.env.VITE_FULL_HOSTNAME +
                        "/photo/" +
                        image.id +
                        "/end/",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + jwt.jwt,
                        },
                    }
                ).then((res) => {
                    response = res;
                    return res.json();
                });

                if (response.ok) {
                    jwt.setJwt(newJwt.jwt);
                } else {
                    return;
                }

                do {
                    nameRef.current =
                        window.prompt("Enter your name:", "anon") ?? "anon";
                } while (
                    nameRef.current.length < 2 ||
                    nameRef.current.length > 32
                );

                const finalResponse = await fetch(
                    import.meta.env.VITE_FULL_HOSTNAME +
                        "/photo/" +
                        image.id +
                        "/confirm/",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + jwt.jwt,
                        },
                        body: JSON.stringify({ name: nameRef.current }),
                    }
                ).then((res) => res);

                if (finalResponse.ok) {
                    // Show leaderboard
                } else {
                    alert("Something's wrong, please retry.");
                }
            }
        },
        [jwt.jwt, characters]
    );

    return (
        <>
            {showDropdownMenu && (
                <DropdownMenu
                    jwt={jwt}
                    postId={image.id}
                    coordinates={coordinates}
                    characters={{ characters, setCharacters }}
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
                    width="100%"
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
