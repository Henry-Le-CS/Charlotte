import { IoEllipsisHorizontal } from 'react-icons/io5';
import UserStatus from "../UserStatus";


const DefaultChat = () => {
    return (
        <div className="flex-1">
            <div className="overflow-y-auto p-4 pb-36">
               
               <div className="flex mb-4 cursor-pointer">
                 <div className="max-w-[50px] max-h-[50px] rounded-full flex items-center justify-center mr-2">
                    <div className="relative w-full h-full pt-[5px]"> 
                    <img src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="" className="size-[30px] rounded-full" />
                    <UserStatus status='active' />
                    </div>
                 </div>
                 <div className="flex max-w-[700px] bg-[#b2c9e4] rounded-lg p-3 gap-3 bubble-shadow items-end">
                   <p className="text-gray-700">ssl_certificate /etc/letsencrypt/live/cosmetichive.id.vn/fullchain.pem; ssl_certificate_key /etc/letsencrypt/live/cosmetichive.id.vn/privkey.pem; include /etc/letsencrypt/options-ssl-nginx.conf; ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;</p>
                   <IoEllipsisHorizontal className='pt-[5px] size-[30px]' />
                 </div>
               </div>
               
               
               <div className="flex justify-end mb-4 cursor-pointer">
                 <div className="flex items-end max-w-[700px] bg-indigo-500 text-white rounded-lg p-3 gap-5 bubble-shadow">
                   <IoEllipsisHorizontal className='pt-[5px] size-[30px]' />
                   <p>Để làm cho hình ảnh trở thành hình tròn, bạn cần đảm bảo rằng chiều rộng và chiều cao của hình ảnh bằng nhau và sử dụng thuộc tính border-radius với giá trị 50%. Dưới đây là cách bạn đã làm, chỉ cần chắc chắn rằng bạn áp dụng đúng các thuộc tính này:</p>
                 </div>
                 <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                   <img src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="My Avatar" className="w-8 h-8 rounded-full" />
                 </div>
               </div>
               
            </div>
        </div>
    )
}

export default DefaultChat