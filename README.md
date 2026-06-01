# WEATHERLY

A lightweight, static weather lookup app built with HTML, CSS, and vanilla JavaScript. Designed for direct deployment to GitHub Pages.

## Features

- City and country lookup for current weather
- Displays temperature, conditions, humidity, and wind speed
- Uses OpenWeatherMap current weather API
- Minimal, responsive design with icon-driven results
- No build step required

## How to use

1. Obtain a free API key from OpenWeatherMap: https://openweathermap.org/api
2. Open the app in a browser and enter your API key in the form.
3. Search by city and country, then click `Get Weather`.
4. Deploy the repository to GitHub Pages for public access.

## Deploy to GitHub Pages

1. Create a GitHub repository and push this project.
2. In GitHub repository settings, enable GitHub Pages for the `main` branch (or whichever branch you use).
3. Set the publishing source to the repository root.
4. Visit the published URL shown by GitHub Pages.

## Notes on API keys

- This app is fully client-side, so the API key is visible in the browser bundle.
- Do not commit a private API key to a public repository.
- Use a free-tier key and consider restricting it to your GitHub Pages site if OpenWeatherMap supports restrictions.

## Files

- `index.html` — main page layout
- `styles.css` — responsive minimalist styling
- `script.js` — weather fetch and UI logic
- `weather.py` — existing Python example script (not required for the web app)
