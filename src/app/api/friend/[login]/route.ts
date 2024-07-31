import LogIn from "@/app/log-in/page";
import { dal } from "@/dal/dal";
import { cookies } from "next/headers";

export async function GET(request: Request,{ params }: { params: { login: string } }) {
    const cookie = cookies().get("token");
    const friends = cookie ? await dal.fetchUserFriends(params.login, cookie.value) : []; 
    return Response.json(friends);
}