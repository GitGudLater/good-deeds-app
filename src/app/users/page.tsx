import { dal } from "@/dal/dal";
import Link from "next/link";
import { useEffect, useState } from "react";
import { UserDTO } from "@/models/interfaces/user.dto";
import { User } from "@/components/user";

export default async function Users() {
    const users: UserDTO[] =  await dal.fetchUsers()
    
    /*useEffect(() => {
        dal.fetchUsers().then(users => {setUsers(users)});
        return;
    },[])*/

    return(
        <section>
            <h2>
                Users
            </h2>
            <ul>
                {
                    users ? users.map(user =>
                        <Link href={`/users/${user.login}`}>
                            <User {...user}/>
                        </Link>) : null
                }
            </ul>
            
        </section>
    )
}