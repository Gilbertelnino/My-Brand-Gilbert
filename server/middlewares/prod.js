import helmet from "helmet";
import compression from "compression";

const prodMiddleware = (app) => {
  app.use(helmet());
  app.use(compression());
};

export default prodMiddleware;
