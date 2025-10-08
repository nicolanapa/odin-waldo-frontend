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
            // of the API

            if (getLeaderboard && getLeaderboard.length !== 0) {
                let orderedLeaderboard = [];
                let scores = [];

                for (let i = 0; i < getLeaderboard.length; i++) {
                    scores.push(getLeaderboard[i].score);
                }

                console.log("scores", scores);

                for (let i = 0; i < scores.length; i++) {
                    for (let i2 = i + 1; i2 < scores.length - 1; i2++) {
                        if (scores[i] > scores[i2]) {
                            let tempValue = scores[i];

                            scores[i] = scores[i2];
                            scores[i2] = tempValue;
                        }
                    }

                    /* Last score in the array doesn't get ordered
                    if (i === scores.length - 1) {
                        for (let i2 = i; i2 >= 0; i2--) {
                            if (scores[i] > scores[i2]) {
                                let tempValue = scores[i];

                                scores[i] = scores[i2];
                                scores[i2] = tempValue;
                            }
                        }
                    }*/
                }

                console.log("scores2", scores);

                for (let i = 0; i < scores.length; i++) {
                    for (let i2 = 0; i2 < scores.length; i2++) {
                        if (scores[i] === getLeaderboard[i2].score) {
                            orderedLeaderboard.push(getLeaderboard[i2]);

                            break;
                        }
                    }
                }

                //
                let temp = [];
                for (let i = 0; i < getLeaderboard.length; i++) {
                    temp.push(getLeaderboard[i].score);
                }
                let temp2 = [];
                for (let i = 0; i < orderedLeaderboard.length; i++) {
                    temp2.push(orderedLeaderboard[i].score);
                }

                console.log("unordered", temp, "ordered", temp2);
                console.log(getLeaderboard.length, orderedLeaderboard.length);
                setLeaderboard(orderedLeaderboard);
            }
        },
        []
    );

    return (
        <>
            <div className="leaderboard-container">
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
