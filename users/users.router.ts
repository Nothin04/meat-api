import {ModelRouter} from '../common/model-router'
import * as restify from 'restify'
import {NotFoundError} from 'restify-errors'
import {User} from './users.model'
import { version } from 'mongoose'


class UsersRouter extends ModelRouter<User> {

    constructor(){
        super(User)
        this.on('beforeRender', document=>{
            document.password = undefined
        })
    }
    //filtro
    findByEmail =(req, res, next)=>{
        if(req.query.email){
            
            User.findByEmail(req.query.email)
            .then(user => {
                if(user){
                    return [user]
                }else{
                    return []
                }
            })
            .then(this.renderAll(res,next))
            .catch(next)
        }else{
            next()
        }
    }
    //filtro
    findByName = (req, res, next)=>{
        if(req.query.name){
            
            User.find({name: new RegExp('^'+ req.query.name+'$','i')})
            .then(this.renderAll(res,next))
            .catch(next)
        }else{
            next()
        }
    }

    applyRoutes(application: restify.Server){

    application.get({path: `${this.basePath}`, version: '2.0.0'}, [this.findByEmail, this.findByName,this.findAll])
    // application.get({path: `${this.basePath}`, version: '1.0.0'}, this.findAll)
    application.get(`${this.basePath}/:id`, [this.validateId, this.findById])
    application.post(`${this.basePath}`, this.save)
    application.put(`${this.basePath}/:id`, [this.validateId, this.replace])
    application.patch(`${this.basePath}/:id`, [this.validateId, this.update])
    application.del(`${this.basePath}/:id`, [this.validateId, this.delete])

    }
}

export const usersRouter = new UsersRouter()

