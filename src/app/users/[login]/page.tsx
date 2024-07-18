import { useState } from "react";
import { Pin } from "../../../components/pin";
import { dal } from "@/dal/dal";
import { UserDTO } from "@/models/interfaces/user.dto";

export default async function User({ params }: { params: { login: string } }) {
    const {login} = params;

    const [user, pins] = await Promise.all([dal.fetchUserByLogin(login), dal.fetchPins(login)])

    return (
      <section>
        <div>
          user login: {user.login}
        </div>
        <div>
          user name: {user.name}
        </div>
        <div>
          <div>
            <h3>
              deeds: 
            </h3>
            <ul>
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