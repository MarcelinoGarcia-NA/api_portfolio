const express = require("express");
const routes = express.Router();

const UserController= require("./controllers/UserController");

const AuthenticateController= require("./controllers/Authenticate");
const AuthMiddlewares= require('./middlewares/auth');

routes.post("/users",UserController.store);
routes.put("/users/:id",UserController.update);
routes.put("/users/regainAccess/:email",UserController.reaginAccess);
routes.get("/users",UserController.list);
routes.delete("/users/:id",UserController.destroy);
routes.get("/users/:id",UserController.finduser);
routes.post("/users/submitEmail/",UserController.submitEmailRegainAccess);
routes.post("/authenticate",AuthenticateController.authenticate);

routes.use(AuthMiddlewares);


module.exports = routes;