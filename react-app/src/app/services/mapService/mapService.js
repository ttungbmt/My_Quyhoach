import axios from 'axios';
import AUTH_CONFIG from './mapServiceConfig';

class MapService {
    getThuadatByInfo = (data) => {
        return axios.post('/api/thuadat-by-info', data);
    };

    getThuadatByLocation = (data) => {
        return axios.post('/api/thuadat-by-location', data);
    };

    getThuadatByCoords = (data) => {
        return axios.post('/api/thuadat-by-coords', data);
    };
}

const instance = new MapService();

export default instance;
