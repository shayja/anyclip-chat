import userService from '../services/user.service';

const authHeader = () => userService.getAuthHeader();
export default authHeader;
