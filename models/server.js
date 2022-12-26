import express from "express";
import cors from 'cors';
import { router } from "../routes/user.route.js";
export default class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3001;
    this.pathUsers = '/api/users'
    this.middlewares();
    this.routes();
  }

  middlewares() {

    // cors
    this.app.use( cors() )
    // parse body
    this.app.use( express.json() )
    // public folder
    this.app.use(express.static("public"));
  }

  routes() {
   
    this.app.use(this.pathUsers, router)
}

  listenPort() {
    this.app.listen(this.port, () => {
      console.log(`server running on port: ${this.port}`);
    });
  }
}
