import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Success = () => {
    const [drawn, setDrawn] = useState(false);
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
      setTimeout(() => {
        setDrawn(true);
      }, 500);
    }, []);
    try {
      const params = new URLSearchParams(location.search);
      const success = params.get('success') === 'true';
      const message = params.get('message');
      const status = parseInt(params.get('status'), 10);

      if (status === 200 && success) {
          toast.success(message);
          setTimeout(() => navigate('/user/login'), 3000);
      } else {
          toast.error(message);
      }
  } catch (error) {
      throw new Error(error.message || error);
  }
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative w-4/5 max-w-3xl p-8 text-center bg-white rounded-md shadow-xl sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2">
        <h1 className="text-3xl font-semibold text-teal-600">
          Congrat
          <span className="hidden sm:inline">ulation</span>s!
        </h1>

        <div className="flex justify-center mt-4">
          <div className="relative w-24 h-24">
            <svg
              version="1.1"
              id="tick"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 37 37"
              className="w-full h-full"
              style={{ enableBackground: "new 0 0 37 37" }}
              xmlSpace="preserve"
            >
              <path
                className={`${
                  drawn ? "stroke-dashoffset-0" : "stroke-dashoffset-[130]"
                } circ transition-all duration-1000 ease-in-out fill-teal-300 stroke-teal-700 stroke-3`}
                d="M30.5,6.5L30.5,6.5c6.6,6.6,6.6,17.4,0,24l0,0c-6.6,6.6-17.4,6.6-24,0l0,0c-6.6-6.6-6.6-17.4,0-24l0,0C13.1-0.2,23.9-0.2,30.5,6.5z"
              />
              <polyline
                className={`${
                  drawn ? "stroke-dashoffset-0" : "stroke-dashoffset-[50]"
                } tick transition-all duration-1000 delay-500 ease-out fill-none stroke-white stroke-3`}
                points="11.6,20 15.9,24.2 26.4,13.8"
              />
            </svg>
          </div>
        </div>

        <div className="mt-6 text-teal-800">
          <p className="mb-2">
            You have successfully booked an appointment with us.
          </p>
          <p>
            <strong>Date:</strong> 12.12.12 <br />
            <strong>Time:</strong> 11am <br />
            <strong>ID:</strong> 12324
          </p>
        </div>

        <p className="mt-4 text-sm text-teal-700">Eagerly awaiting your visit</p>
        <p className="mt-6 text-xs text-teal-600">Regards, Team Tarini Netradham</p>
      </div>
    </div>
  );
};

export default Success;
