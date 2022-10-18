// import Dotenv from 'dotenv-webpack'

// new Dotenv()

export default {
    API_URL: ("http://localhost:3001" || process.env.REACT_APP_BACKEND_URL )+ "/upload",
}