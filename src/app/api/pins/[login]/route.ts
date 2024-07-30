import { dal } from "@/dal/dal"
import { NewPinDTO } from "@/models/interfaces/new-pin.dto";
import { UpdatePinDTO } from "@/models/interfaces/update-pin.dto";
import { cookies } from "next/headers";

export async function GET(request: Request ,{ params }: { params: { login: string } }) {
    const data = await dal.fetchPins(params.login);
    return Response.json({ data });
}

export async function POST(request: Request,{ params }: { params: { login: string } }) {
    const res:NewPinDTO = await request.json();
    const cookie = cookies().get("token");
    if(cookie)  {
        const data = await dal.addPin(params.login, cookie.value, res);
        return Response.json({ pinAdded:true });
    } else {
        return Response.json({pinAdded:false})
    }
}

export async function PUT(request: Request, { params }: { params: { login: string } }) {
  const res:UpdatePinDTO = await request.json();
  const cookie = cookies().get("token");

  if(cookie)  {
      const data = await dal.updatePinStatus(res.id, res.isDone, cookie.value);
      return Response.json({ data });
  } else {
      return Response.json({data:null})
  }
}

export async function DELETE(request: Request, { params }: { params: { login: string } }) {
  const res:UpdatePinDTO = await request.json();
  const cookie = cookies().get("token");

  if(cookie)  {
      const data = await dal.deletePin(res.id, cookie.value);
      return Response.json({ data });
  } else {
      return Response.json({data:undefined})
  }
}