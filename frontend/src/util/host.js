const HOST =
  process.env.NODE_ENV === "production"
    ? "https://capicua-app.herokuapp.com/"
    : "http://localhost:5000";
export default HOST;
