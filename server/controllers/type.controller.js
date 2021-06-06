const {Type} = require('../models/models');
const ApiError = require('../error/ApiError');
class TypeController{
    async create(req, res, next){
        const {name} = req.body;
        if(!name){
            return next(ApiError.badRequest('Не указано название типа'))
        }
        try{

            const type = await Type.create({name});
            return res.json(type);
        }catch (e){
            console.log(e)
            next(ApiError.internal(e.message));
        }
    }
    async getAll(req, res, next){
        try{
            const types = await Type.findAll();
            return res.json(types);
        }catch (e){
            return next(ApiError.internal(e.message))
        }
    }
}

module.exports = new TypeController();