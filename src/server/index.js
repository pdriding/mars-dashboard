require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const path = require("path");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", express.static(path.join(__dirname, "../public")));

// Helper function to fetch rover photos
const fetchRoverPhotos = async (roverName) => {
  try {
    const rover = await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?sol=1000&api_key=${process.env.API_KEY}`
    ).then((res) => res.json());
    return Object.values(rover).flat();
  } catch (err) {
    console.log("error:", err);
    return [];
  }
};

app.get("/opportunity", async (req, res) => {
  const photos = await fetchRoverPhotos("opportunity");
  res.send(photos);
});

app.get("/curiosity", async (req, res) => {
  const photos = await fetchRoverPhotos("curiosity");
  res.send(photos);
});

app.get("/spirit", async (req, res) => {
  const photos = await fetchRoverPhotos("spirit");
  res.send(photos);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
