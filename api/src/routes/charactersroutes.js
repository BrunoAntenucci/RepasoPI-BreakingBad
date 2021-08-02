const { Router } = require('express');

const router = Router();

const characterController = require('../controllers/characters.js')

router.get('/characters', async (req, res) => {
    const name = req.query.name;
    let charactersTotal = await characterController.getAllCharacters();
    if(name){
        let characterName = await charactersTotal.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
        characterName.lenght ? 
        res.status(200).send(characterName) :
        res.status(404).send('No se encuentra el personaje');
    }else{
        res.status(200).send(charactersTotal);
    }
})

router.post('/characters', async (req, res) => {
    characterController.postNewCharacter(req)
    res.status(200).send('Personaje agregado')
})

module.exports = router;