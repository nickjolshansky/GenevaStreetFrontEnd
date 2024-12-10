import "./PictureGuess.css";
import BlurryPhotos from "./Components/BlurryPhoto";
import { useState, useEffect } from "react";
import Sidebar from "./Components/Sidebar";
import PeopleList from "./Components/PeopleList";
import DropDownSearch from "./Components/DropDownSearch";
import { rootsrc } from "../../../../utils/source";
import Countdown from "./Components/Countdown";
import { jwtDecode } from "jwt-decode";
import IngameScore from "./Components/IngameScore";
import GameOver from "../../GameOver";

function PictureGuess() {
  const [photos, setPhotos] = useState();
  const [currPhoto, setCurrPhoto] = useState();
  const [allPeople, setAllPeople] = useState();
  const [peopleInPhoto, setPeopleInPhoto] = useState([]);
  const [guessedPeople, setGuessedPeople] = useState([]);
  const [score, setScore] = useState(0);
  const [userId, setUserId] = useState(null);
  const [isOver,setIsOver] = useState(false)

  //get user id
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      const decodedToken = jwtDecode(jwt);
      setUserId(parseInt(decodedToken.sub));
    }
  }, []);

  const peopleListData = {
    people: peopleInPhoto,
    guessedPeople: guessedPeople,
  };

  const calculateRandomIndex = (numberOfItems) => {
    return Math.floor(Math.random() * numberOfItems);
  };

  const updateScore = () => {
    const newScore = score + 10;
    setScore(newScore);
    console.log(newScore);
  };

  const postScore = () => {
    const postData = {
      person_id: userId,
      game_title: 'test',
      score: score,
    };

    fetch(`${rootsrc}/Scores/new-score`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
  };

  const updateGuessedPeople = (person) => {
    let personFound = false;
    let updatedGuessedPeople = [...guessedPeople];

    peopleInPhoto.forEach((currPerson) => {
      if (person.id === currPerson.id) {
        personFound = true;
      }
    });

    if (personFound) {
      updateScore();
      updatedGuessedPeople = [...guessedPeople, person.id];
    }

    setGuessedPeople(updatedGuessedPeople);

    if (updatedGuessedPeople.length === peopleInPhoto.length) {
      setGuessedPeople([]);
      const newPhoto = photos[calculateRandomIndex(photos.length)];
      fetch(`${rootsrc}/pp/picture/${newPhoto.id}`)
        .then((response) => response.json())
        .then((response) => {
          setPeopleInPhoto(response);
        });
      setCurrPhoto(newPhoto);
    }
  };

  useEffect(() => {
    fetch(`${rootsrc}/Pictures`)
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          setPhotos(response);
          const calculatedRandomIndex = calculateRandomIndex(response.length);
          setCurrPhoto(response[calculatedRandomIndex]);
          const photoID = response[calculatedRandomIndex].id;
          fetch(`${rootsrc}/pp/picture/${photoID}`)
            .then((response) => response.json())
            .then((response) => {
              setPeopleInPhoto(response);
            });
        }
      });
  }, []);

  useEffect(() => {
    fetch(`${rootsrc}/People`)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response) {
          setAllPeople(response);
        }
      });
  }, []);



if(!isOver) { return (
    <div className="picture-guess-game">
      <Sidebar component={PeopleList} componentData={peopleListData} />
      <div className="picture-window">
        {currPhoto && <Countdown setIsOver={setIsOver} postScore={postScore} />}
        {currPhoto && <BlurryPhotos photo={currPhoto} />}
        {allPeople && (
          <DropDownSearch
            allPeople={allPeople}
            updateGuessed={updateGuessedPeople}
          />
        )}
      </div>
      <Sidebar component={IngameScore} componentData={score} />
    </div>
  )
}else{
  return <GameOver score={score}/>
}
}

export default PictureGuess;
