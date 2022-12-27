const REACT_APP_BACKEND_URL = 'http://localhost:7071/api';
const config = {
  //API_URL: ("http://localhost:3001" || REACT_APP_BACKEND_URL || process.env.REACT_APP_BACKEND_URL ),
  API_URL: REACT_APP_BACKEND_URL,
  SELF_URL: 'http://localhost:3000' || process.env.REACT_APP_SELF_URL
};
export default config;
