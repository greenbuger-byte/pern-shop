const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
require('dotenv').config();
const {User, Basket} = require('../models/models');
const jwtToken = require('jsonwebtoken');

const generateJwt = (id, email, role)=>{
    return jwtToken.sign({id, email, role}, process.env.SECRET_KEY, {expiresIn: '24h'});
}

class UserController {
    async registration(req, res, next){
        let {email, password, role} =req.body;
        role = role || 'USER';
        if(!email || !password) return next(ApiError.badRequest('Некорректный email или пароль'));
        const candidate = await User.findOne({where: {email}});
        if(candidate) return next(ApiError.badRequest('Такой пользователь уже существует'));
        const hashPassword = await bcrypt.hash(password, 5);
        const user =await User.create({email, role, password: hashPassword});
        const basket = await Basket.create({userId: user.id});
        const jwt = generateJwt(user.id, user.email, user.role)
        return res.json({token: jwt});
    }
    async login(req, res, next){
        const {email, password} = req.body;
        const user = await User.findOne({where:{email}});
        console.log(user);
        if(!user) return next(ApiError.internal('Пользователь не найден'));
        let comparePassword = bcrypt.compareSync(password, user.password);
        if(!comparePassword) return next(ApiError.badRequest('Неверный логин или пароль'));
        return res.json({token: generateJwt(user.id, user.email, user.role)})
    }
    async check(req, res, next){
        try{
            const token = await generateJwt(req.user.id, req.user.email, req.user.role);
            return res.json({token});
        }catch (err){
            console.log('user controlle => check', err);
            return next(ApiError.internal('Не авторизован'))
        }
    }
}

module.exports = new UserController();

