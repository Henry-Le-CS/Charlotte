import defaultDog from '$/assets/default-dog.jpg';
import { IoEllipsisHorizontal } from 'react-icons/io5';
import { useAppSelector } from '../../redux/hooks';


const DefaultChat = () => {
  const friend = useAppSelector(state => state.friend.friendOnChat)
  const user = useAppSelector(state => state.user.data)
    return (
      friend && <div className="flex-1">
            <div className="overflow-y-auto p-4 pb-36">
               <div className="flex mb-4 cursor-pointer">
                 <div className="max-w-[50px] max-h-[50px] rounded-full flex items-center justify-center mr-2">
                    <div className="relative w-full h-full pt-[5px]"> 
                    <img src={user.avatar || defaultDog} alt="" className="size-[30px] rounded-full" />
                    </div>
                 </div>
                 <div className="flex max-w-[700px] bg-[#b2c9e4] rounded-lg p-3 gap-3 bubble-shadow items-end">
                   <p className="text-gray-700"></p>
                   <IoEllipsisHorizontal className='pt-[5px] size-[30px]' />
                 </div>
               </div>
               
               
               <div className="flex justify-end mb-4 cursor-pointer">
                 <div className="flex items-end max-w-[700px] bg-indigo-500 text-white rounded-lg p-3 gap-5 bubble-shadow">
                   <IoEllipsisHorizontal className='pt-[5px] size-[30px]' />
                   <p></p>
                 </div>
                 <div className="max-w-[50px] max-h-[50px] rounded-full flex items-center justify-center ml-2">
                   <img src={friend.avatar || defaultDog} alt="friend Avatar" className="size-[30px] rounded-full" />
                 </div>
               </div>
            </div>
        </div>
    )
}

export default DefaultChat