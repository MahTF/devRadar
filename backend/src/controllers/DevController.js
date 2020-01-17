const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');
//index, show, store, update, destroy
//mostrar lista, mostrar unico, criar, editar, deletar


module.exports = {
    async index(req, res) {
        const devs = await Dev.find();
        return res.json(devs);
    },

    async store(req, res) {
        const { github_username, techs, latitude, longitude } = req.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)
            //Se o nome não existir, vai pegar o login
            const { name = login, avatar_url, bio } = apiResponse.data;

            const techsArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            })


            //Filtrar conexões que estão no máximo 10km de distancia, e que tenha uma das techs no filtro
            const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                techsArray,
            );

            sendSocketMessageTo(sendSocketMessageTo, 'new-dev', dev);
        }
        return res.json(dev);
    }
};