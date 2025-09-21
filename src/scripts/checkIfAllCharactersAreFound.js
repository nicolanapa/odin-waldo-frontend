function checkIfAllCharactersAreFound(characters) {
    for (let i = 0; i < characters.length; i++) {
        if (characters[i]?.found !== true) {
            return false;
        }
    }

    return true;
}

export default checkIfAllCharactersAreFound;
