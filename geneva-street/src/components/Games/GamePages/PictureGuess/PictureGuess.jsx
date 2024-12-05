import "./PictureGuess.css"
import BlurryPhotos from "./Components/BlurryPhoto";
import { useState,useEffect } from "react";
import Sidebar from "./Components/Sidebar";
import PeopleList from "./Components/PeopleList";
import DropDownSearch from "./Components/DropDownSearch";
import { rootsrc } from "../../../../utils/source";

function PictureGuess() {

  const [photos, setPhotos] = useState()
  const [allPeople, setAllPeople] = useState()
  const [peopleInPhoto, setPeopleInPhoto] = useState()
  const [guessedPeople, setGuessedPeople] = useState([])
  const [randomIndex, setRandomIndex] = useState()

  const peopleListData = {
    people: peopleInPhoto,
    guessedPeople: guessedPeople
  }

  const updateGuessedPeople = (person) => {
    setGuessedPeople([...guessedPeople, person.id])
    console.log(guessedPeople)
  }

  useEffect(() => { 
      fetch(`${rootsrc}/Pictures`)
      .then(response => {
          setPhotos(response.data)
          const calculatedRandomIndex = Math.floor(Math.random() * response.data.length)
          setRandomIndex(calculatedRandomIndex)
          const photoID = response.data[calculatedRandomIndex].id
          fetch(`${rootsrc}/pp/picture/${photoID}`)
          .then(peopleResponse => {
            setPeopleInPhoto(peopleResponse.data)
          })
      })
  },[])

  useEffect(() => {
    fetch(`${rootsrc}/People`)
    .then(response => {
      setAllPeople(response.data)
    })
  },[])

  return (
    <div className="picture-guess-game">
      <Sidebar component={PeopleList} componentData={peopleListData}/>
        <div className="picture-window">
          { photos && <BlurryPhotos photo={photos[randomIndex]}/>}
          {allPeople && <DropDownSearch allPeople={allPeople} updateGuessed={updateGuessedPeople}/>}
        </div>
        <Sidebar component={PeopleList} componentData={peopleListData}/>
    </div>
  );
}

export default PictureGuess;