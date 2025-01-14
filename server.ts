import app from "./app";
import logger from "./shared/utils/logger";
import { ENV_CONFIG } from './config/environment';

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    logger.info(`${ENV_CONFIG.APP_NAME} is successfully initiated on port: ${port}`);
});