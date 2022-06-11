import server from "./src/app.js";

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(
    `------------------ Server Started on Port ${process.env.PORT} ------------------`
  );
});
