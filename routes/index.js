const authRouter = require("./auth");
const usersRouter = require("./users");
const todosRouter = require('./todos');

module.exports = (app) => {
  app.use("/api/auth", authRouter);
  app.use("/api/users", usersRouter);
  app.use("/api/todos", todosRouter);
  app.use((err, req, res, next) => {
    if(err instanceof ReferenceError){
      console.log('here')
      return res.status(500).send({
        message: "Internal server error",
        error: err.name
      });
    }
    console.log(err)
    return  res.status(404).send({
      message: "Not found",
    });
  });
};
