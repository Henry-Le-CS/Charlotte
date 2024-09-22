import DefaultChat from '../Chat/default';
import ChatHeader from './../ChatHeader/index';
import ChatInput from './../ChatInput/index';
const ChatContent = () => {
    return (
      <div className="w-full flex flex-col justify-center">
        <ChatHeader />
        <DefaultChat />
        <ChatInput />
      </div>
    );
  };
  
  export default ChatContent;
  