import express from "express";
import cors from "cors";
import { router } from "../routes/user.route.js";
import { dbConnection } from "../db/config.db.js";
import { authRouter } from "../routes/auth.route.js";
import { catRouter } from "../routes/categories.route.js";
export default class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      auth: "/api/auth",
      users: "/api/users",
      categories: "/api/categories",
    };

    this.connectDB();
    this.middlewares();
    this.routes();
  }

  // connect db

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    // cors
    this.app.use(cors());
    // parse body
    this.app.use(express.json());
    // public folder
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.paths.auth, authRouter);
    this.app.use(this.paths.users, router);
    this.app.use(this.paths.categories, catRouter);
  }

  listenPort() {
    this.app.listen(this.port, () => {
      console.log(`server running on port: ${this.port}`);
    });
  }
}
