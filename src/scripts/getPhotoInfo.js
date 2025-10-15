async function getPhotoInfo(id) {
    const photo = await fetch(
        import.meta.env.VITE_FULL_HOSTNAME + "/photo/" + id
    ).then((res) => res.json());

    // console.log(photo);

    return photo;
}

export default getPhotoInfo;
