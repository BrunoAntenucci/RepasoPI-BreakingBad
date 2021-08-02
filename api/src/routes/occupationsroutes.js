const { Router } = require('express');

const router = Router();

const { getAllOccupations } = require('../controllers/occupations.js')

router.get('/occupations', (req, res) => {
    res.status(200).send(getAllOccupations);
})
module.exports = router;