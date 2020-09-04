import * as restify from 'restify'
import * as mongoose from 'mongoose'

import {enviroments} from '../common/enviroments'
import {Router} from '../common/router'
import {mergePatchBodyParser} from './merge-patch.parser'
import {handleError} from './error.handler'

export class Server {

    application: restify.Server

    initializeDb() {
        return mongoose.connect(enviroments.db.url, {            
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    }

    initRoutes(routers: Router[]): Promise<any>{
        return new Promise((resolve, reject) => {
            try{

                this.application = restify.createServer({
                    name: 'meat-api',
                    versions: ['1.0.0', '2.0.0']
                })
                

                this.application.use(restify.plugins.queryParser())
                this.application.use(restify.plugins.bodyParser())
                this.application.use(mergePatchBodyParser)

                //routes
                for (let router of routers) {
                    router.applyRoutes(this.application)                   
                }

                this.application.listen(enviroments.server.port, () => {
                    resolve(this.application)
                })

                this.application.on('restifyError', handleError)
                

            }catch(error){
                reject(error)
            }
        })
    }
    bootstrap(routers: Router[] = []): Promise<Server> {
        return this.initializeDb().then(()=>
                this.initRoutes(routers).then(() => this))
    }
}