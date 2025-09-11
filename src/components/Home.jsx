import { useState } from "react";
import DropdownMenu from "./DropdownMenu";

function Home() {
    const [showDropdownMenu, setShowDropdownMenu] = useState(false);

    const toggleDropdownMenu = () => {
        setShowDropdownMenu(!showDropdownMenu);
    };

    return (
        <main>
            {showDropdownMenu && <DropdownMenu />}

            <div className="image-container">
                <img
                    src="https://cdn.pixabay.com/photo/2025/08/12/11/55/mallards-9770059_1280.jpg"
                    alt="Test Photo"
                    width="90%"
                    height="auto"
                    onClick={toggleDropdownMenu}
                />
            </div>
        </main>
    );
}

export default Home;
