import { Typography } from "@mui/material"
import "./Score.css"

export default function Score(props){
    return <div className="score-area">
        <div className="score-text-container">
            <Typography fontSize={36}>Highscore:</Typography>
            <Typography fontSize={24}>{props.data.highscore}</Typography>
        </div>
        <div className="score-text-container">
            <Typography fontSize={36}>Score:</Typography>
            <Typography fontSize={24}>{props.data.currScore}</Typography>
        </div>
    </div>
}