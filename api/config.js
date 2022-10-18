
import 'dotenv-webpack'

export default {
    MONGOSERVER: 'mongodb://'+ (process.env.API_MONGOSERVER || 'root:rootpassword@localhost:27017')+'/downloads'
}