const axios = require('axios');
const {Dog, Temperament} = require('../db');
const APIKEY = process.env.APIKEY;

const getApiInfo = async() =>{
    const {data} = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key={APIKEY}`);
    const apiInfo = data.map(el => {
        return{
            id: el.id,
            name: el.name,
            weight: el.weight.metric,
            height: el.height.metric,
            life_span: el.life_span,
            temperament: el.temperament,
            image: el.image.url,
        }
    });
    return apiInfo;
}

const getDbInfo = async() => {
    return await Dog.findAll({
        model: 'Temperament',
        attributes: ['name'],
        through: {
            attributes: [],
        }
    });
}

const getAllDogs = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
}

const homeRoute = async(req, res) => {
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
};

const homeId = async (req, res) => {
    const id = req.params.id;
    const dogsTotal = await getAllDogs();
    if(id){
        const dogId = dogsTotal.filter(el => el.id == id);
        dogId.length ? res.status(200).json(dogId) : res.status(404).send({msg: "No se encontro el perreque :("});

    }
}

const createDog = async (req, res) => {
    const{name, weight, height, lifespan, temperament, image} = req.body;
    const [dogCreated] = await Dog.findOrCreate({ where: {
        name: name, weight:weight, height:height, lifespan:lifespan, image:image }
    });
    const temperamentInDb = await Temperament.findOne({where: {name: temperament}});
    dogCreated.add(temperamentInDb);
    res.send({msg: "Perreque creado con exito :)"});
}

const getTemperament = async (req, res) => {
   /*  const temperamentDb = await Temperament.findAll();
    if(temperamentDb.lenght === 0){ */
        let dogsTotal = await getApiInfo();
        let allDogsTemperament = dogsTotal.map(el => el.temperament);
        let arraySeparado= []
        let a = allDogsTemperament.map(el => {
            if (el) {
                const separado = el.split(', ')
                separado.forEach(element => {
                    arraySeparado.push(element)
                });
            }
        });
        let filtrados = [];
        for (let i = 0; i < arraySeparado.length; i++) {
            if (!filtrados.includes(arraySeparado[i])) {
                filtrados.push(arraySeparado[i])
            }
        }
        res.status(200).send(filtrados);
   /*  } else{
        res.status(200).send(temperamentDb);
    }*/
}

module.exports = {
    homeRoute: homeRoute,
    homeId: homeId,
    createDog: createDog,
    getTemperament: getTemperament
}