"use strict";

// Query Selctors
const curiosityBtn = document.querySelector(".curiosity-button");
const spiritBtn = document.querySelector(".spirit-button");
const opportunityBtn = document.querySelector(".opportunity-button");
const pageCon = document.querySelector(".page-container");
const root = document.getElementById("root");

// STATE
let store = {};

const render = (state) => {
  return App(state);
};

// Pure function to update the store
const updateStore = (oldState, updatedState) => {
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

  return newState;
};

// Pure function to render the App
const App = (state) => {
  return `
    <header>
      <nav>
        <ul class="nav-list">          
          <li><a class="home-button" href="/">Home</a></li>
          <li><a href="#" class="curiosity-button" data-rover="curiosity">Curiosity</a></li>
          <li><a href="#" class="spirit-button" data-rover="spirit">Spirit</a></li>
          <li><a href="#" class="opportunity-button" data-rover="opportunity">Opportunity</a></li>  
        </ul>
      </nav>
    </header>
    <main class="rover-container">
      <h1 class="rover-name">${state.name}</h1>
      <section>
        <h3 class="launch-date">This NASA rover left earth on ${
          state.launchDate
        } and landed on mars on ${state.landingDate} its status is currently ${
    state.status
  }.</h3>
        <div class="image-container">
          ${getImages(state.image)}
        </div>
      </section>
    </main>
    <footer></footer>
  `;
};

// Pure function to render the image container
const getImages = (images) => {
  return images
    .map((image) => `<img src="${image}" height="350px" width="100%" />`)
    .join("");
};

// Higher-Order Function to fetch rover info
const fetchRoverInfo = (rover) => {
  return fetch(`http://localhost:3000/${rover}`).then((res) => res.json());
};

// Higher-Order Function to get rover info and update the store
const getRoverInfo = (state, rover) => {
  return fetchRoverInfo(rover).then((roverData) =>
    updateStore(state, { roverData })
  );
};

// Higher-Order Function to handle the event for getting rover info and updating the content
const eventListenerHandler = (state, rover) => {
  getRoverInfo(state, rover)
    .then((updatedState) => {
      const html = render(updatedState);
      root.innerHTML = html;
    })
    .catch((err) => {
      console.log("Error:", err);
    });
};

// Run the following code after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Attach event listener to the document using event delegation
  document.addEventListener("click", (event) => {
    const target = event.target;
    if (target.matches(".nav-list a[data-rover]")) {
      event.preventDefault();
      eventListenerHandler(store, target.dataset.rover);
    }
  });
  curiosityBtn.addEventListener("click", () => {
    pageCon.innerHTML = "";
    root.classList.toggle("hidden");
    eventListenerHandler(store, "curiosity");
  });

  spiritBtn.addEventListener("click", () => {
    pageCon.innerHTML = "";
    root.classList.toggle("hidden");
    eventListenerHandler(store, "spirit");
  });

  opportunityBtn.addEventListener("click", () => {
    pageCon.innerHTML = "";
    root.classList.toggle("hidden");
    eventListenerHandler(store, "opportunity");
  });
});

// "use strict";

// // Query Selctors
// const curiosityBtn = document.querySelector(".curiosity-button");
// const spiritBtn = document.querySelector(".spirit-button");
// const opportunityBtn = document.querySelector(".opportunity-button");
// const pageCon = document.querySelector(".page-container");
// const root = document.getElementById("root");

// // STATE
// let store = {};

// // FUNCTIONS
// const updateStore = (oldState, updatedState) => {
//   const newState = Object.values(updatedState)
//     .flat()
//     .reduce((acc, cur, i, arr) => {
//       if (i === 0) {
//         acc.name = cur.rover.name;
//         acc.status = cur.rover.status;
//         acc.landingDate = cur.rover.landing_date;
//         acc.launchDate = cur.rover.launch_date;
//         acc.image = [];
//       }
//       acc.image.push(cur.img_src);
//       return acc;
//     }, {});

//   return newState;
// };

// const render = (state) => {
//   return App(state);
// };

// const App = (state) => {
//   console.log(state);
//   return `
//         <header>
//         <nav>
//         <ul class="nav-list">
//         <li><a class="home-button" href="/">Home</a></li>
//         <li><a href="#" class="curiosity-button" data-rover="curiosity">Curiosity</a></li>
//         <li><a href="#" class="spirit-button" data-rover="spirit">Spirit</a></li>
//         <li><a href="#" class="opportunity-button" data-rover="opportunity">Opportunity</a></li>
//       </ul>

//           </nav>
//         </header>
//         <main class="rover-container">
//             <h1 class="rover-name">${state.name}</h1>
//             <section>
//                 <h3 class="launch-date">This NASA rover left earth on ${
//                   state.launchDate
//                 } and landed on mars on ${
//     state.landingDate
//   } its status is currently ${state.status}.</h3>
//                 <div class="image-container">
//                 ${getImages(state.image)}
//                 </div>
//             </section>
//         </main>
//         <footer></footer>
//     `;
// };

// const getImages = (images) => {
//   return images
//     .map((image) => `<img src="${image}" height="350px" width="100%" />`)
//     .join("");
// };

// // Higher-Order Function
// const fetchRoverInfo = (rover) => {
//   return fetch(`http://localhost:3000/${rover}`).then((res) => res.json());
// };

// const getRoverInfo = (state, rover) => {
//   return fetchRoverInfo(rover).then((roverData) =>
//     updateStore(state, { roverData })
//   );
// };

// const eventListenerHandler = (state, rover) => {
//   getRoverInfo(state, rover)
//     .then((updatedState) => {
//       const html = render(updatedState);
//       root.innerHTML = html;
//       // Attach event listeners to the navigation links
//       const curiosityBtn = document.querySelector(".curiosity-button");
//       const spiritBtn = document.querySelector(".spirit-button");
//       const opportunityBtn = document.querySelector(".opportunity-button");

//       curiosityBtn.addEventListener("click", () => {
//         eventListenerHandler(store, "curiosity");
//       });

//       spiritBtn.addEventListener("click", () => {
//         eventListenerHandler(store, "spirit");
//       });

//       opportunityBtn.addEventListener("click", () => {
//         eventListenerHandler(store, "opportunity");
//       });
//     })

//     .catch((err) => {
//       console.log("Error:", err);
//     });
// };

// document.addEventListener("DOMContentLoaded", () => {
//   curiosityBtn.addEventListener("click", () => {
//     pageCon.innerHTML = "";
//     root.classList.toggle("hidden");
//     eventListenerHandler(store, "curiosity");
//   });

//   spiritBtn.addEventListener("click", () => {
//     pageCon.innerHTML = "";
//     root.classList.toggle("hidden");
//     eventListenerHandler(store, "spirit");
//   });

//   opportunityBtn.addEventListener("click", () => {
//     pageCon.innerHTML = "";
//     root.classList.toggle("hidden");
//     eventListenerHandler(store, "opportunity");
//   });
// });

// ------------ Original Code -----------------

// "use strict";

// // Query Selctors
// const curiosityBtn = document.querySelector(".curiosity-button");
// const spiritBtn = document.querySelector(".spirit-button");
// const opportunityBtn = document.querySelector(".opportunity-button");
// const pageCon = document.querySelector(".page-container");
// const landingCon = document.querySelector(".landing-container");

// // Event Listners
// curiosityBtn.addEventListener("click", function (e) {
//   pageCon.innerHTML = "";
//   root.classList.toggle("hidden");
//   getRoverInfo(store, "curiosity");
// });

// spiritBtn.addEventListener("click", function (e) {
//   pageCon.innerHTML = "";
//   root.classList.toggle("hidden");
//   getRoverInfo(store, "spirit");
// });

// opportunityBtn.addEventListener("click", function (e) {
//   pageCon.innerHTML = "";
//   root.classList.toggle("hidden");
//   getRoverInfo(store, "opportunity");
// });

// // ROOT
// const root = document.getElementById("root");

// // STATE
// let store = {};

// // FUNCTIONS
// const updateStore = (oldState, updatedState) => {
//   const newState = Object.values(updatedState)
//     .flat()
//     .reduce((acc, cur, i, arr) => {
//       if (i === 0) {
//         acc.name = cur.rover.name;
//         acc.status = cur.rover.status;
//         acc.landingDate = cur.rover.landing_date;
//         acc.launchDate = cur.rover.launch_date;
//         acc.image = [];
//       }
//       acc.image.push(cur.img_src);
//       return acc;
//     }, {});

//   Object.assign(oldState, newState);
//   render(root, store);
// };

// const render = async (root, state) => {
//   root.innerHTML = App(state);
// };

// // create content
// const App = (state) => {
//   // let { rovers, apod, rover } = state;
//   // let { name } = state.user;
//   // console.log(apod);

//   return `
//         <header>
//         <nav>
//             <ul class="nav-list">
//             <li><a class="home-button" href="/">Home</a></li>
//             <li><a href="#" onclick="getRoverInfo(store, 'curiosity')">Curiosity</a></li>
//             <li><a href="#" onclick="getRoverInfo(store, 'spirit')">Spirit</a></li>
//             <li><a href="#" onclick="getRoverInfo(store, 'opportunity')">Opportunity</a></li>
//             </ul>
//           </nav>
//         </header>
//         <main class="rover-container">
//         <!-- ${Greeting(state.name)} -->

//             <h1 class="rover-name">${state.name}</h1>
//             <section>
//                 <h3 class="launch-date">This NASA rover left earth on ${
//                   state.launchDate
//                 } and landed on mars on ${
//     state.landingDate
//   } its status is currently ${state.status}.</h3>

//                 <div class="image-container">
//                 ${getImages(state.image)}

//                 </div>
//             </section>
//         </main>
//         <footer></footer>
//     `;
// };

// // listening for load event because page should load before any JS is called
// window.addEventListener("load", () => {
//   // render(root, store);
//   // getRoverInfo(store);
// });

// // ------------------------------------------------------  COMPONENTS

// // Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.
// const Greeting = (name) => {
//   if (name) {
//     return `
//             <h1 >${name}</h1>
//         `;
//   }

//   return `
//         <h1>Hello!</h1>
//     `;
// };

// const getImages = (images) => {
//   return images.map(
//     (image) => `<img src="${image}" height="350px" width="100%" />`
//   );
// };

// // Example of a pure function that renders infomation requested from the backend
// const ImageOfTheDay = (apod) => {
//   // If image does not already exist, or it is not from today -- request it again
//   // const today = new Date();
//   // const photodate = new Date(apod.date);
//   // console.log(photodate.getDate(), today.getDate());

//   // console.log(photodate.getDate() === today.getDate());
//   if (!apod) {
//     getRoverInfo(store);
//   }

//   // check if the photo of the day is actually type video!
//   if (apod.media_type === "video") {
//     return `
//             <p>See today's featured video <a href="${apod.url}">here</a></p>
//             <p>${apod.title}</p>
//             <p>${apod.explanation}</p>
//         `;
//   } else {
//     return `

//             <img src="${apod}" height="350px" width="100%" />

//         `;
//   }
// };

// // ------------------------------------------------------  API CALLS

// // Example API call
// // const getRoverInfo = (state) => {
// //   let { apod } = state;

// //   fetch(`http://localhost:3000/apod`)
// //     .then((res) => res.json())
// //     .then((rover) => updateStore(spirit, { rover }));

// //   // return data;
// // };

// const getRoverInfo = (state, rover) => {
//   // let { apod } = state;

//   fetch(`http://localhost:3000/${rover}`)
//     .then((res) => res.json())
//     .then((rover) => updateStore(state, { rover }));

//   // return data;
// };
