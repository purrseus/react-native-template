import config from '@/core/configs';
import Http from './http';

const http = new Http({ baseURL: config.apiUrl });
export default http;
