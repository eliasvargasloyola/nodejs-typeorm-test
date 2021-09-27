import "reflect-metadata";
import { createConnection, getConnectionOptions } from "typeorm";
import * as express from "express";
import { Request, Response } from "express";
import * as bodyParser from "body-parser";
import Routes from "./routes";

(async () => {
  // create express app
  const app = express();
  app.use(bodyParser.json());

// register express routes from defined application routes
  Routes.forEach(route => {
    (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
      const result = (new (route.controller as any))[route.action](req, res, next);
      if (result instanceof Promise) {
        result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);
      } else if (result !== null && result !== undefined) {
        res.json(result);
      }
    });
  });

  const dbOptions = await getConnectionOptions(process.env.NODE_ENV);

  console.log(`The database connection is ${ JSON.stringify(dbOptions) }`);

  // Name always have to be default, this is because TypeORM configs get always the connection named default
  await createConnection({ ...dbOptions, name: 'default' });

  console.log("Database Connected");

  // start express server
  app.listen(3000);

  console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results");
})();
