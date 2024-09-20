

const DefaultChat = ({ }) => {
    return (
            <div className="h-screen px-[5rem] pt-10 font-medium">
            <div className="chat chat-start flex">
                <div className="chat-image avatar flex flex-col">
                    <div className="w-10 rounded-full">
                    <img
                        alt=""
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                    </div>
                    <time className="text-xs opacity-50 bottom-0">12:45</time>
                </div>
                <div className="flex flex-col items-start">
                <div className="chat-bubble max-w-[600px] break-words">
                            .
                        </div>
                    <div className="chat-footer opacity-50">Delivered</div>
                </div>
            </div>
    
            <div className="chat chat-end">
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                <img
                    alt=""
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
                </div>
            </div>
            <div className="chat-bubble max-w-xs break-words">I hate you!</div>
            <div className="chat-footer opacity-50">Seen at 12:46</div>
            <time className="text-xs opacity-50">12:46</time>
            </div>
        </div>
    )
}

export default DefaultChat