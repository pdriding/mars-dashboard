"use strict";

const { Map, List } = Immutable;

const root = document.getElementById("root");
const curiosityBtn = document.getElementById("curiosity-button");
const spiritBtn = document.getElementById("spirit-button");
const opportunityBtn = document.getElementById("opportunity-button");

// Initial state
const initialState = Map({
  rover: "",
  status: "",
  landingDate: "",
  launchDate: "",
  images: List([]),
});

// Pure function to update the state
const updateState = (oldState, newState) => {
  return oldState.merge(newState);
};

// Pure function to create a new state
const createNewState = (rover, data) => {
  return Map({
    rover: rover,
    status: data.image.photos[0].rover.status,
    landingDate: data.image.photos[0].rover.landing_date,
    launchDate: data.image.photos[0].rover.launch_date,
    images: List(data.image.photos.slice(0, 6)),
  });
};

// Pure function to generate the UI markup
const renderUI = (root, state) => {
  root.innerHTML = App(state);
};

// Pure function to create the UI markup
const App = (state) => {
  if (!state) {
    return `
    <h1 id="loading">Loading...</h1>
    `;
  }

  const { rover, images, status, landingDate, launchDate } = state.toJS();
  return `
      <header>
      <nav>
        <ul class="nav-list">
          <li><a class="home-button nav-item" href="/">Home</a></li>
          <li><a class="nav-item curiosity-button" href="#" data-rover="curiosity">Curiosity</a></li>
          <li><a class="nav-item opportunity-button" href="#" data-rover="opportunity">Opportunity</a></li>
          <li><a class="nav-item spirit-button" href="#" data-rover="spirit">Spirit</a></li>
          
        </ul>
      </nav>
    </header>
    <main class="rover-container">
      <h1 class="rover-name">${capitalizeFirstLetter(rover)}</h1>
      <section>
        <h3 class="launch-date">This NASA rover left Earth on ${launchDate} and landed on Mars on ${landingDate}. Its status is currently ${status}.</h3>
        <div class="image-grid image-container">
          ${createImageGrid(images)}
        </div>
      </section>
    </main>
    <footer></footer>

  `;
};

const capitalizeFirstLetter = function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Pure function to create the image grid markup
const createImageGrid = (images) => {
  const imageGrid = images
    .map(
      (image) =>
        `<img class="grid-item" src="${image.img_src}" alt="Nasa Rover Image">`
    )
    .join("");

  return imageGrid;
};

// Pure function to handle user actions (returns a new state)
const updateStateOnRoverClick = async (rover, currentState) => {
  try {
    const data = await fetchData(rover);
    const state = createNewState(rover, data);

    // Update the state
    return updateState(currentState, state);
  } catch (error) {
    console.error("Error fetching data:", error);
    return currentState;
  }
};

// Pure function to fetch data (replace this with your actual API call)
const fetchData = async (rover) => {
  // Replace this with your actual API URL
  const apiUrl = `http://localhost:3000/${rover}`;
  const data = await fetch(apiUrl).then((res) => res.json());

  return data;
};

// Event listeners (using the pure functions)
window.addEventListener("load", () => {
  document.addEventListener("click", async (event) => {
    const target = event.target;
    if (target.matches(".nav-list a[data-rover]")) {
      event.preventDefault();
      renderUI(root);
      const newState = await updateStateOnRoverClick(
        target.dataset.rover,
        initialState
      );
      renderUI(root, newState);
    }
  });

  curiosityBtn.addEventListener("click", async () => {
    renderUI(root);
    const newState = await updateStateOnRoverClick("curiosity", initialState);
    renderUI(root, newState);
  });

  opportunityBtn.addEventListener("click", async () => {
    renderUI(root);
    const newState = await updateStateOnRoverClick("opportunity", initialState);
    renderUI(root, newState);
  });

  spiritBtn.addEventListener("click", async () => {
    renderUI(root);
    const newState = await updateStateOnRoverClick("spirit", initialState);
    renderUI(root, newState);
  });
});
