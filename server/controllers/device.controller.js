const {Device, DeviceInfo} =require('../models/models')
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');

class DeviceController{
    async create(req, res, next){
        try{
            let {name, price, brandId, typeId, info} = req.body;
            const {img} = req.files;
            let fileName = uuid.v4() + '.jpg';
            await img.mv(path.resolve(__dirname, '..', 'static', fileName));
            const device = await Device.create({name, price, brandId, typeId, img:fileName});
            if(info){
                info = JSON.parse(info);
                info.forEach(i=>{
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                })
            }
            return res.json(device);
        }catch (e){
            return next(ApiError.internal(e.message || e));
        }
    }
    async getAll(req, res){
        let {brandId, typeId, limit, page} = req.query;
        let devices;
        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;
        if(brandId && typeId){
            devices =await Device.findAndCountAll({where:{typeId, brandId}, limit, offset});
        }
        if(brandId && !typeId){
            devices =await Device.findAndCountAll({where: {brandId}, limit, offset});
        }
        if(!brandId && typeId){
            devices =await Device.findAndCountAll({where: {typeId}, limit, offset});
        }
        if(!brandId && !typeId){
            devices =await Device.findAndCountAll({limit, offset});
        }
        return res.json(devices);
    }
    async getOne(req, res, next){
        const {id} = req.params;
        if(!id) next(ApiError.badRequest('Нет такого товара'));
        try{
            const device = await Device.findOne(
                {
                    where: {id},
                    include: [{model: DeviceInfo, as: 'info'}]
                }
            );
            return res.json(device);
        }catch (e){
            next(ApiError.internal(e.message))
        }
    }
}

module.exports = new DeviceController();