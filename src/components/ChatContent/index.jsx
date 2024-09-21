import { useEffect, useRef } from "react";
import { FaTelegramPlane } from "react-icons/fa";
import { FaRegFaceAngry } from "react-icons/fa6";
const ChatContent = () => {
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;

    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
      textarea.classList.add('auto');

      const handleInput = () => {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      };

      textarea.addEventListener('input', handleInput);

      return () => {
        textarea.removeEventListener('input', handleInput);
      };
    }
  }, []);
    return (
      <div className="w-full ml-[250px] flex flex-col justify-center">
        <div className="h-[90vh] px-[5rem] pt-10 font-medium bg-[#F5F5F5] text-[var(--black-text-color)]">
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
            <div className="chat-bubble chat-bubble-info max-w-[600px] break-words text-[--black-text-color]">
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
        <form className="w-full h-[10vh] bg-white flex items-center justify-evenly">
            <div className="relative w-[80%] h-full">
              <FaRegFaceAngry className="w-10 h-10 absolute mt-6 ml-[10px] z-10 text-[#000]"/>
              <textarea
                  ref={textareaRef}
                  rows="1"
                  placeholder="Nhập tin nhắn"
                  className="border pt-4 pb-4 pl-20 p4-20 min-w-full absolute mb-[13px]"
                />
              </div>
            <div className="relative">
              <button type="button" className="w-[40px] h-[40px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <FaTelegramPlane className="w-[25px] h-[25px]" />
              </button>
            </div>
        </form>
      </div>
    );
  };
  
  export default ChatContent;
  