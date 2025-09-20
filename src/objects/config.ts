const isProd = window.location.hostname !== "localhost";

export const backendURL: string = isProd
  ? "https://onecityperday-backend-976609dd802a.herokuapp.com/cities"
  : "http://localhost:8080/cities";
