export const url = "https://wft-geo-db.p.rapidapi.com/v1/geo";
export const optionsOfApi = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};

export const weatherUrl = "https://api.openweathermap.org/data/2.5";
export const weather_key = "9dfe23ea8634813a81a378b00b50c2a4";
