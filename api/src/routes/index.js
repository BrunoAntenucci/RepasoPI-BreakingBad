const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

const charactersRoutes = require('./charactersroutes.js');
const occupationsRoutes = require('./occupationsroutes.js')

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/characters', charactersRoutes);
router.use('/occupations', occupationsRoutes)


module.exports = router;
