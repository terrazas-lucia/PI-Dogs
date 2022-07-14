// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Router } = require('express');
const axios = require('axios');
const {Dog, Temperament} = require('../db');
const {getApiinfo, getDbInfo, getAllDogs} = require('controllers');
const { DataTypes } = require('sequelize/types');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/dogs', async (req, res) => {
    const {name} = req.query;
    let dogsTotal = await getAllDogs();
    if(name){ //query
        let dogName = dogsTotal.filter(el => el.name.toLowerCase() === name.toLowerCase());
        if(dogName?.length){
            return res.status(200).send(dogName);
        } 
    
        let dogDb = await Dog.findOne({where: {name}});
        if(dogDb){
            return res.status(200).json({...dogDb, temperament: dogDb.temperament});
        }   
        return res.status(404).json({msg: "No se encontro el perreque :("});
    } else{
        res.status(200).send(dogsTotal);
    }
});

router.get('/dogs/:id', async (req, res) => {
    const id = req.params.id;
    const dogsTotal = await getAllDogs();
    if(id){
        const dogId = dogsTotal.filter(el => el.id == id);
        dogId.length ? res.status(200).json(dogId) : res.status(404).send({msg: "No se encontro el perreque :("});
    }
});

router.post('/dogs', async (req, res) => {
    const{name, weight, height, lifespan, temperament} = req.body;
    const [dogCreated] = await Dog.findOrCreate({
        name, weight, height, lifespan, temperament
    });
    const temperamentInDb = await Temperament.findOne({where: {name: temperament}});
    dogCreated.add(temperamentInDb);
    res.send({msg: "Perreque creado con exito :)"});
});

router.get('/temperaments', async (req, res) => {
    const temperament = await Temperament.findAll();
    if(temperament.length === 0){
        
    }
})



module.exports = router;
