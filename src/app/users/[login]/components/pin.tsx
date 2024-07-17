import { IPinCardProps } from "@/models/interfaces/pin.props"
import { FC } from "react"

export  const Pin: FC<IPinCardProps> = (params) =>  {
    const {id, title, description, isDone} = params
    const handleIsDoneStatusChange = () => {
        //type actions
    }
    return(
        <div>
            <p>
                {title}
            </p>
            <p>
                {description}
            </p>
            <button onClick={() => handleIsDoneStatusChange()}>
                {
                    isDone ? "done" : "in progress"
                }
            </button>
        </div>
    )
}