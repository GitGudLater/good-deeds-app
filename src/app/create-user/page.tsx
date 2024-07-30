'use client'

import { bl } from "@/BL/bl";
import { dal } from "@/dal/dal";
import { useAppDispatch } from "@/store/hooks";
import { jwtActions } from "@/store/jwt/jwt.slice";
import { fetchProfileInfoFromJwt } from "@/store/jwt/jwt.thunk";
import { useRouter } from "next/navigation";
import { FC, FormEvent, useState } from "react";



export default function SignUp ()  {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [name, setName] = useState<string>('');


    const submitCreateUsr = async (event: FormEvent) => {
        event. preventDefault();
        fetch('http://localhost:3000/api/users',{
            method: "POST",
            body: JSON.stringify({login,password,name})
        })
        router.push('/log-in');
    }

    return(
        <section>
            <form onSubmit={(event) => submitCreateUsr(event)} className="flex flex-col justify-center items-end gap-[30px] py-[100px] px-[40vw]">
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
                <div className="flex flex-row gap-[5px]">
                    <p className="text-[20px]">
                        name
                    </p>
                    <input id="password" onChange={event => setName(event.target.value)} value={name} type="text" className="py-[5px] px-[3px] bg-[#ebebeb] shadow-[0_2px_6px_1px_rgba(0,0,0,0.03)] rounded-md"/>

                </div>
                <input type="submit" className="cursor-pointer px-[55px] py-[5px] rounded-md bg-[#ebebeb] text-[16px] font-[600] hover:shadow-[0_2px_6px_1px_rgba(0,0,0,0.03)] hover:bg-[#1064e5] hover:text-[white] transition-all linear" value="Sign-Up"/>
            </form>

        </section>
    )
}