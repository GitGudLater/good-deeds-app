'use client'
import { IFriendCardProps } from "@/models/interfaces/friend.props"
import { FC } from "react"

export const User: FC<IFriendCardProps> = (params) =>  {
    const {login} = params;

    return (
        <div>
            {login}
        </div>
    )
    
}