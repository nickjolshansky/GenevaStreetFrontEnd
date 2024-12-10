import { Typography } from "@mui/material"
import "./IngameScore.css"

export default function IngameScore(props){
    return <div className="score-area">
        <div className="score-text-container">
            <Typography fontSize={36}>Score:</Typography>
            <Typography fontSize={24}>{props.data}</Typography>
        </div>
    </div>
}