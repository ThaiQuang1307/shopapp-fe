import { environment } from "../environments/environment";

const BASE_URL = environment.server.apiUrl;

const USER_URL = BASE_URL + '/users';

export const API_URL = {
    USER: {
        REGISTER: USER_URL + '/register',
        LOGIN: USER_URL + '/login',
    }
}