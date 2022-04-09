import http from 'http';
import express from 'express';
import { Request, Response, NextFunction } from 'express';
import logging from './utils/logging';
import config from './config/serverConfig';
import discordRoutes from './routes/authZero';
import dotenv from 'dotenv';
var cors = require('cors');
var app = express();
const NAMESPACE = 'Server';
const router = express();

dotenv.config();

router.use(cors());
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

/** Logging the request */
router.use((req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`);
    });

    next();
});

/** Routes */
router.use('/auth0/', discordRoutes);

/** Error Handling */
router.use((req: Request, res: Response, next: NextFunction) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

/** Create the server */
const httpServer = http.createServer(router);
httpServer.listen(config.port, () => logging.info(NAMESPACE, `Server running on ${config.hostname}:${config.port}`));
