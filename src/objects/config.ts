const isProd = window.location.hostname !== "localhost";

export const backendURL: string = isProd
  ? "https://api.onecityperday.com/cities"
  : "http://localhost:8080/cities";
