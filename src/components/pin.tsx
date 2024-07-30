import { IPinCardProps } from "@/models/interfaces/pin.props"
import { FC } from "react"

export  const Pin: FC<IPinCardProps> = (params) =>  {
    const {title, description, isDone} = params

    return(
        <div className={`flex flex-row gap-[40px] p-[20px] rounded-md shadow-[0_2px_6px_1px_rgba(0,0,0,0.04)] bg-[${isDone ? "#c7fcac" :"#fafafa"}] text-center`}>
            <p className="text-[19px] font-[600]">
                {title}
            </p>
            <p className="text-center">
                {description}
            </p>
        </div>
    )
}