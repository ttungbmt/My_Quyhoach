import axios from 'axios';
import AUTH_CONFIG from './mapServiceConfig';

class MapService {
    getThuadatById = (id) => {
        return axios.get(`/api/thuadats/view/${id ?? ''}`).then(res => res.data);
    };

    getThuadatByInfo = (data) => {
        return axios.post('/api/thuadat-by-info', data).then(res => res.data);
    };

    getThuadatByLocation = (data, config) => {
        return axios.post('/api/thuadat-by-location', data, config).then(res => res.data);
    };

    getThuadatByCoords = (data) => {
        return axios.post('/api/thuadat-by-coords', data).then(res => res.data);
    };

    toggleFavorite = (id) => {
        return axios.get(`/api/thuadats/toggle-favorite/${id}`).then(res => res.data);
    };

    increaseThudatViewCount = (id) => {
        return axios.get(`/api/thuadats/increase-view-count/${id}`).then(res => res.data);
    };
}

const instance = new MapService();

export default instance;
