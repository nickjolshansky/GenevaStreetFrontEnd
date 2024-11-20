const PersonNameDisplay = ({ person }) => {
  return (
    <div className="person-name">
      {person.first_name} {person.last_name} {person.suffix}
      {person.date_of_passing !== null && (
        <div className="person-dates">
          {`${person.date_of_birth} ~ ${person.date_of_passing}`}
        </div>
      )}
    </div>
  );
};

export default PersonNameDisplay;
