import { dal } from "@/dal/dal"
import { IAddFriendToUserDTO } from "@/models/interfaces/add-user-to-friend.dto";
import { UpdateUserDTO } from "@/models/interfaces/update-user.dto";
import { cookies } from "next/headers";

export async function DELETE(request: Request,{ params }: { params: { login: string } }) {
    const res: IAddFriendToUserDTO = await request.json();
    const cookie = cookies().get("token");
    cookie ? await dal.removeFriendFromUser(res.userLogin,res.friendsLogin, cookie.value) : null; 
    return Response.json({reload: true});
}

export async function PUT(request: Request,{ params }: { params: { login: string } }) {
    const res: IAddFriendToUserDTO = await request.json();
    const cookie = cookies().get("token");
    cookie ? await dal.addFriendToUser(res.userLogin,res.friendsLogin, cookie.value) : null; 
    return Response.json({reload: true});
}