'use client'

import { bl } from "@/BL/bl";
import { dal } from "@/dal/dal";
import { useAppDispatch } from "@/store/hooks";
import { jwtActions } from "@/store/jwt/jwt.slice";
import { fetchProfileInfoFromJwt } from "@/store/jwt/jwt.thunk";
import { FC, useState } from "react";



export default function SignUp ()  {
    const dispatch = useAppDispatch();

    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [name, setName] = useState<string>('');


    const submitCreateUsr = async () => {
        dal.addUser({login, password, name});
    }

    return(
        <section>
            <form onSubmit={() => submitCreateUsr()}>
                <div>
                <p>
                    логин
                </p>
                <input id="login" onChange={event => setLogin(event.target.value)} value={login} type="text" />
                    
                </div>
                <div>
                <p>
                    пароль
                </p>
                <input id="password" onChange={event => setPassword(event.target.value)} value={password} type="text" />

                </div>
                <div>
                <p>
                    имя
                </p>
                <input id="password" onChange={event => setName(event.target.value)} value={name} type="text" />

                </div>
                <input type="submit" />
            </form>

        </section>
    )
}