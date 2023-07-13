// Query Selctors

const curiosityBtn = document.querySelector(".curiosity-button");
const spiritBtn = document.querySelector(".spirit-button");
const opportunityBtn = document.querySelector(".opportunity-button");

let store = {};

curiosityBtn.addEventListener("click", function (e) {
  getImageOfTheDay(store, "curiosity");
});

spiritBtn.addEventListener("click", function (e) {
  getImageOfTheDay(store, "spirit");
});

opportunityBtn.addEventListener("click", function (e) {
  getImageOfTheDay(store, "opportunity");
});
// The launch date, landing date, name and status

// add our markup to the page
const root = document.getElementById("root");

const updateStore = (oldState, updatedState) => {
  const newState = Object.values(updatedState)
    .flat()
    .reduce((acc, cur, i, arr) => {
      if (i === 0) {
        acc.name = cur.rover.name;
        acc.landingDate = cur.rover.landing_date;
        acc.launchDate = cur.rover.launch_date;
        acc.image = [];
      }
      acc.image.push(cur.img_src);
      return acc;
    }, {});

  Object.assign(oldState, newState);
  render(root, store);
};

const render = async (root, state) => {
  root.innerHTML = App(state);
};

// create content
const App = (state) => {
  // let { rovers, apod, rover } = state;
  // let { name } = state.user;
  // console.log(apod);
  console.log(state);

  return `
        <header></header>
        <main>
            ${Greeting(state.name)}
            <section>
                <h3>This NASA rover left earth on ${state.launchDate}</h3>
                <h3>And landed on mars on ${state.landingDate}</h3>
                <h3>Put things on the page!</h3>
                <p>Here is an example section.</p>
                <p>
                    One of the most popular websites at NASA is the Astronomy Picture of the Day. In fact, this website is one of
                    the most popular websites across all federal agencies. It has the popular appeal of a Justin Bieber video.
                    This endpoint structures the APOD imagery and associated metadata so that it can be repurposed for other
                    applications. In addition, if the concept_tags parameter is set to True, then keywords derived from the image
                    explanation are returned. These keywords could be used as auto-generated hashtags for twitter or instagram feeds;
                    but generally help with discoverability of relevant imagery.
                </p>
                ${ImageOfTheDay(state.image[0])}
                ${ImageOfTheDay(state.image[1])}
                ${ImageOfTheDay(state.image[2])}
                ${ImageOfTheDay(state.image[3])}
                ${ImageOfTheDay(state.image[4])}
                ${ImageOfTheDay(state.image[5])}
            </section>
        </main>
        <footer></footer>
    `;
};

// listening for load event because page should load before any JS is called
window.addEventListener("load", () => {
  // render(root, store);
  // getImageOfTheDay(store);
});

// ------------------------------------------------------  COMPONENTS

// Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.
const Greeting = (name) => {
  if (name) {
    return `
            <h1>${name}!</h1>
        `;
  }

  return `
        <h1>Hello!</h1>
    `;
};

// Example of a pure function that renders infomation requested from the backend
const ImageOfTheDay = (apod) => {
  // If image does not already exist, or it is not from today -- request it again
  // const today = new Date();
  // const photodate = new Date(apod.date);
  // console.log(photodate.getDate(), today.getDate());

  // console.log(photodate.getDate() === today.getDate());
  if (!apod) {
    getImageOfTheDay(store);
  }

  // check if the photo of the day is actually type video!
  if (apod.media_type === "video") {
    return `
            <p>See today's featured video <a href="${apod.url}">here</a></p>
            <p>${apod.title}</p>
            <p>${apod.explanation}</p>
        `;
  } else {
    return `
            
            <img src="${apod}" height="350px" width="100%" />
            
        `;
  }
};

// ------------------------------------------------------  API CALLS

// Example API call
// const getImageOfTheDay = (state) => {
//   let { apod } = state;

//   fetch(`http://localhost:3000/apod`)
//     .then((res) => res.json())
//     .then((rover) => updateStore(spirit, { rover }));

//   // return data;
// };

const getImageOfTheDay = (state, rover) => {
  let { apod } = state;
  console.log(state);

  fetch(`http://localhost:3000/${rover}`)
    .then((res) => res.json())
    .then((rover) => updateStore(store, { rover }));

  // return data;
};
