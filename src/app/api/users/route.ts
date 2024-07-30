import { dal } from "@/dal/dal"
import { CreateUserDTO } from "@/models/interfaces/create-user.dto";

export async function GET() {
    const data = await dal.fetchUsers();
    return Response.json({ data });
}

export async function POST(request: Request) {
    const res:CreateUserDTO = await request.json();
    const data = await dal.addUser(res);
    console.log(data);
    return data ? Response.json({ status: true }) : Response.json({ status: false });
}
