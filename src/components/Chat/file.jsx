import { useState } from 'react';

const FileChat = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex items-start gap-2.5">
      <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="Bonnie Green image" />
      <div className="flex flex-col gap-1">
        <div className="flex flex-col w-full max-w-[326px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className="text-sm font-semibold text-gray-900 dark:text-white">Bonnie Green</span>
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">11:46</span>
          </div>
          <div className="flex items-start my-2.5 bg-gray-50 dark:bg-gray-600 rounded-xl p-2">
            <div className="me-2">
              <span className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white pb-2">
                <svg fill="none" aria-hidden="true" className="w-5 h-5 flex-shrink-0" viewBox="0 0 20 21">
                  {/* SVG Content */}
                </svg>
                Flowbite Terms & Conditions
              </span>
              <span className="flex text-xs font-normal text-gray-500 dark:text-gray-400 gap-2">
                12 Pages
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="self-center" width="3" height="4" viewBox="0 0 3 4" fill="none">
                  <circle cx="1.5" cy="2" r="1.5" fill="#6B7280" />
                </svg>
                18 MB
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="self-center" width="3" height="4" viewBox="0 0 3 4" fill="none">
                  <circle cx="1.5" cy="2" r="1.5" fill="#6B7280" />
                </svg>
                PDF
              </span>
            </div>
            <div className="inline-flex self-center items-center">
              <button className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-600 dark:hover:bg-gray-500 dark:focus:ring-gray-600" type="button">
                <svg className="w-4 h-4 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  {/* SVG Content */}
                </svg>
              </button>
            </div>
          </div>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
        </div>
      </div>

      {/* Dropdown Toggle Button */}
      <button onClick={toggleDropdown} className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600" type="button">
        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
          <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-40 dark:bg-gray-700 dark:divide-gray-600">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Reply</a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Forward</a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Copy</a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Delete</a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileChat;
