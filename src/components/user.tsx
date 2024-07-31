'use client'
import { IFriendCardProps } from "@/models/interfaces/friend.props"
import { IUserCardProps } from "@/models/interfaces/user-card.props";
import { jwtSelectors } from "@/store/jwt/jwt.selectors";
import { FC } from "react"
import { useSelector } from "react-redux";

export const User: FC<IUserCardProps> = (params) =>  {
    const {login} = params;

    return (
        <div className="pointer w-[400px] px-[10px] py-[15px] transition-all linear rounded-md shadow-[0_2px_6px_1px_rgba(0,0,0,0.04)] hover:scale-105 hover:shadow-[0_2px_6px_1px_rgba(0,0,0,0.06)] hover:text-[white] hover:bg-[#1064e5]">
            {login}


        </div>
    )
    
}