'use client'
import { FormEvent, useEffect, useState } from "react";
import { Pin } from "../../../components/pin";
import { dal } from "@/dal/dal";
import { UserDTO } from "@/models/interfaces/user.dto";
import { useAppDispatch } from "@/store/hooks";
import { useSelector } from "react-redux";
import { jwtSelectors } from "@/store/jwt/jwt.selectors";
import { PinDTO } from "@/models/interfaces/pin.dto";
import { jwtActions } from "@/store/jwt/jwt.slice";
import { NewPinDTO } from "@/models/interfaces/new-pin.dto";
import { UpdateUserDTO } from "@/models/interfaces/update-user.dto";
import { MyPagePin } from "@/components/my-page-pin";
import { IAddFriendToUserDTO } from "@/models/interfaces/add-user-to-friend.dto";
import { Friend } from "@/components/friend";

export default function CurrentAuthentikatedUser() {

    const dispatch = useAppDispatch();

    const login = useSelector(jwtSelectors.selectLogin);

    const [currentUserName, setCurrentUserName] = useState<string>('');
    const [currentUserPassword, setCurrentUserPassword] = useState<string>('');


    const [user, setUser] = useState<UserDTO | null>(null);
    const [pins, setPins] = useState<PinDTO[] | null>(null);
    const [friends, setFriends] = useState<UserDTO[] | null>(null);

    const [pinTitle, setPinTitle] = useState<string>('');
    const [pinDescription, setPinDescription] = useState<string>('');
    const [fetchPinsStatus, setFetchPinsStatus] = useState<boolean>(true);
    const [fetchFriendsStatus, setFetchFriendsStatus] = useState<boolean>(true);

    const [searchedFriendslogin, setSearchedFriendsLogin] = useState<string>('')

    
    useEffect(() => {
      fetch('http://localhost:3000/api/login',{
          method: "GET"
      })
      .then(response => response.json())
      .then(data => data.data !== null ?
          dispatch(jwtActions.setLogin(data.data.login as string)) :
          console.log('expired or unavailable token'));
    },[]);

    useEffect(() => {
      if(login) {
        fetch(`http://localhost:3000/api/users/${login}`, {
          method:"GET"
        })
        .then(response => response.json())
        .then(data => {
          setUser(data.data);
          setCurrentUserName(data.data.name);
          setCurrentUserPassword(data.data.password)
        });
      }
    },[login]);

    useEffect(() => {
      if(login || fetchPinsStatus) {
        fetch(`http://localhost:3000/api/pins/${login}`, {
          method:"GET"
        })
        .then(response => response.json())
        .then(data => {setPins(data.data); setFetchPinsStatus(false)});
      }

    },[login,fetchPinsStatus]);

    useEffect(() => {
      if(login || fetchFriendsStatus) {
        fetch(`http://localhost:3000/api/friend/${login}`, {
          method:"GET"
        })
        .then(response => response.json())
        .then(data => {setFriends(data); setFetchFriendsStatus(false)});
      }
    },[login,fetchFriendsStatus])


    const setNewPin = async (event: FormEvent ) => {
      event.preventDefault();
      fetch(`http://localhost:3000/api/pins/${login}`, {
        method:"POST",
        body: JSON.stringify({title: pinTitle, description: pinDescription} as NewPinDTO)
      })
      .then(response => response.json())
      .then(data => data.pinAdded ? setFetchPinsStatus(true) : console.log("error during pin creation"))
    }

    const setNewProfileData = async (event: FormEvent) => {
      event.preventDefault();
      fetch(`http://localhost:3000/api/users/${login}`, {
        method: "PUT",
        body: JSON.stringify({login, name: currentUserName, password: currentUserPassword} as UpdateUserDTO)
      })
      .then(() => window.location.reload())
    }

    const addFriend = async (event: FormEvent) => {
      event.preventDefault();
      fetch(`http://localhost:3000/api/friend`, {
        method: "PUT",
        body: JSON.stringify({userLogin: login, friendsLogin: searchedFriendslogin} as IAddFriendToUserDTO)
      })
      .then(() => window.location.reload())
    }

    return (
      <section>
        { login ? 
        <div className="p-[50px] flex flex-col gap-[40px]">
          <form onSubmit={(event) => setNewProfileData(event)} className=" flex flex-col gap-[40px]">
            <div className="text-[25px]">
              user login: {login}
            </div>
            <div className="text-[25px]">
              user name: { user ? 
                <input required type="text" value={currentUserName} onChange={(event) => setCurrentUserName(event.target.value)} className="mx-[5px] p-[5px] rounded-md shadow-[0_2px_6px_1px_rgba(0,0,0,0.04)]"/>: 
                '...loading'}
            </div>
            <div className="text-[25px]">
              user password: { user ? 
                <input required type="text" value={currentUserPassword} onChange={(event) => setCurrentUserPassword(event.target.value)} className="mx-[5px] p-[5px] rounded-md shadow-[0_2px_6px_1px_rgba(0,0,0,0.04)]"/> : 
                '...loading'}
            </div>
            <input type="submit" value="Set New Profile Data" className="cursor-pointer w-[fit-content] px-[55px] py-[5px] rounded-md bg-[#ebebeb] text-[16px] font-[600] hover:shadow-[0_2px_6px_1px_rgba(0,0,0,0.03)] hover:bg-[#1064e5] hover:text-[white] transition-all linear"/>
          </form>

          <div>
            <div>
              <h3 className="text-[25px]">
                deeds: 
              </h3>
              <form onSubmit={(event) => setNewPin(event)} className="py-[10px] flex flex-row">
                <input required minLength={5} className="mx-[5px] p-[5px] rounded-md shadow-[0_2px_6px_1px_rgba(0,0,0,0.04)]" placeholder="Title" value={pinTitle} onChange={(event => setPinTitle(event.target.value))}/>
                <input  required minLength={10} className="mx-[5px] p-[5px] grow rounded-md shadow-[0_2px_6px_1px_rgba(0,0,0,0.04)]" placeholder="Description" value={pinDescription} onChange={(event => setPinDescription(event.target.value))}/>
                <input type="submit" className="cursor-pointer px-[55px] py-[5px] rounded-md bg-[#ebebeb] text-[16px] font-[600] hover:shadow-[0_2px_6px_1px_rgba(0,0,0,0.03)] hover:bg-[#1064e5] hover:text-[white] transition-all linear" value={'create pin'} />
              </form>
              <ul className="flex flex-col gap-[10px]">
                {
                  pins ? pins.map(pin => 
                    <MyPagePin key={pin.id} {...pin} handler={setFetchPinsStatus} login={login}/>
                  ) : null
                }
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-[25px]">
              friends:
            </h3>
            <form onSubmit={(event) => addFriend(event)} className="py-[10px] flex flex-row">
              <input  required minLength={10} className="mx-[5px] p-[5px] grow rounded-md shadow-[0_2px_6px_1px_rgba(0,0,0,0.04)]" placeholder="Friends login" value={searchedFriendslogin} onChange={(event => setSearchedFriendsLogin(event.target.value))}/>
              <input type="submit" className="cursor-pointer px-[55px] py-[5px] rounded-md bg-[#ebebeb] text-[16px] font-[600] hover:shadow-[0_2px_6px_1px_rgba(0,0,0,0.03)] hover:bg-[#1064e5] hover:text-[white] transition-all linear" value={'Add Possible Friend'} />
            </form>
            <ul className="flex flex-col gap-[10px]">
                {
                  friends ? friends.map(friend => 
                    <Friend key={friend.id} handler={setFetchFriendsStatus} login={login}/>
                  ) : null
                }
              </ul>
          </div>
        </div> : 
        <div className="flex flex-col justify-center items-center gap-[30px] py-[100px] text-[25px]">
          please log-in to manage profile
        </div>
        }
        
      </section>
    )
  }