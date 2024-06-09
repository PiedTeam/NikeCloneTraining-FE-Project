import { callRegister } from "./users.api";

class UsersService {
    function register(data: Omit<IRegisterForm, "agreeToTerms">) {
        return callRegister(data);
    }
}

const usersService = new UsersService();

export default usersService;
