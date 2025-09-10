import { useState } from "react";
import TargetBox from "./TargetBox";

function Home() {
    const [showTargetBox, setShowTargetBox] = useState(false);

    const toggleTargetBox = () => {
        setShowTargetBox(!showTargetBox);
    };

    return (
        <main>
            {showTargetBox && <TargetBox />}

            <div className="image-container">
                <img
                    src="https://cdn.pixabay.com/photo/2025/08/12/11/55/mallards-9770059_1280.jpg"
                    alt="Test Photo"
                    width="90%"
                    height="auto"
                    onClick={toggleTargetBox}
                />
            </div>
        </main>
    );
}

export default Home;
