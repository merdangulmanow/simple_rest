const {Category} = require('../models/models');
const uuid = require("uuid");
const path = require("path");
const sharp = require('sharp')
const multer = require('multer')
const storage = multer.memoryStorage();
const uploads = multer({storage})
const fs = require('fs')
uploads.array('img', 1);
class CategoryController{
    
    async create(req, res, next){
        try{
            const {name }= req.body
            const condidate = await Category.findOne( {  where : {name : name }  } )
            if (condidate){
                return res.json({success : false, message:"Уже зарегистрирован!"})
            }
            if (req.files != undefined){
                const {img} = req.files
                if (img != undefined){
                    let fileName = uuid.v4()+".jpg"
                    const savePath =path.join(__dirname, '../static/'+fileName);
                    await sharp(img.data).toFile(savePath);
                    const category = await Category.create({name, icon : fileName})
                    // req.io.emit('new_category', category);
                    return res.json({category, success : true, message:"Successfully created!"})
                } 
            } else {
                const category = await Category.create({name});
                // req.io.emit('new_category', category);
                return res.json({category, success : true, message:"Successfully created!"});
            }
        }
        catch (e){
            return res.json({success : false, message : e.message})
        }
    }   
    
    async getAll(req, res, next){
        try {
            req.io.emit('message', {msg : "Hello new clinet "});
            const {lang} = req.body;
            const categories = await Category.findAll({
                    order: [
                        ['id', 'ASC'],
                    ]
                })
            
            return res.json(categories)
        }
        catch (e){
            return res.json({success : false, message : e.message})
        }
    }

}

module.exports = new CategoryController()