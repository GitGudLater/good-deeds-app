import { dal } from "@/dal/dal"
import { UpdateUserDTO } from "@/models/interfaces/update-user.dto";
import { cookies } from "next/headers";

export async function GET(request: Request,{ params }: { params: { login: string } }) {
    const data = await dal.fetchUserByLogin(params.login);
    return Response.json({ data });
}

export async function PUT(request: Request) {
  const res: UpdateUserDTO = await request.json();
  const cookie = cookies().get("token");
  cookie ? await dal.updateUser(res, cookie.value) : null; 
  return Response.json({reload: true});
}