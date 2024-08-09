import HomeCardComponents from "./HomeCardComponents"
const HomeCard = () => {
  const cards = [
    {
      img: "https://s3-alpha-sig.figma.com/img/12f7/5e9e/9e70ea4de0599ecc066cd3e8d119be92?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=QTlQqYE8AQA-991R2y4wq0vWzTIfox1xTtFKPKiGBESNRE5qHrF~lkACne3xYuA0Q71RsgBwERoAsIx2GLX47MbDfLEUN7l5aStbjPJEOqgbetuWnf-xxxhxJDd9kZYk9B4GNamVJf18aEKHTNKWZDvoDboVX5iyU9ahAO-S-T5eTlz0-vMUy4yCw3mRgWvSPvG6V4U-Iw11bn~Qh8BQrsJ6VhKrOxlkORh8Ip5f7uDn2dudtQQjgTGCHZ4067GB44XxexwWS1PvELU20-woIO-mlW0cBpUYwp3-uxIvsrSLWuX9KhzhXSK9t1besQq70WL3s0~E--dgeSoGxAhhrA__",
      name: "Sithara Nair",
      sex: "F",
      age: "26",
      job: 'DEVELOPER',
      place: "HYDRABAD"
    },
    {
      img: "https://s3-alpha-sig.figma.com/img/fb5d/e4e4/7a94500303b65d671f7d915e2e04595e?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LxW6yccACdWA6~xu7Atb~uscsstnk1KkJykq75-zulxwEwLgul8FhpetWlZIPLKMifwj~Ts87zVSIwpglj9y1Oy63X41twkLrhFEVIoy5tnrW2Ab3a3AnJkU5b6ZzfWcOiULZTqihWiHuL-VVJfXUtqa4twlvEIhWvINCdt2Iz6rOkxwUe073Bz2mF27BjV-OjNUqxUzySRb2~3RUR9WHpTJqn7c0qXOW3ubDqhyH5RVcFxSbf3LucUdMCjt1YQEWgaR~UqLX1OZFCN0gqf16THPXDArSD50VXFTL01vtcBkZcwVTarSTQwMUdciRLjY~CxWZxGe3SB0zN0oZCxAcA__",
      name: "Sithara Nair",
      sex: "F",
      age: "26",
      job: 'DEVELOPER',
      place: "HYDRABAD"
    },
    {
      img: "https://s3-alpha-sig.figma.com/img/4f02/0066/c4938c4fe7da7d03626cd83a507f8e06?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DLDTuM-DYF~RTv0ELYkg253EuHboj6ul1agFqXUR5Qnd4WGTW5XO8gGVDWaV-mOd6DC2SdsXVERi-c0SSoPvcsbdnuxNaeElfGKHU3rTc5xN66wRPpZmpyWXJerVv5Bbwl9EaFkB~MgXw0TPuzSfWRCm65yaFbWuxbXI~gPsUcBRSOzNMjoOCWpllzYA48ciD8B0zd17e18puoI2vx-d8t5htVYuymOz-4L1bL0RxEykyD9j8GZhBwsLkrPMupz51lJO5rcekf3xl26IucE7fQUw9PvwOW7kNbhXIbnusDxFNm6bmqjSmV4xDbbL1Gk3HI0epRb9M3eIL~VNmpN85g__",
      name: "Sithara Nair",
      sex: "F",
      age: "26",
      job: 'DEVELOPER',
      place: "HYDRABAD"
    },
    {
      img: "https://s3-alpha-sig.figma.com/img/62ab/bbb2/36756b025d1654a2d1d2cc84d799b9df?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=G7bWSD819BQuIUPcK9NVbFvX1aaqHDAufYul9A8hp9lzzab-kzjspr~PKiI76jDCA-qA5Ul~DQOpYPRufBKtoGVTO1ekxHurKUD67PP0k8Lll3Vbp0cWC7TfNXvDACSwHLgA-3ujSEa9-2qQ04yG5SaSxZZHImeFX4-y-Jp5xUwUamq~1YWlobl2JxipClYIbh-O9xzRTIiHd0NW07qdL~ZVuU0gHYDh-BJsLnrStI~m-brHUzXMB5EG~RqdN4wA88I4cefNiJDXAzwPHLiupr7ocHlTBPGBN9EX6CGBCItmYWOhivKcdEne7l6vFLk055-6BCqE83Z-NlGUK1eUoQ__",
      name: "Sithara Nair",
      sex: "F",
      age: "26",
      job: 'DEVELOPER',
      place: "HYDRABAD"
    },
    {
      img: "https://s3-alpha-sig.figma.com/img/0855/aedc/5f1841ce318bdf1d55d61fc862dfc7fd?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=g9SaS7qu5BRSHGqyPe0AslMC78ttwgZl9K8luVO7ZCSM-JWSmsXqVc93DRON5V07Xg8OvLIBUivMzVyhIU5a9XMu4rRZDWITWvcerY6GToKenBkgN0gS4kRI8Ze7dRef6Mk0yi0mJbmkEs3G6v8-z9f~FSGDqj2MUjfuV7GQmf-H0MzRxkqo-eYeoBpvHvn~06j3qDb3YfKq85Q7aOEmHvxQ8FOQa1TeHmaiXbuHiDz0tu2ZflY4ITtXWmK4QifK87hLQ~-RU9jIPt-Y8Qu2eFCtjsGMPgoMFEL5cK9SY4e--7Ubf5N7afZiNoot9HR4ZZFXhnh3bcjATizXNcvJbg__",
      name: "Sithara Nair",
      sex: "F",
      age: "26",
      job: 'DEVELOPER',
      place: "HYDRABAD"
    },
    {
      img: "https://s3-alpha-sig.figma.com/img/0855/aedc/5f1841ce318bdf1d55d61fc862dfc7fd?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=g9SaS7qu5BRSHGqyPe0AslMC78ttwgZl9K8luVO7ZCSM-JWSmsXqVc93DRON5V07Xg8OvLIBUivMzVyhIU5a9XMu4rRZDWITWvcerY6GToKenBkgN0gS4kRI8Ze7dRef6Mk0yi0mJbmkEs3G6v8-z9f~FSGDqj2MUjfuV7GQmf-H0MzRxkqo-eYeoBpvHvn~06j3qDb3YfKq85Q7aOEmHvxQ8FOQa1TeHmaiXbuHiDz0tu2ZflY4ITtXWmK4QifK87hLQ~-RU9jIPt-Y8Qu2eFCtjsGMPgoMFEL5cK9SY4e--7Ubf5N7afZiNoot9HR4ZZFXhnh3bcjATizXNcvJbg__",
      name: "Sithara Nair",
      sex: "F",
      age: "26",
      job: 'DEVELOPER',
      place: "HYDRABAD"
    },
  ]

  return (
    <div className=" grid grid-cols-2 w-[30%] m-4 gap-12">
      {
        cards.map((card, i) => (
          <div key={i}>
            <HomeCardComponents img={card.img} name={card.name} sex={card.sex} age={card.age} job={card.job} place={card.place} />

          </div>
        ))
          }
    </div>
  )
}

export default HomeCard