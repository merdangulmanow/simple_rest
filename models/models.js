const sequelize = require('../db')
const {DataTypes} = require('sequelize')


const Category = sequelize.define('category', {
    id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true,allowNull: false},
    icon : {type:DataTypes.TEXT, defaultValue:'no-image'}
})

const Service = sequelize.define('service', {
    id: {type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name: {type: DataTypes.STRING, unique: true,allowNull: false},
    point : {type : DataTypes.INTEGER, defaultValue : 1, allowNull : false},
    icon : {type:DataTypes.TEXT, defaultValue:'no-image'}
})

/// Relationship for service and category
Category.hasMany(Service)
Service.belongsTo(Category)


module.exports = {
    Category,
    Service
}