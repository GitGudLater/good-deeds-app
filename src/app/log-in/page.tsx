'use client'

import { bl } from "@/BL/bl";
import { dal } from "@/dal/dal";
import { useAppDispatch } from "@/store/hooks";
import { jwtActions } from "@/store/jwt/jwt.slice";
import { fetchProfileInfoFromJwt } from "@/store/jwt/jwt.thunk";
import { FC, useState } from "react";



export default function LogIn () {
    const dispatch = useAppDispatch();

    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const submitLogIn = async () => {
        bl.logIn({login, password}).then(token => {
            if(token) {
                dispatch(jwtActions.setJwt(token));
                fetchProfileInfoFromJwt(token);
            }
        })
    }

    return(
        <section>
            <form onSubmit={() => submitLogIn()}>
                <div>
                <input id="login" onChange={event => setLogin(event.target.value)} value={login} type="text" />
                    
                </div>
                <div>
                <input id="password" onChange={event => setPassword(event.target.value)} value={password} type="text" />

                </div>
                <input type="submit" />
            </form>

        </section>
    )
}