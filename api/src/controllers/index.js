class ModelCrud{
    constructor(model){
        this.model = model;
    }
    getAll = (req, res, next) => {
        return this.model.findAll()
            .then(element => res.send(element))
            .catch((error) => next(error))
    };
    
    getById = (req, res, next) => {
        const id = req.params.id;
        return this.model.findByPk(id)        
            .then(element => res.send(element))
            .catch((error) => next(error))
    };
    
    post = (req, res, next) => {
        const element = req.body;
        return this.model.create(element)        
            .then(element => res.send(element))
            .catch((error) => next(error))
    };
    
    modify = (req, res, next) => {
        const id = req.params.id
        const element = req.body;
        return this.model.update(element, {where: {id,}})        
            .then(element => res.send(element))
            .catch((error) => next(error))
    };
    
    deleteElement = (req, res, next) => {
        const id = req.params.id
        return this.model.destroy({where: {id}})        
            .then( () => res.sendStatus(200))
            .catch((error) => next(error))
    };
}

module.exports = { ModelCrud: ModelCrud };
