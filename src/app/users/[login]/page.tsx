"use client";

import { useEffect, useState } from "react";
import { Friend } from "./components/friend";
import { Pin } from "./components/pin";
import { IPinCardProps } from "@/models/interfaces/pin.props";
import { IFriendCardProps } from "@/models/interfaces/friend.props";
import pinsDefault from "../../../assets/json-initial-assets/pins.json";
import usersDefault from "../../../assets/json-initial-assets/users.json";


export default function User({ params }: { params: { login: string } }) {
    /*const [userPins, setUserPins] = useState<IPinCardProps[]>(pinsDefault);
    const [userFriends, setUserFriends] = useState<IFriendCardProps[]>(usersDefault);

    useEffect(() => {
      setUserPins();
      setUserFriends();
    },[])*/

    return (
      <section>
        <div>
          My login: {params.login}
        </div>
        <div>
          My password: 
        </div>
        <div>
          <div>
            <h3>
              My friends: 
            </h3>
            <ul>
              {
                usersDefault.map((friend) => 
                  <Friend key={friend.id} login={friend.login} />
                )
              }
            </ul>
          </div>
          <div>
            <h3>
              My deeds: 
            </h3>
            <ul>
              {
                pinsDefault.map(pin => 
                  <Pin key={pin.id} {...pin} />
                )
              }
            </ul>
          </div>
        </div>

      </section>
    )
  }