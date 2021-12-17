const {Category, Service, ServicePrices} = require('../models/models');
const {Op} =require('sequelize');
const uuid = require("uuid");
const path = require("path");
const sharp = require('sharp')
const multer = require('multer')
const storage = multer.memoryStorage();
const uploads = multer({storage})
const fs = require('fs')
uploads.array('img', 1);

class ServiceController{
    async create (req, res, next){
        try{
            //// bashda shol category ID-ly service barmy shony bilmeli
            const {name, categoryId} = req.body
            var {point} = req.body || 1;
            if (!name || !categoryId )
            {
                return res.json({success : false, message:"Заполните все поля!"})
            }
            const condidate = await Service.findOne( {  where : {name, categoryId }  } )
            if (condidate){
                return res.json({success : false, message:"Уже зарегистрирован!"})
            }
            let service = {};
            if (req.files != undefined){
                const {img} = req.files
                if (img != undefined){
                    let fileName = uuid.v4()+".jpg"
                    const savePath =path.join(__dirname, '../static/'+fileName);
                    await sharp(img.data).toFile(savePath);
                    service = await Service.create({name : name, categoryId : categoryId, point : point, icon : fileName});  
                } 
            } else {
                service = await Service.create({name, categoryId});
            }
            
            req.io.emit('new_service', service);
            return res.json({service, message:"Successfully created!"});
        }
        catch (e){
            return res.json({message:e.message})
        }
    }

    async getAll (req, res){
        try{
            const services = await Service.findAll({ 
                include: [
                    {
                        model:Category,
                        attributes:['name', 'icon']
                    }
                ]
            });
           
            return res.json(services);
        }
        catch (e){
            return res.json({message : e.message})
        }
    }

    async getByCategory(req, res){
        try{
            const {categoryId} = req.params;
            const {lang} = req.body
            if(!categoryId){
                return res.json({success : false, message : "empty"})
            }
            const services = await Service.findAll({ order: [['id', 'ASC']],
                    where:{categoryId: categoryId}, order: [ ['id', 'ASC'] ],
                });
            
            return res.json(services)
        }
        catch (e){
            return res.json({success : false, message : e.message})
        }
    }

}

module.exports = new ServiceController()