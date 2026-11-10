# Weather Dashboard

A browser-based weather dashboard built with HTML, CSS, and JavaScript. Search for a city to view current weather from the OpenWeatherMap API.

## Features

- Search weather by city name
- Display temperature, conditions, feels-like temperature, humidity, wind speed, and pressure
- Show loading and error messages
- Save up to five recent searches in the browser
- Reopen a recent search by selecting its button

## Run locally

1. Create an OpenWeather account and copy an API key from your account’s **API keys** page.
2. Copy `config.example.js` and name the copy `config.js`.
3. Open `config.js` and replace the empty value with your API key:

   ```js
   const API_KEY = "your-api-key-here";
   ```

4. Keep `config.js` out of Git. The `.gitignore` file excludes it.
5. Open `index.html` with VS Code Live Server and search for a city.

A new API key may take some time to activate. If the dashboard reports an invalid key, check that it was copied correctly and allow time for activation.

## Deploy to GitHub Pages

The workflow in `.github/workflows/deploy.yml` creates `config.js` during deployment from a GitHub repository secret.

1. In the repository, open **Settings → Secrets and variables → Actions** and add a repository secret named `OPENWEATHER_API_KEY`. Set its value to your API key.
2. In **Settings → Pages**, set the source to **GitHub Actions**.
3. Commit and push the project to the `main` branch, or run the workflow manually from the **Actions** tab.
4. In **Actions**, wait for the deployment workflow to finish, then open the published Pages URL.

Do not put your API key in this README, `app.js`, or `config.example.js`, and do not commit `config.js`. A front-end app must send its API key to the browser to make requests; the deployment workflow keeps the key out of Git history, but it is still visible to site visitors. This is suitable for this learning project and a limited free-tier key.

## Project files

- `index.html` — dashboard structure
- `styles.css` — page styling
- `app.js` — weather requests, display, error handling, and recent searches
- `config.example.js` — safe template for local configuration
- `.github/workflows/deploy.yml` — GitHub Pages deployment workflow
