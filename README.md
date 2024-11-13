# Vue Weather App

[Live Demo](https://vadym4che.github.io/vue-weather-app/)

## Project structure

```plaintext
vue-weather-app/
|-- node_modules/
|-- public/
|-- src/
|   |-- components/
|   |   |-- AutocompleteInput.vue
|   |   |-- CityWeather.vue
|   |   |-- DaysToDisplay.vue
|   |   |-- FooterView.vue
|   |   |-- HeaderView.vue
|   |   |-- LineChart.vue
|   |   |-- NavigationBar.vue
|   |   |-- PreLoader.vue
|   |   |-- ToggleLang.vue
|   |   |-- ToggleTheme.vue
|   |   |-- WarningError.vue
|   |-- helpers/
|   |   |-- extractCity.js
|   |   |-- getAveragesT.js
|   |   |-- getLocal.js
|   |   |-- ipDefaultObject.js
|   |   |-- ipInfoHelper.js
|   |   |-- translateHelper.js
|   |   |-- weatherHelper.js
|   |-- views/
|   |   |-- 404.vue
|   |   |-- Favorites.vue
|   |   |-- Home.vue
|   |-- App.vue
|   |-- clickOutside.js
|   |-- i18n.js
|   |-- router.js
|   |-- main.js
|   |-- style.css
|-- .env.example
|-- index.html
|-- package.json
|-- postinstall.mjs
|-- README.md
|-- vite.config.js
```

## Functionality

### 1. City Autocomplete Input
Input field with city autocomplete functionality powered by Google Maps API. To not to invent a bycicle I've just found nice and simple implementation on [npmjs.com](https://www.npmjs.com/) : [vue3-google-autocomplete](https://www.npmjs.com/package/vue3-google-autocomplete) and integrated it to my app.  

![autocomplete-input](https://github.com/vadym4che/vue-weather-app/blob/main/docs/01_autocomplete.jpg)

### 2. API Requests
Utilize axios for making API requests to [Open-Meteo.com](https://open-meteo.com/), - free open-source weather API.  

![open-meteo-api](https://github.com/vadym4che/vue-weather-app/blob/main/docs/02_open-meteo-API.jpg)


### 3. Current Weather Card
Display weather information for the current day in the form of a card.  

![weather-card](https://github.com/vadym4che/vue-weather-app/blob/main/docs/03_weather_card.jpg)

### 4. Hourly Temperature Graph
Show an hourly temperature graph for the current day using any JS plugin [Vue-chartjs](https://vue-chartjs.org/).  

![hourly-graph](https://github.com/vadym4che/vue-weather-app/blob/main/docs/04_hourly.jpg)

### 5. Multiple Weather Blocks
Users are allowed to create multiple weather blocks for different cities. The default is one block, and by clicking the "+" button, another block is added with full functionality. Limit to a maximum of 5 blocks.  

![multiple-blocks](https://github.com/vadym4che/vue-weather-app/blob/main/docs/05_multiple_blocks.jpg)

### 6. Block Deletion
Implemented the ability to delete blocks, prompting a modal confirmation.  

![delete-prompt](https://github.com/vadym4che/vue-weather-app/blob/main/docs/06_delete_prompt.jpg)

### 7. Favorites Tab
Created a "Favorites" tab where users can add or remove cities. The selected city on the weather card is highlighted with an icon. In the tab, weather blocks for added cities are displayed with only the option to switch between "Day" and "Week." Favorite cities are stored in Local Storage, limiting to a maximum of 5. Modal window is displayed if the limit is exceeded, suggesting the user to remove a city. I've also used `vue-router` there.  

![favorites1](https://github.com/vadym4che/vue-weather-app/blob/main/docs/07_favorites_no_pinned.jpg)

### 8. Responsiveness
Application is responsive. In implementing responsiveness SCSS and CSS @media are used. Also relative units like `rem`, `%` are used.  

<p>
<img width="400" src="https://github.com/vadym4che/vue-weather-app/blob/main/docs/08_responsiveness.jpg" alt="responsivness1">
<img width="400" src="https://github.com/vadym4che/vue-weather-app/blob/main/docs/08_responsiveness_code.jpg" alt="responsivness2">
</p>

### 9. Day/5 Days Toggle \*
toggle for displaying "Day" or "5 Days" weather added. The weather card and graph are adapted accordingly, considering the average temperature from hourly statistics for the day.  

<p>
<img width="400" src="https://github.com/vadym4che/vue-weather-app/blob/main/docs/09_days_toggler1.jpg" alt="days-toggler1">
<img width="400" src="https://github.com/vadym4che/vue-weather-app/blob/main/docs/09_days_toggler5.jpg" alt="days-toggler2">
</p>

### 10. Default User Location \*
The weather is displayed for the user's location determined by IP address.
Actually I've implemented this * at first step with [geoapify.com](https://apidocs.geoapify.com/) platform, - I'd say - It is cool (and accurate)! [IP-geolocation playground](https://apidocs.geoapify.com/playground/ip-geolocation/)  

<p align=center>
<img src="https://github.com/vadym4che/vue-weather-app/blob/main/docs/logo-geoapify.png" alt="logo geoapify">
</p>

<p>
<img width="400" src="https://github.com/vadym4che/vue-weather-app/blob/main/docs/10_autodetect_ip1.jpg" alt="autodetect-ip1">
<img width="400" src="https://github.com/vadym4che/vue-weather-app/blob/main/docs/10_autodetect_ip2.jpg" alt="autodetect-ip2">
</p>

### 11. Preloaders \*\*
I'm proud of my 'pure CSS' preloader, wich I've developed and integrated where necessary, such as during API requests.  

![preloader](https://github.com/vadym4che/vue-weather-app/blob/main/docs/11_preloader.jpg)
I've created dedicated route to easily watch loader animation without any code changing to invoke it: [PreLoader.vue](https://vadym4che.github.io/vue-weather-app/preloader).

### 12. Multilingual Support \*\*\*
It's second thing I was very interested - so I've implemented it firstly withing location autodetect.
App providing multilingual support for the interface and API responses in English (en) and Ukrainian (uk).
It can be toggled via custom select-option component allowing use flags of countries (i.e. the U.K and Ukraine flags in our case).  

<p>
<img width="400" src="https://github.com/vadym4che/vue-weather-app/blob/main/docs/12_multilang-uk.jpg" alt="multilang1">
<img width="400" src="https://github.com/vadym4che/vue-weather-app/blob/main/docs/12_multilang-en.jpg" alt="multilang2">
</p>

### 13. Day/Night Mode \*\*\*\*
Rather then implementing a switching between displaying "Day" and "Night" weather (based on `sunrise` and `sunset` API response fields), I've decided to add a toggling between Day and Night theme-view modes.  

![theme-toggler](https://github.com/vadym4che/vue-weather-app/blob/main/docs/13_day-night.jpg)

## Getting Started

Follow these steps to run the project locally:

1. Install dependencies: `npm install`
```shell
npm install
```
This command will install all neccesary dependencies and automatically create `.env` file for your project.

2. Fill in `.env` with your Geoapify.com and Google Maps API-keys (and optionally GithHub-pages base URL)

3. Start the development server: `npm run dev`
```shell
npm run dev
```

...

(č) vadym4che
