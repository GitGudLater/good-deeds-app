import { IBearerJwtResponse } from "@/models/interfaces/bearer-jwt.dto";
import { CreateUserDTO } from "@/models/interfaces/create-user.dto";
import { PinDTO } from "@/models/interfaces/pin.dto";
import { ProfileDTO } from "@/models/interfaces/profile.dto";
import { UserDTO } from "@/models/interfaces/user.dto";
import { json } from "stream/consumers";

const serverUrl = process.env.SRVR_URL;

const fetchUserByLogin = async (login: string):Promise<UserDTO> => {
    //some action
    const response = await fetch(serverUrl + `/user/${login}`,{
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
    const response = await fetch(serverUrl + `/user`,{
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
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    });

    return response.json();
}

const loginUser = async (login: string, password: string): Promise<IBearerJwtResponse> => {
    const response = await fetch(serverUrl + `/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            /*'Authorization': `Bearer ${token}`,*/
        },
        body: JSON.stringify({login: login, password: password})
    });
    return response.json();
}

const addUser = async (newUser: CreateUserDTO): Promise<string> => {
    const response = await fetch(serverUrl + `/login`, {
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
    fetch(serverUrl + `/${login}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    });
}

const fetchPins = async (login: string): Promise<PinDTO[]> => {
    const response = await fetch(serverUrl + `/pin/${login}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            /*'Authorization': `Bearer ${token}`,*/
        }
    });
    return response.json();
}


const addPin = async (login: string, token: string, pin: PinDTO) => {
    fetch(serverUrl + `/pin/${login}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
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

export const dal = {
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