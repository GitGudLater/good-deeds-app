import { IFriendCardProps } from "@/models/interfaces/friend.props"
import Link from "next/link"
import { FC } from "react"

export  const Friend: FC<IFriendCardProps> = (params) =>  {
    const {login} = params
    const handleRemoveFromFriends = () => {
        //type actions
    }
    return(
        <div>
            <Link href={`/users/${login}`}>
                {login}
            </Link>
            <button onClick={() => handleRemoveFromFriends()}>
                remove from friends
            </button>
        </div>
    )
}