'use client'
import { IFriendCardProps } from "@/models/interfaces/friend.props"
import { jwtSelectors } from "@/store/jwt/jwt.selectors"
import Link from "next/link"
import { FC } from "react"
import { useSelector } from "react-redux"

export  const Friend: FC<IFriendCardProps> = (params) =>  {
    const {login, handler} = params
    const currentUserLogin = useSelector(jwtSelectors.selectLogin);

    const deletePin = () => {
        fetch(`http://localhost:3000/api/friend`, {
            method:'DELETE',
            body: JSON.stringify({userLogin: currentUserLogin, friedsLogin: login})
        });
        handler(true);
    }
    return(
        <div className={`flex flex-row gap-[40px] p-[20px] transition-all linear rounded-md shadow-[0_2px_6px_1px_rgba(0,0,0,0.04)] bg-[#fafafa] text-center hover:shadow-[0_2px_6px_1px_rgba(0,0,0,0.06)] hover:text-[white] hover:bg-[#1064e5]`}>
            <Link className="" href={`/users/${login}`}>
                {login}
            </Link>
            <button className="px-[10px] py-[2px] rounded-[50%] font-[600] hover:shadow-[0_2px_6px_1px_rgba(0,0,0,0.03)] hover:bg-[red] hover:text-[white] transition-all linear" onClick={() => deletePin()}>X</button>
        </div>
    )
}