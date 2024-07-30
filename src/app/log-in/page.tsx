'use client'

import { bl } from "@/BL/bl";
import { dal } from "@/dal/dal";
import { useAppDispatch } from "@/store/hooks";
import { jwtActions } from "@/store/jwt/jwt.slice";
import { fetchProfileInfoFromJwt } from "@/store/jwt/jwt.thunk";
import { FC, FormEvent, useState } from "react";
import { redirect, useRouter } from 'next/navigation'
import { useSelector } from "react-redux";
import { jwtSelectors } from "@/store/jwt/jwt.selectors";



export default function LogIn () {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const currentLogin = useSelector(jwtSelectors.selectLogin);

    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const logOut = () => {
        fetch('http://localhost:3000/api/login', {
            method: 'DELETE'
        })
        .then(() => window.location.reload())
    }

    const submitLogIn = async (event: FormEvent) => {
        event. preventDefault();
        await fetch('http://localhost:3000/api/login',{
            method: "POST",
            body: JSON.stringify({login,password})
        })
        .then(response => response.json())
        .then(data => {
            if(data.authStatus) {
                fetch('http://localhost:3000/api/login',{
                    method: "GET"
                })
                .then(response => response.json())
                .then(data => dispatch(jwtActions.setLogin(data.data.login as string)))
                .then(() => router.push('users/my-page'))
            }
        })
    }

    return(
        <section>
            {
                currentLogin ? 
                <div className="flex flex-col justify-center items-center gap-[30px] py-[100px]">
                    <p className="text-[20px]">
                        You already authorized as {currentLogin}
                    </p>
                    <button onClick={() => logOut()} className="cursor-pointer px-[55px] py-[5px] rounded-md bg-[#ebebeb] text-[16px] font-[600] hover:shadow-[0_2px_6px_1px_rgba(0,0,0,0.03)] hover:bg-[#1064e5] hover:text-[white] transition-all linear">Log-Out</button>
                </div>:
                <form className="flex flex-col justify-center items-end gap-[30px] py-[100px] px-[40vw]" onSubmit={(event) => submitLogIn(event)}>
                    <div className="flex flex-row gap-[5px]">
                        <p className="text-[20px]">
                            login
                        </p>
                        <input id="login" onChange={event => setLogin(event.target.value)} value={login} type="text" className="py-[5px] px-[3px] bg-[#ebebeb] shadow-[0_2px_6px_1px_rgba(0,0,0,0.03)] rounded-md"/>
                        
                    </div>
                    <div className="flex flex-row gap-[5px]">
                        <p className="text-[20px]">
                            password
                        </p>
                        <input id="password" onChange={event => setPassword(event.target.value)} value={password} type="text" className="py-[5px] px-[3px] bg-[#ebebeb] shadow-[0_2px_6px_1px_rgba(0,0,0,0.03)] rounded-md"/>

                    </div>
                    <input className="cursor-pointer px-[55px] py-[5px] rounded-md bg-[#ebebeb] text-[16px] font-[600] hover:shadow-[0_2px_6px_1px_rgba(0,0,0,0.03)] hover:bg-[#1064e5] hover:text-[white] transition-all linear" type="submit" value="Log-In"/>
                </form>
            }
        </section>
    )
}