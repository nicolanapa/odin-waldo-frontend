class JwtHandler {
    async getNewJwt(currentImage = null, photo = null) {
        if (currentImage?.id || photo?.id) {
            const jwt = await fetch(
                import.meta.env.VITE_FULL_HOSTNAME +
                    "/photo/" +
                    (currentImage?.id ?? photo.id) +
                    "/start",
                { method: "POST" }
            ).then((res) => res.json());

            console.log(jwt.jwt);

            return jwt.jwt;
        }

        return "";
    }
}

export default new JwtHandler();
