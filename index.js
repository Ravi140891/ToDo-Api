const Hapi = require("@hapi/hapi");
const userRoutes = require("./routes/users");
const todoRoutes = require("./routes/todoRoutes");

const init = async () => {
  const server = Hapi.server({
    port: 8000,
    host: "localhost",
  });

  server.route(userRoutes);
  server.route(todoRoutes);

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
