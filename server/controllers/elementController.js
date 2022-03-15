const uuid = require('uuid')
const path = require('path')
const {Element, ElementInfo} = require('../models/models')
const ApiError = require('../error/ApiError')

class ElementController {
    async create(req, res, next){
        try {
            let {name, price, typeId, brandId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))

            if(info){
                info = JSON.parse(info)
                info.forEach(i => {
                    ElementInfo.create({
                        title: i.title,
                        description: i.description,
                        elementId: element.id
                    })
                })
            }

            const element = await Element.create({name, price, typeId, brandId, img: fileName})

            return res.json(element)
        } catch (e){
            next(ApiError.badRequest(e.message))
        }

    }
    async getAll(req, res){
        let {typeId, brandId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit

        let elements;
        if (!brandId && !typeId){
            elements = await Element.findAndCountAll({limit, offset})
        }
        if (brandId && !typeId){
            console.log(brandId)
            elements = await Element.findAndCountAll({where: {brandId}, limit, offset})
        }
        if (!brandId && typeId){
            elements = await Element.findAndCountAll({where: {typeId}, limit, offset})
        }
        if (brandId && typeId){
            elements = await Element.findAndCountAll({where: {typeId, brandId}, limit, offset})
        }
        return res.json(elements)
    }
    async getOne(req, res){
        const {id} = req.params
        const element = await Element.findOne(
            {
                where: {id},
                include: [{model: ElementInfo, as: 'info'}]
            }
        )
        return res.json(element)
    }
}

module.exports = new ElementController()