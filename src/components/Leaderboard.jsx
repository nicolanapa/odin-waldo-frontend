import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import "../styles/leaderboard.css";

function Leaderboard({ postId }) {
    const [leaderboard, setLeaderboard] = useState([{}]);

    useEffect(
        () => async () => {
            const getLeaderboard = await fetch(
                import.meta.env.VITE_FULL_HOSTNAME +
                    "/photo/" +
                    postId +
                    "/leaderboard/"
            ).then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return false;
                }
            });

            // The front-end orders the leaderboard instead
            // of the API (doesn't really change things)

            if (getLeaderboard && getLeaderboard.length !== 0) {
                let orderedLeaderboard = [];
                let scores = [];

                for (let i = 0; i < getLeaderboard.length; i++) {
                    scores.push(getLeaderboard[i].score);
                }

                for (let i = 0; i < scores.length; i++) {
                    for (let i2 = i + 1; i2 < scores.length; i2++) {
                        if (scores[i] > scores[i2]) {
                            let tempValue = scores[i];

                            scores[i] = scores[i2];
                            scores[i2] = tempValue;
                        }
                    }
                }

                for (let i = 0; i < scores.length; i++) {
                    for (let i2 = 0; i2 < scores.length; i2++) {
                        if (scores[i] === getLeaderboard[i2].score) {
                            orderedLeaderboard.push(getLeaderboard[i2]);

                            break;
                        }
                    }
                }

                setLeaderboard(orderedLeaderboard);
            }
        },
        []
    );

    return (
        <>
            <div className="leaderboard-container">
                <a href="./">
                    <button className="return-button">Return</button>
                </a>

                <h1>Leaderboard of photo {postId}</h1>
                {leaderboard.length !== 0 && (
                    <ol className="leaderboard">
                        {leaderboard.map((score) => {
                            const uuid = crypto.randomUUID();

                            return (
                                <li key={uuid}>
                                    <div>
                                        <p>
                                            <b>{score.user}</b>
                                        </p>
                                        <p>{score.score} seconds</p>
                                    </div>
                                </li>
                            );
                        })}
                    </ol>
                )}
            </div>
        </>
    );
}

Leaderboard.protTypes = {
    postId: PropTypes.number.isRequired,
};

export default Leaderboard;
