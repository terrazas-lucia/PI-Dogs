const axios = require('axios');
const Dog = require('../models/Dog');

const getApiinfo = async() =>{
    const apiUrl = await axios.get("https://api.thedogapi.com/v1/breeds?api_key=ACAVALAAPIKEY");
    const apiInfo = apiUrl.map(el => {
        return{
            id: el.id,
            name: el.name,
            weight: el.weight.metric,
            height: el.height.metric,
            bred_for: el.bred_for,
            breed_group: el.breed_group,
            life_span: el.life_span,
            temperament: el.temperament,
            origin: el.origin,
            reference_image_id: el.reference_image_id,
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
