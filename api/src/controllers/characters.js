const { ModelCrud } = require("./index.js");

const { Character, Occupation } = require("../db.js");

const axios = require('axios');

class CharacterModel extends ModelCrud {
    constructor(model){
        super(model)
    }
    getFromApi = async(req, res) => {
        const apiUrl = await axios.get('https://breakingbadapi.com/api/characters') 
        const apiInfo = await apiUrl.data.map(e => {
            return {
                id: e.char_id,
                name: e.name,
                nickname: e.nickname,
                birthday: e.birthday,
                status: e.status,
                occupation: e.occupation.map(e => e),
                img: e.img,
                appearance: e.appearance.map(e => e),
            };
        });
        console.log(apiInfo)
        return apiInfo;
    };
    getDbInfo = async(req, res) => {
        return await Character.findAll({
            include: {
                model: Occupation,
                attributes: ['name'],
                through: {
                    attributes: [],
                }
            }
        })
    }
    getAllCharacters = async () => {
        const apiInfo = await this.getFromApi();
        const dbInfo = await this.getDbInfo();
        const infoTotal = apiInfo.concat(dbInfo);
        return infoTotal;
    }
    postNewCharacter = async (req, _res) => {
        let { 
            name, 
            nickname, 
            birthday, 
            status, 
            img, 
            createdInDb, 
            occupation } = req.body;

        let characterCreated = await Character.create({ 
            name, 
            nickname, 
            birthday, 
            status, 
            img, 
            createdInDb })

        let occupationDb = await Occupation.findAll({ where: {name: occupation} })
        characterCreated.addOccupation(occupationDb);
    }

}

const characterController = new CharacterModel(Character);

module.export = characterController;