import { userService } from '../services/user.service';

export function authHeader() {
    return userService.getAuthHeader();
}