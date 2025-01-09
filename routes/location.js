import express from 'express';
import { createLocation, searchLocations } from '../controllers/location.js';

const router = express.Router();

router.post('/', createLocation);
router.get('/', searchLocations);

export default router;
