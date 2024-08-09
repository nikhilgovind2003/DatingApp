import MatchCardComponent from "./MatchCardComponent";
const Matchcards = () => {
  const matchCards = [
    {
      img: "https://s3-alpha-sig.figma.com/img/1398/2ffd/fdadcd413286d1957a6b477eab57205f?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Fyv-UpKabPLzCwmnRfnS4Zkd8w6HhY054t~-uy4bp89gyGLodfdzGO0xJ9ugFyJ7tqdnnTII~I84qNrLl96suXrsHDy~ohOCkJy7DJbwkSSD6TqQP5XQdkCq~g2XJ65KF-4qLW9A2jAy2NpUaXtaRedv9ycC9I2Cz6t-RAhmysAgimS-twjvZVgEAAR7KjE8aiQvsRd832rtVc8-e89Og0Udr-QVrXtOSj-cP~tAHowQcj18vyJhQpzFfst4ct9xgxIhS5V0s3eAdwSjPTqtDRJlfOtBsdrVuc174Joe~s~YIE75rZ~tSTGEfQ~zm5ARlCd79p7wpP-gYKg2qEx-9g__",
      distance: "1.3",
      name: "James",
      age: "20",
      place: "HANOVE",
      isOnline: true,
      match: "83"
    },
    {
      img: "https://s3-alpha-sig.figma.com/img/9fba/bf04/a8e4d3ead51b45db5f3b4401dfa81421?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=U6iJ3dfbTmwH9TSbpKKjZExcz12wggW-khjbp2KkeFalhvVyTJtKmoLwVUukGEwgv9vvb1tXUp~QxpAvPeCPsrHLZLwotGxcNdcKjUzIbOqkQlHzq5JBWj5gEGX~xyHSK9tDDWverDXwK~JN75XpjY7FaxggY1nd1kP~gHrpvv2w2vPVwA0p96-oxvPN84LDozFwwRUivC0WEwJfaU-ejb0Yz7BoKy0yd4CdoRoymLl1OfMacbhnDol1g6EedFSVdxV~1-fjuDgdNK9r0hEgP5PmI8ldmNd1eHzMImmUNulVZR4Ukl0X0V7eB5fewkd5YB-36-tve2IFZVwXpO83qA__",
      distance: "2",
      name: "Eddie",
      age: "23",
      place: "DORTMUND",
      isOnline: true,
      match: "94"
    },
    {
      img: "https://s3-alpha-sig.figma.com/img/1398/2ffd/fdadcd413286d1957a6b477eab57205f?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Fyv-UpKabPLzCwmnRfnS4Zkd8w6HhY054t~-uy4bp89gyGLodfdzGO0xJ9ugFyJ7tqdnnTII~I84qNrLl96suXrsHDy~ohOCkJy7DJbwkSSD6TqQP5XQdkCq~g2XJ65KF-4qLW9A2jAy2NpUaXtaRedv9ycC9I2Cz6t-RAhmysAgimS-twjvZVgEAAR7KjE8aiQvsRd832rtVc8-e89Og0Udr-QVrXtOSj-cP~tAHowQcj18vyJhQpzFfst4ct9xgxIhS5V0s3eAdwSjPTqtDRJlfOtBsdrVuc174Joe~s~YIE75rZ~tSTGEfQ~zm5ARlCd79p7wpP-gYKg2qEx-9g__",
      distance: "1.3",
      name: "James",
      age: "20",
      place: "HANOVE",
      isOnline: true,
      match: "87"
    },
    {
      img: "https://s3-alpha-sig.figma.com/img/9fba/bf04/a8e4d3ead51b45db5f3b4401dfa81421?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=U6iJ3dfbTmwH9TSbpKKjZExcz12wggW-khjbp2KkeFalhvVyTJtKmoLwVUukGEwgv9vvb1tXUp~QxpAvPeCPsrHLZLwotGxcNdcKjUzIbOqkQlHzq5JBWj5gEGX~xyHSK9tDDWverDXwK~JN75XpjY7FaxggY1nd1kP~gHrpvv2w2vPVwA0p96-oxvPN84LDozFwwRUivC0WEwJfaU-ejb0Yz7BoKy0yd4CdoRoymLl1OfMacbhnDol1g6EedFSVdxV~1-fjuDgdNK9r0hEgP5PmI8ldmNd1eHzMImmUNulVZR4Ukl0X0V7eB5fewkd5YB-36-tve2IFZVwXpO83qA__",
      distance: "2",
      name: "Eddie",
      age: "23",
      place: "DORTMUND",
      isOnline: true,
      match: "100"
    },
    {
      img: "https://s3-alpha-sig.figma.com/img/1398/2ffd/fdadcd413286d1957a6b477eab57205f?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Fyv-UpKabPLzCwmnRfnS4Zkd8w6HhY054t~-uy4bp89gyGLodfdzGO0xJ9ugFyJ7tqdnnTII~I84qNrLl96suXrsHDy~ohOCkJy7DJbwkSSD6TqQP5XQdkCq~g2XJ65KF-4qLW9A2jAy2NpUaXtaRedv9ycC9I2Cz6t-RAhmysAgimS-twjvZVgEAAR7KjE8aiQvsRd832rtVc8-e89Og0Udr-QVrXtOSj-cP~tAHowQcj18vyJhQpzFfst4ct9xgxIhS5V0s3eAdwSjPTqtDRJlfOtBsdrVuc174Joe~s~YIE75rZ~tSTGEfQ~zm5ARlCd79p7wpP-gYKg2qEx-9g__",
      distance: "1.3",
      name: "James",
      age: "20",
      place: "HANOVE",
      isOnline: true,
      match: "50"
    },
    {
      img: "https://s3-alpha-sig.figma.com/img/9fba/bf04/a8e4d3ead51b45db5f3b4401dfa81421?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=U6iJ3dfbTmwH9TSbpKKjZExcz12wggW-khjbp2KkeFalhvVyTJtKmoLwVUukGEwgv9vvb1tXUp~QxpAvPeCPsrHLZLwotGxcNdcKjUzIbOqkQlHzq5JBWj5gEGX~xyHSK9tDDWverDXwK~JN75XpjY7FaxggY1nd1kP~gHrpvv2w2vPVwA0p96-oxvPN84LDozFwwRUivC0WEwJfaU-ejb0Yz7BoKy0yd4CdoRoymLl1OfMacbhnDol1g6EedFSVdxV~1-fjuDgdNK9r0hEgP5PmI8ldmNd1eHzMImmUNulVZR4Ukl0X0V7eB5fewkd5YB-36-tve2IFZVwXpO83qA__",
      distance: "2",
      name: "Eddie",
      age: "23",
      place: "DORTMUND",
      isOnline: true,
      match: "100"
    },
  ];

  return (
    <>
      <div className=" grid grid-cols-4 gap-4  m-8">
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
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Matchcards;
