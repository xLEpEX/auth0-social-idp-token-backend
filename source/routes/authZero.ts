import express from 'express';
import controller from '../controllers/auth0/idpTokenData';

const router = express.Router();

router.get('/:connection/token/', controller.getIdpTokenData);

export = router;
