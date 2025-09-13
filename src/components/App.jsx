import { useEffect, useState } from "react";
import ImageContainer from "./ImageContainer";
import getPhotoInfo from "../scripts/getPhotoInfo";

function App() {
    const [photoIDs, setPhotoIDs] = useState([]);
    const [currentImage, setCurrentImage] = useState(false);

    useEffect(
        () => async () => {
            const photoIDsArray = await fetch(
                import.meta.env.VITE_FULL_HOSTNAME + "/photo/"
            ).then((res) => res.json());

            setPhotoIDs(photoIDsArray);

            const randomPhotoId = Math.floor(
                Math.random() * photoIDsArray.length
            );

            setCurrentImage(await getPhotoInfo(photoIDsArray[randomPhotoId]));
        },
        []
    );

    // TODO: Automatically change an Image when it's finished

    return (
        <main>
            {photoIDs.length !== 0
                ? currentImage && <ImageContainer image={currentImage} />
                : "No Image Available"}
        </main>
    );
}

export default App;
