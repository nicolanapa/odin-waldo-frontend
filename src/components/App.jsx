import { useEffect, useState } from "react";
import ImageContainer from "./ImageContainer";
import getPhotoInfo from "../scripts/getPhotoInfo";
import jwtHandler from "../scripts/JwtHandler";

function App() {
    const [photoIDs, setPhotoIDs] = useState([]);
    const [currentImage, setCurrentImage] = useState(false);
    const [jwt, setJwt] = useState("");

    useEffect(
        () => async () => {
            const photoIDsArray = await fetch(
                import.meta.env.VITE_FULL_HOSTNAME + "/photo/"
            ).then((res) => res.json());

            setPhotoIDs(photoIDsArray);

            const randomPhotoId = Math.floor(
                Math.random() * photoIDsArray.length
            );

            const photo = await getPhotoInfo(photoIDsArray[randomPhotoId]);
            setCurrentImage(photo);
            //setJwt(await jwtHandler.getNewJwt(photo));
        },
        []
    );

    /*useEffect(
        () => async () => {
            currentImage !== false ? setJwt(await getNewJwt()) : "";
        },
        [currentImage]
    );*/

    setInterval(() => jwtHandler.getNewJwt(currentImage), 450000);

    // TODO: Automatically change an Image when it's finished

    return (
        <main>
            {photoIDs.length !== 0
                ? currentImage && (
                      <ImageContainer
                          image={currentImage}
                          jwt={{ jwt: jwt, setJwt: setJwt }}
                      />
                  )
                : "No Image Available"}
        </main>
    );
}

export default App;
