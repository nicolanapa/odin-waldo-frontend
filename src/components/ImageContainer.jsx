import { useRef, useState } from "react";
import DropdownMenu from "./DropdownMenu";
import TargetBox from "./TargetBox";
import PropTypes from "prop-types";
import checkIfAllCharactersAreFound from "../scripts/checkIfAllCharactersAreFound";
import Leaderboard from "./Leaderboard";

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

    const checkAndSendScoreToLeaderboard = async (checkPositionJwt) => {
        if (checkPositionJwt === null || checkPositionJwt === undefined) {
            return;
        }

        if (checkIfAllCharactersAreFound(characters)) {
            if (nameRef.current) return;

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
                        Authorization: "Bearer " + checkPositionJwt,
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
            } while (nameRef.current.length < 2 || nameRef.current.length > 32);

            const finalResponse = await fetch(
                import.meta.env.VITE_FULL_HOSTNAME +
                    "/photo/" +
                    image.id +
                    "/confirm/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + newJwt.jwt,
                    },
                    body: JSON.stringify({ name: nameRef.current }),
                }
            ).then((res) => res);

            if (finalResponse.ok) {
                return <Leaderboard postId={image.id} />;
            } else {
                alert("Something's wrong, please retry.");
            }
        }
    };

    return (
        <>
            {showDropdownMenu && (
                <DropdownMenu
                    jwt={jwt}
                    postId={image.id}
                    coordinates={coordinates}
                    characters={{ characters, setCharacters }}
                    updateLeaderboard={checkAndSendScoreToLeaderboard}
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
