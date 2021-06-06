const {Brand} = require('../models/models');
const ApiErrors = require('../error/ApiError');

class BrandController{
    async create(req, res, next){
        try{
         const {name} = req.body;
         if(!name) return ApiErrors.internal('Не указано название бренда');
         const brand = await Brand.create({name});
         return res.json(brand);
        }catch(e){
           return next(ApiErrors.internal(e.message));
        }
    }
    async getAll(req, res, next){
        try{
            const brands = await Brand.findAll();
            return res.json(brands);
        }catch(e){
          return  next(ApiErrors.internal(e.message));
        }
    }
}

module.exports = new BrandController();