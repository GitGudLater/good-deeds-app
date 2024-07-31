import { IBearerJwtResponse } from "@/models/interfaces/bearer-jwt.dto";
import { CreateUserDTO } from "@/models/interfaces/create-user.dto";
import { NewPinDTO } from "@/models/interfaces/new-pin.dto";
import { PinDTO } from "@/models/interfaces/pin.dto";
import { ProfileDTO } from "@/models/interfaces/profile.dto";
import { UpdateUserDTO } from "@/models/interfaces/update-user.dto";
import { UserDTO } from "@/models/interfaces/user.dto";
import { json } from "stream/consumers";

const serverUrl = process.env.SRVR_URL;

const fetchUserByLogin = async (login: string):Promise<UserDTO> => {
    //some action
    const response = await fetch(serverUrl + `/user/profile/${login}`,{
        cache: 'no-cache',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            /*'Authorization': `Bearer ${token}`,*/
        }
    });
    if(!response.ok) 
        throw new Error('Failed to fetch data');
    else
        return response.json();
}

const fetchUsers = async ():Promise<UserDTO[]> => {
    //some action
    const response = await fetch(serverUrl + `/user/profile/`,{
        cache: 'no-cache',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            /*'Authorization': `Bearer ${token}`,*/
        }
    });
    return response.json();
}

const fetchProfile = async (token: string):Promise<ProfileDTO> => {
    //some action
    const response = await fetch(serverUrl + `/auth/profile`,{
        cache: 'no-cache',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    });

    return response.json();
}

const loginUser = async (login: string, password: string): Promise<IBearerJwtResponse> => {
    const response = await fetch(serverUrl + `/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            /*'Authorization': `Bearer ${token}`,*/
        },
        body: JSON.stringify({username: login, password: password})
    });
    return response.json();
}

const addUser = async (newUser: CreateUserDTO): Promise<UserDTO | null> => {
    const response = await fetch(serverUrl + `/user/profile`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            /*'Authorization': `Bearer ${token}`,*/
        },
        body: JSON.stringify({...newUser})
    });
    return response.json();
}

const deleteUser = async (login: string, token: string) => {
    fetch(serverUrl + `/profile/${login}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    });
}

const fetchPins = async (login: string): Promise<PinDTO[]> => {
    const response = await fetch(serverUrl + `/pin/${login}`, {
        cache: 'no-cache',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            /*'Authorization': `Bearer ${token}`,*/
        }
    });
    return response.json();
}


const addPin = async (login: string, token: string, pin: NewPinDTO) => {
    fetch(serverUrl + `/pin/${login}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({newPin:pin})
    });
}

const deletePin = async (pinId: string, token: string) => {
    fetch(serverUrl + `/pin/${pinId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    });
}

const updatePinStatus = async (pinId: string, pinStatus: boolean, token: string) => {
    fetch(serverUrl + `/pin/${pinId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({updatedPinStatus:pinStatus})
    });
}

const updateUser = async (updatedUserInfo: UpdateUserDTO, token: string) => {
    fetch(serverUrl + `/user/profile/${updatedUserInfo.login}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedUserInfo)
    });
}

const addFriendToUser = async (userLogin:string, friendsLogin: string, token: string) => {
    fetch(serverUrl + `/user/friend`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({logins:{userLogin, friendsLogin}})
    });
}

const removeFriendFromUser = async (userLogin:string, friendsLogin: string, token: string) => {
    fetch(serverUrl + `/user/friend`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({logins:{userLogin, friendsLogin}})
    });
}

const fetchUserFriends = async (userLogin:string,token: string): Promise<UserDTO[]> => {
    console.log(`dal - ${userLogin}`);
    const response = await fetch(serverUrl + `/user/friend/${userLogin}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    return response.json();
}

export const dal = {
    fetchUserFriends,
    addFriendToUser,
    removeFriendFromUser,
    updateUser,
    fetchUserByLogin,
    updatePinStatus,
    deletePin,
    addPin,
    addUser,
    deleteUser,
    fetchPins,
    fetchProfile,
    loginUser,
    fetchUsers
}