'use client'
import { IFriendCardProps } from "@/models/interfaces/friend.props"
import { FC } from "react"

export const User: FC<IFriendCardProps> = (params) =>  {
    const {login} = params;

    return (
        <div className="pointer w-[400px] px-[10px] py-[15px] transition-all linear rounded-md shadow-[0_2px_6px_1px_rgba(0,0,0,0.04)] hover:scale-105 hover:shadow-[0_2px_6px_1px_rgba(0,0,0,0.06)] hover:text-[white] hover:bg-[#1064e5]">
            {login}
        </div>
    )
    
}