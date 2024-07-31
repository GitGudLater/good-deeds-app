'use client'
import { IMyPagePinProps } from "@/models/interfaces/my-page-pin.props"
import { IPinCardProps } from "@/models/interfaces/pin.props"
import { useAppDispatch } from "@/store/hooks"
import { FC } from "react"

export  const MyPagePin: FC<IMyPagePinProps> = (params) =>  {
    const {title, description, isDone, id, handler, login} = params

    const changePinStatus = ( ) => {
        fetch(`http://localhost:3000/api/pins/${login}`, {
            method:'PUT',
            body: JSON.stringify({id, isDone: !isDone})
        });
        handler(true);
    }

    const deletePin = ( ) => {
        fetch(`http://localhost:3000/api/pins/${login}`, {
            method:'DELETE',
            body: JSON.stringify({id, isDone: true})
        });
        handler(true);
    }

    return(
        <div className={`flex flex-row gap-[40px] p-[20px] rounded-md shadow-[0_2px_6px_1px_rgba(0,0,0,0.04)] bg-[${isDone ? '#c7fcac':'#fafafa'}] text-center`}>
            <p className="text-[19px] font-[600]">
                {title}
            </p>
            <p className="grow text-left">
                {description}
            </p>
            <button className="p-[5px] rounded-md font-[600] hover:shadow-[0_2px_6px_1px_rgba(0,0,0,0.03)] hover:bg-[#1064e5] hover:text-[white] transition-all linear" onClick={() => changePinStatus()}>{isDone ? 'complete' : 'incomplete'}</button>
            <button className="px-[10px] py-[2px] rounded-[50%] font-[600] hover:shadow-[0_2px_6px_1px_rgba(0,0,0,0.03)] hover:bg-[red] hover:text-[white] transition-all linear" onClick={() => deletePin()}>X</button>
        </div>
    )
}