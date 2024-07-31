import { useState } from "react";
import { Pin } from "../../../components/pin";
import { dal } from "@/dal/dal";
import { UserDTO } from "@/models/interfaces/user.dto";

export default async function User({ params }: { params: { login: string } }) {
    const {login} = params;
    const user = await dal.fetchUserByLogin(login);
    const pins = await dal.fetchPins(login);
    //const [user, pins] = await Promise.all([dal.fetchUserByLogin(login), dal.fetchPins(login)])

    return (
      <section className="p-[50px] flex flex-col gap-[40px]">
        <div className="text-[25px]">
          user login: {user.login}
        </div>
        <div className="text-[25px]">
          user name: {user.name}
        </div>
        <div>
          <div>
            <h3 className="text-[25px]">
              deeds: 
            </h3>
            <ul className="flex flex-col gap-[20px]">
              {
                pins ? pins.map(pin => 
                  <Pin key={pin.id} {...pin} />
                ) : null
              }
            </ul>
          </div>
        </div>

      </section>
    )
  }