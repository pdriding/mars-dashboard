"use strict";

// Query Selctors
const curiosityBtn = document.querySelector(".curiosity-button");
const spiritBtn = document.querySelector(".spirit-button");
const opportunityBtn = document.querySelector(".opportunity-button");
const pageCon = document.querySelector(".page-container");
const landingCon = document.querySelector(".landing-container");

// Event Listners
curiosityBtn.addEventListener("click", function (e) {
  pageCon.innerHTML = "";
  root.classList.toggle("hidden");
  getImageOfTheDay(store, "curiosity");
});

spiritBtn.addEventListener("click", function (e) {
  pageCon.innerHTML = "";
  root.classList.toggle("hidden");
  getImageOfTheDay(store, "spirit");
});

opportunityBtn.addEventListener("click", function (e) {
  pageCon.innerHTML = "";
  root.classList.toggle("hidden");
  getImageOfTheDay(store, "opportunity");
});

// ROOT
const root = document.getElementById("root");

// STATE
let store = {};

// FUNCTIONS
const updateStore = (oldState, updatedState) => {
  console.log(updatedState);
  const newState = Object.values(updatedState)
    .flat()
    .reduce((acc, cur, i, arr) => {
      if (i === 0) {
        acc.name = cur.rover.name;
        acc.status = cur.rover.status;
        acc.landingDate = cur.rover.landing_date;
        acc.launchDate = cur.rover.launch_date;
        acc.image = [];
      }
      acc.image.push(cur.img_src);
      return acc;
    }, {});

  Object.assign(oldState, newState);
  console.log(2);
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
        <header>
        <nav>
            <ul class="nav-list">          
            <li><a class="home-button" href="/">Home</a></li>
            <li><a href="#" onclick="getImageOfTheDay(store, 'curiosity')">Curiosity</a></li>
            <li><a href="#" onclick="getImageOfTheDay(store, 'spirit')">Spirit</a></li> 
            <li><a href="#" onclick="getImageOfTheDay(store, 'opportunity')">Opportunity</a></li>        
            </ul>
          </nav>
        </header>
        <main class="rover-container">
        <!-- ${Greeting(state.name)} -->
            
            <h1 class="rover-name">${state.name}</h1>
            <section>
                <h3 class="launch-date">This NASA rover left earth on ${
                  state.launchDate
                } and landed on mars on ${
    state.landingDate
  } its status is currently ${state.status}.</h3>
                
                <div class="image-container">
                ${ImageOfTheDay(state.image[0])}
                ${ImageOfTheDay(state.image[1])}
                ${ImageOfTheDay(state.image[2])}
                ${ImageOfTheDay(state.image[3])}
                ${ImageOfTheDay(state.image[4])}
                ${ImageOfTheDay(state.image[5])}
                </div>
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
            <h1 >${name}</h1>
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
  // let { apod } = state;

  fetch(`http://localhost:3000/${rover}`)
    .then((res) => res.json())
    .then((rover) => updateStore(store, { rover }));

  // return data;
};
