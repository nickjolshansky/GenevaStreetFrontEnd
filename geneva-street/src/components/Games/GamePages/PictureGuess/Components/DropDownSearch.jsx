import { Autocomplete, TextField } from "@mui/material";
import React from "react";

export default function DropDownSearch(props) {

    const massageAllPeopleData = props.allPeople.map(currPerson => {
        return {label:`${currPerson.first_name} ${currPerson.last_name} ${currPerson.suffix ? currPerson.suffix : ''}`,
                id: currPerson.id}
    });

    const guess = (e,newValue) => {
        if(newValue){
            props.updateGuessed(newValue)
        }
    }

    const clearField = (e) => {
        e.target.value = ""
    }

    return (
        <Autocomplete
        onChange={guess}
        options={massageAllPeopleData}
        sx={{width: 300}}
        renderInput={(params) => <TextField onClick={clearField} {...params} value={"test"} label={"Guess..."}></TextField>}
        />
    )
}