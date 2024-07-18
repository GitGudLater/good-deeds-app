'use client'
import { IFriendCardProps } from "@/models/interfaces/friend.props"
import Link from "next/link"
import { FC } from "react"

export  const Friend: FC<IFriendCardProps> = (params) =>  {
    const {login} = params

    return(
        <div>
            {login}
        </div>
    )
}