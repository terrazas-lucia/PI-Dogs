// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Router } = require('express');
const {homeRoute, homeId, createDog, getTemperament} = require('./controllers');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/dogs', homeRoute);

router.get('/dogs/:id', homeId);

router.post('/dogs', createDog);

router.get('/temperaments', getTemperament);


module.exports = router;
