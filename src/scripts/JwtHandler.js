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

    async checkPosition(jwt, postId, characterId, horizontal, vertical) {
        const result = await fetch(
            import.meta.env.VITE_FULL_HOSTNAME +
                "/photo/" +
                postId +
                "/checkPosition/" +
                characterId,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + jwt,
                },
                body: JSON.stringify({
                    horizontal,
                    vertical,
                }),
            }
        ).then((res) => res.json());

        console.log(horizontal, vertical, result);

        return { jwt: result?.jwt ?? "", result: result.result };
    }
}

export default new JwtHandler();
