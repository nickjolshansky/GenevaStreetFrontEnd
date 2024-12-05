import React from 'react'

export default function PeopleList(props) {

  return (
    <div className='people-list'>
        {props.data.people && props.data.people.map((currPerson,i) => 
            <div key={Math.random()}>
              {props.data.guessedPeople.includes(currPerson.id) ? 
              `${i + 1}) ${currPerson.first_name} ${currPerson.last_name} ${currPerson.suffix ? currPerson.suffix : ''}` : 
              `${i + 1}) _______________`}
            </div> 
        )}
    </div>
  )
}
