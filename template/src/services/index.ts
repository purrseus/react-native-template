import Http from './http';
import Config from 'react-native-config';

const http = new Http({ baseURL: Config.API_URL });
export default http;
