const { ModelCrud, getAll, getById, post, modify, deleteElement } = require("./index.js");

const { Character, Occupation } = require("../db.js");

const axios = require('axios');

class OccupationModel extends ModelCrud {
    constructor(model){
        super(model)
    }
    getAllOccupations = async(_req, _res) => {
        const occupationsApi = await axios.get('https://breakingbadapi.com/api/characters');
        const occupations = occupationsApi.data.map(e => e.occupation);
        const occupEach = occupations.map(e => {
            for (let i = 0; i < e.length; i++) return e[i]
        });
        occupEach.forEach(e => {
            Occupation.findOrCreate(
                {
                    where: {name: e}
                }
            )
        })
        const allOccupations = await Occupation.findAll();
        return allOccupations;
    }
}

module.exports = OccupationModel;