import "./PictureGuess.css";
import BlurryPhotos from "./Components/BlurryPhoto";
import { useState, useEffect } from "react";
import Sidebar from "./Components/Sidebar";
import PeopleList from "./Components/PeopleList";
import DropDownSearch from "./Components/DropDownSearch";
import { rootsrc } from "../../../../utils/source";
import Countdown from "./Components/Countdown";
import { jwtDecode } from "jwt-decode";
import Score from "../../Score";
import GameOver from "../../GameOver";
import { useMediaQuery } from 'react-responsive';

function PictureGuess() {
  const [photos, setPhotos] = useState();
  const [currPhoto, setCurrPhoto] = useState();
  const [allPeople, setAllPeople] = useState();
  const [peopleInPhoto, setPeopleInPhoto] = useState([]);
  const [guessedPeople, setGuessedPeople] = useState([]);
  const [highscore, setHighscore] = useState(0)
  const [score, setScore] = useState(0);
  const [userId, setUserId] = useState(null);
  const [isOver,setIsOver] = useState(false)

  const gameTitle = "picture-blitz"
  const isWideScreen = useMediaQuery({ query: '(min-width: 900px)' });

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
  };

  const postScore = () => {
    const postData = {
      person_id: userId,
      game_title: gameTitle,
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

  useEffect(() => {
    console.log(gameTitle)
    console.log(userId)
    if(userId){
      fetch(rootsrc + "/scores/" + gameTitle + "/" + userId)
      .then((response) => response.json())
      .then((response) => {
        if(response.status !== 404){
          setHighscore(response.score)
        }
    })
    }
  },[userId])

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
    fetch(`${rootsrc}/pp/connected-pictures`)
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
        if (response) {
          setAllPeople(response);
        }
      });
  }, []);

  if(isWideScreen){
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
          <Sidebar component={Score} componentData={{currScore:score,highscore:highscore}} />
        </div>
      )
    }else{
      return <GameOver score={score} highscore={highscore}/>
    }
  }else{ 
    if(!isOver){return (
    <div className="picture-guess-game-mobile">
      {currPhoto && <Countdown setIsOver={setIsOver} postScore={postScore} />}
      <Score data={{currScore:score,highscore:highscore}}/>
      {currPhoto && <BlurryPhotos photo={currPhoto} />}
      <div className="people-list-mobile">
        <PeopleList data={peopleListData}/>
      </div>
      {allPeople && (
        <DropDownSearch
        allPeople={allPeople}
        updateGuessed={updateGuessedPeople}
        />
      )}
    </div>
  )}else{
    return <GameOver score={score} highscore={highscore}/>
  }}
}

export default PictureGuess;
