import { Typography } from "@mui/material";
import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { jwtDecode } from "jwt-decode";
import "./GameOver.css"
import Score from "./Score";


export default function GameOver(props){

    const [userId, setUserId] = useState(null);
    const [userBestScore, setUserBestScore] = useState()

    let isHighscoreBeaten = false;
    let isHighscoreTied = false;

    if(props.score > props.highscore){
        isHighscoreBeaten = true
    }
    if(props.score === props.highscore){
        isHighscoreTied = true
    }

    //get user id
    useEffect(() => {

        const jwt = localStorage.getItem("jwt");
        if (jwt) {
            const decodedToken = jwtDecode(jwt);
            setUserId(parseInt(decodedToken.sub));
        }
    }, []);

    

    return <>
    {isHighscoreBeaten && <Confetti className="confetti" width={window.innerWidth} height={window.innerHeight}/>}
        <div className="score-page">
            {isHighscoreBeaten && <Typography fontSize={36}>You beat your highscore!</Typography>}
            {isHighscoreTied && <Typography fontSize={36}>So close... You tied your highscore!</Typography>}
            <Score data={{currScore:props.score,highscore:props.highscore}} />
        </div>
        </>
}
