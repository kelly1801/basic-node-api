import express from "express";
import cors from 'cors';
import { router } from "../routes/user.route.js";
import { dbConnection } from "../db/config.db.js";
export default class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.pathUsers = '/api/users'
    this.connectDB()
    this.middlewares();
    this.routes();
  }

  // connect db

  async connectDB() {
    await dbConnection()
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
