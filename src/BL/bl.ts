import { dal } from "@/dal/dal";
import { LogInDTO } from "@/models/interfaces/log-in.dto";

const getJwtFromLocalStrorage = (): string | null=> {
    return localStorage.getItem('token');
}

const setJwtToLocalStrorage = (token: string) => {
    localStorage.setItem("token", token);
}

const clearLocalStorageJwt = () => {
    localStorage.removeItem("token");
}

const logIn = async (logInInfo: LogInDTO): Promise<string | null> => {
    const jwt = await dal.loginUser(logInInfo.login, logInInfo.password);
    if (jwt) {
        setJwtToLocalStrorage(jwt.access_token);
        return jwt.access_token;
    }
    return null;
}

export const bl = {
    getJwtFromLocalStrorage,
    setJwtToLocalStrorage,
    clearLocalStorageJwt,
    logIn
}