import MatchCardComponent from "./MatchCardComponent";


const Matchcards = ({isNew}) => {
  

  return (
    <>
      <div className=" grid gap-4 grid-cols-2 lg:grid-cols-3">
        {matchCards.map((card, i) => (
          <div key={i}>
            <MatchCardComponent
              img={card.img}
              distance={card.distance}
              name={card.name}
              age={card.age}
              place={card.place}
              isOnline={card.isOnline}
              match={card.match}
              isNew={isNew}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Matchcards;
