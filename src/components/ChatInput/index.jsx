import { useEffect, useRef } from "react";
import { FaTelegramPlane } from "react-icons/fa";
import { FaRegFaceAngry } from "react-icons/fa6";
const ChatInput = () => {
  
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
        <form className="w-full h-[10vh] flex items-center justify-evenly">
            <div className="relative w-[80%] h-full">
              <FaRegFaceAngry className="w-10 h-10 absolute mt-6 ml-[10px] z-10 text-[var(--icon-color)]"/>
              <textarea
                  ref={textareaRef}
                  rows="1"
                  placeholder="Nhập tin nhắn"
                  className="border-none bg-transparent pt-4 pb-4 pl-20 p4-20 min-w-full absolute mb-[13px] text-white"
                />
              </div>
            <div className="relative">
              <button type="button" className="w-[40px] h-[40px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <FaTelegramPlane className="w-[25px] h-[25px]" />
              </button>
            </div>
        </form>
    )
}

export default ChatInput