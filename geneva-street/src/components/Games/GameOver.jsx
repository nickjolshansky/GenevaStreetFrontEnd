import { Typography } from "@mui/material";
import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import "./GameOver.css"
import { rootsrc } from "../../utils/source";


export default function GameOver(props){

    const [userId, setUserId] = useState(null);
    const [userBestScore, setUserBestScore] = useState()

    //get user id
    useEffect(() => {
        const jwt = localStorage.getItem("jwt");
        if (jwt) {
            const decodedToken = jwtDecode(jwt);
            setUserId(parseInt(decodedToken.sub));
        }
    }, []);

    //middle of working on this one, make sure the responses is an array, and you loop for which game you want.

    // useEffect(() => {
    //     fetch(rootsrc + "/scores/person/" + userId)
    //     .then((response) => response.json())
    //     .then({response} => {
    //         response.forEach(game => {
                
    //         });
    //     })
    // },[])

    return <div className="score-page">
        <Confetti/>
        <Typography fontSize={36}>Final Score:</Typography>
        <Typography fontSize={24}>{props.score}</Typography>
    </div>
}
