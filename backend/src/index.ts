import express from "express";
import logger from "./logger";
import { connectionDB } from "./db/connectionDB";
import recipesRoutes from "./routes/recipes";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/recipes", recipesRoutes);

// app.get('/', (req: any, res: { send: (arg0: string) => void }) => {
//   res.send('Hello World!')
// })

app.listen(port, async () => {
  logger.info(`Serveur démarré sur le port ${port}`);
  try {
    await connectionDB();
  } catch (err) {
    logger.error("Connexion DB échouée");
  }
});

