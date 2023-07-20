"use strict";

// Import ImmutableJS
const { Map, List } = Immutable;

// Query Selctors
const curiosityBtn = document.querySelector(".curiosity-button");
const spiritBtn = document.querySelector(".spirit-button");
const opportunityBtn = document.querySelector(".opportunity-button");
const pageCon = document.querySelector(".page-container");
const root = document.getElementById("root");

// STATE
let store = Map({
  name: "",
  status: "",
  landingDate: "",
  launchDate: "",
  image: List(),
});

const render = (state) => {
  return App(state);
};

// Pure function to update the store
const updateStore = (oldState, updatedState) => {
  const newState = Object.values(updatedState)
    .flat()
    .reduce((acc, cur, i, arr) => {
      if (i === 0) {
        acc = acc.merge({
          name: cur.rover.name,
          status: cur.rover.status,
          landingDate: cur.rover.landing_date,
          launchDate: cur.rover.launch_date,
          image: List(),
        });
      }

      if (i < 6) {
        // Only add the latest 6 images to the list
        return acc.update("image", (imageList) => imageList.push(cur.img_src));
      }

      return acc;
    }, Map());

  return newState.toJS();
};

// Pure function to render the App
const App = (state) => {
  return `
    <header>
      <nav>
        <ul class="nav-list">          
          <li><a class="home-button nav-item" href="/">Home</a></li>
          <li><a class="nav-item" href="#" class="curiosity-button" data-rover="curiosity">Curiosity</a></li>
          <li><a class="nav-item" href="#" class="spirit-button" data-rover="spirit">Spirit</a></li>
          <li><a class="nav-item" href="#" class="opportunity-button" data-rover="opportunity">Opportunity</a></li>  
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
        <div class="image-grid">
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
    .map((image) => `<div class="image-container"><img src="${image}"/></div>`)
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
