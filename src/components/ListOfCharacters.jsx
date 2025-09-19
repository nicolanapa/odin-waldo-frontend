import PropTypes from "prop-types";

function ListOfCharacters({ characters, checkPosition }) {
    return (
        <>
            {characters && (
                <ul className="list-characters">
                    {characters.map((character) => (
                        <li key={character.id}>
                            <button onClick={() => checkPosition(character.id)}>
                                {character.name}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}

ListOfCharacters.propTypes = {
    characters: PropTypes.arrayOf({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
    checkPosition: PropTypes.func.isRequired,
};

export default ListOfCharacters;
