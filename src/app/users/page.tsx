'use client'
import { dal } from "@/dal/dal";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { UserDTO } from "@/models/interfaces/user.dto";
import { User } from "@/components/user";

export default function Users() {
    const [users, setUsers] = useState<UserDTO[]>([])
    
    useEffect(() => {
        fetch('http://localhost:3000/api/users', {
            method: 'GET'
        }).then(responseData => responseData.json()).then((data) =>setUsers(data.data as UserDTO[]))
    },[])

    return(
        <section className="flex flex-col justify-center items-center">
            <h2 className="m-[50px] text-[50px] uppercase font-[600]">
                Users
            </h2>
            <ul className="flex flex-col justify-center items-center gap-[10px]">
                {
                    users.length > 0 ? users.map(user =>
                        <Link key={user.id} href={`/users/${user.login}`}>
                            <User {...user}/>
                        </Link>) : 
                        <div className="flex flex-row rounded-md px-[40px] py-[20px] ">
                            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" stroke="none" strokeWidth="4" fill="none" />
                                <path fill="rgba(0,0,0,0.2)" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM12 20.735a8 8 0 008-8h4a12 12 0 01-12 12v-4.265zM20 12a8 8 0 01-8 8v4.265a12 12 0 0012-12h-4zm-8-6.735a8 8 0 018-8v-4.265a12 12 0 00-12 12h4z" />
                            </svg>
                            <p className="text-[25px]">
                                Loading

                            </p>
                        </div>
                }
            </ul>
            
        </section>
    )
}