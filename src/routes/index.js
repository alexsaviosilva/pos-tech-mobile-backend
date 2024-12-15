import express from "express";
import autores from "./autoresRoutes.js"; 
import post from "./postsRoutes.js"; 
import auth from "./authRoutes.js";
import area from "./areaRoutes.js"; 
import { serveSwagger, setupSwagger } from "../config/swagger.js"; 

const routes = (app) => {
  app.route("/").get((req, res) => res.status(200).send("Challenge - 2"));

  app.use(express.json());

  app.use("/autores", autores); 
  app.use("/posts", post); 
  app.use("/auth", auth); 
  app.use("/area", area); 
 
  app.use("/api-docs", serveSwagger, setupSwagger);
};

export default routes;
