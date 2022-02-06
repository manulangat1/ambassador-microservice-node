// import blogs from './blogs';
import auth from './admin'
const apiPrefix = '/api/v1'

const routes = (app:any) => {
    // app.use(apiPrefix,blogs)
    app.use(apiPrefix,auth)
    return app 
}

export default routes