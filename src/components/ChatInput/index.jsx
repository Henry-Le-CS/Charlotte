import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { FaTelegramPlane } from "react-icons/fa";
import { FaRegFaceAngry } from "react-icons/fa6";
import { toast } from "react-toastify";
import useSendMessage from "../hooks/useSendMessage";

const ChatInput = () => {
    const { send } = useSendMessage();
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

  const { register, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      message: ''
    }
  });

  const onSubmit = async (data) => {
    const message = new FormData();

    Object.keys(data).forEach(key => {
      if (typeof data[key] === 'object' && data[key] !== null) {
        Object.keys(data[key]).forEach(subKey => {
          if (data[key][subKey] !== '') {
            setValue(`${key}.${subKey}`, data[key][subKey]);
            message.append(`${key}[${subKey}]`, data[key][subKey]);
          }
        });
      } else if (data[key] !== '') {
        setValue(key, data[key]);
        message.append(key, data[key]);
      }
    });
    
    try {
      await send(message)
      reset()
    } catch (error) {
      toast.error(error.message)
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (event.shiftKey) {
        return;
      } else {
        event.preventDefault();
        handleSubmit(onSubmit)();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full h-[10vh] flex items-center absolute bottom-0 left-0">
      <div className="relative w-full h-full">
        <FaRegFaceAngry className="w-10 h-10 absolute mt-10 ml-[10px] z-10 text-[var(--icon-color)]" />
        <label htmlFor="message"></label>
        <textarea
          ref={textareaRef}
          rows="1"
          placeholder="Nhập tin nhắn"
          {...register('message', { required: true })}
          className="border-none bg-transparent pt-4 pb-4 pl-20 pr-40 min-w-full absolute bottom-0 text-white"
          onKeyDown={handleKeyDown} // Handle keydown event
        />
      </div>
      <div className="absolute right-0 mt-6">
        <button
          type="submit"
          className="w-[40px] h-[40px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <FaTelegramPlane className="w-[25px] h-[25px]" />
        </button>
      </div>
    </form>
  );
};

ChatInput.propTypes = {
  socket: PropTypes.object
};

export default ChatInput;
