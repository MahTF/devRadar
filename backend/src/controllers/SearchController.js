const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');


module.exports = {
    async index(req, res) {
        //Buscar todos os devs num raio de 10km e filtrar por techs
        const { latitude, longitude, techs } = req.query;

        const techsArray = parseStringAsArray(techs);

        const devs = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000, //Distancia em metros
                },
            },
        });

        return res.json({ devs });
    }
};