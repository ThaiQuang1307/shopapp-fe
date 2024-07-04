import { environment } from "../environments/environment";

const BASE_URL = environment.server.apiUrl;

const USER_URL = BASE_URL + '/users';
const ROLE_URL = BASE_URL + '/roles';
const PRODUCT_URL = BASE_URL + '/products';

export const API_URL = {
    USER: {
        REGISTER: USER_URL + '/register',
        LOGIN: USER_URL + '/login',
    },
    ROLE: {
        GET_ALL: ROLE_URL,
    },
    PRODUCT: {
        GET_ALL: PRODUCT_URL,
        GET_IMAGE: PRODUCT_URL + '/images',
    }
}