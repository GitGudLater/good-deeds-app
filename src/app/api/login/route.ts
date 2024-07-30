import { dal } from "@/dal/dal";
import { LogInDTO } from "@/models/interfaces/log-in.dto";
import { ProfileDTO } from "@/models/interfaces/profile.dto";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    const res:LogInDTO = await request.json();
    const data = await dal.loginUser(res.login, res.password);
    if(data.access_token) {
        cookies().delete("token");
        /*cookies().set({
            name: "token",
            value: data.access_token,
            expires: new Date(Date.now() + 600)
        });*/
        cookies().set("token", data.access_token, {
            expires: new Date(Date.now() + 600),
            maxAge: 600
        });
        return Response.json({authStatus:true})
    } else {
        return Response.json({authStatus:false})
    }
}

export async function GET() {
    const cookie = cookies().get("token");
    if(cookie) {
        const data = await dal.fetchProfile(cookie.value);
        return Response.json({data});
    } else {
        return Response.json({data: null});
    }

}


export async function DELETE() {
    cookies().delete("token");    
    return Response.json({deleted:true});
}