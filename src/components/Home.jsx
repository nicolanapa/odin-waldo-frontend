import { useState } from "react";
import DropdownMenu from "./DropdownMenu";
import TargetBox from "./TargetBox";

function Home() {
    const [showTargetBox, setShowTargetBox] = useState(false);
    const [showDropdownMenu, setShowDropdownMenu] = useState(false);
    const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

    const toggleBoxAndMenu = (e) => {
        setShowTargetBox(!showTargetBox);
        setShowDropdownMenu(!showDropdownMenu);

        console.log(e);
        setCoordinates({ x: e.pageX, y: e.pageY });
    };

    return (
        <main>
            {showDropdownMenu && <DropdownMenu />}

            {showTargetBox && (
                <TargetBox
                    coordinates={coordinates}
                    toggleBoxAndMenu={toggleBoxAndMenu}
                />
            )}

            <div className="image-container">
                <img
                    src="https://cdn.pixabay.com/photo/2025/08/12/11/55/mallards-9770059_1280.jpg"
                    alt="Test Photo"
                    width="90%"
                    height="auto"
                    onClick={toggleBoxAndMenu}
                />
            </div>
        </main>
    );
}

export default Home;
