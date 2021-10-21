import express from "express";
import swaggerUi from "swagger-ui-express";
import cors from 'cors'

import swaggerConfig from "./swagger.json";
import { router } from "./routes";

const app = express();

app.use(cors())

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerConfig));

app.use(router);

app.listen(3333);
