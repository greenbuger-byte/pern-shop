const sequelize = require('../db');
    const {DataTypes} = require('sequelize');


const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.STRING, dafaultValue: "USER"}
});


const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true}
});

const BasketDevice = sequelize.define('basket_device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},

});

const Device = sequelize.define('device', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    img: {type: DataTypes.STRING(400), defaultValue: 'no-image.jpg'}
});

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
});

const Brand = sequelize.define('brand', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
});

const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    rate: {type: DataTypes.STRING, unique: true, allowNull: false}
});

const DeviceInfo = sequelize.define('device_info', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    title: {type: DataTypes.STRING,  allowNull: false},
    description: {type: DataTypes.STRING,  allowNull: false}
});

const TypeBrand = sequelize.define('type_brand', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, require: true}
});

User.hasOne(Basket);
Basket.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Basket.hasMany(BasketDevice);
BasketDevice.belongsTo(Basket);

Type.hasMany(Device);
Device.belongsTo(Type);

Brand.hasMany(Device);
Device.belongsTo(Brand);

Device.hasMany(Rating);
Rating.belongsTo(Device);

Device.hasMany(BasketDevice);
BasketDevice.belongsTo(Device);

Device.hasMany(DeviceInfo, {as: 'info'});
DeviceInfo.belongsTo(Device);

Brand.belongsToMany(Type, {through: TypeBrand});
Type.belongsToMany(Brand, {through: TypeBrand});

module.exports = {
    User,
    Basket,
    BasketDevice,
    Rating,
    Device,
    DeviceInfo,
    Brand,
    Type,
    TypeBrand
}
