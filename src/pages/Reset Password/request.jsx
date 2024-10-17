import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Request = () => {
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm({
        defaultValues: {
            email: ''
        }
    });

    const onSubmit = async (data) => {
        try {
            toast.success('Vui lòng chờ trong giây lát, hệ thống đang chuyển trang!');
            setTimeout(() => navigate('/email-sent', { state: { email: data?.email, options: 'reset-password' } }), 2000);
        } catch (error) {
            toast.error(error.response.data.message || error.message || error);
        }
    };
    return (
        <div className="w-[800px] h-[300px] flex flex-col items-center shadow-2xl m-auto rounded-2xl py-[40px] text-black bg-[var(--primary-color)] mt-[200px]">
            <h2 className="text-2xl font-bold mb-4">Chào mừng bạn đã đến với Charlotte</h2>
            <p className="mb-6">Hãy nhập email mà bạn muốn lấy lại mật khẩu.</p>
            <form onSubmit={handleSubmit(onSubmit)} className="w-1/2 px-[40px]">
                <div className="relative pb-4 mb-6 w-full flex content-between">
                    <input
                        type="email"
                        className="w-full bg-transparent text-[14px] border-0 border-b-black border-b-2 text-white focus:border-primary focus:ring-0 focus:border-gradient-primary-secondary"
                        placeholder="Nhập Email"
                        {...register('email', {
                            required: 'E-mail không được để trống',
                            pattern: { value: /^\S+@\S+$/i, message: 'E-mail không hợp lệ' }
                        })}
                        id="name"
                        required
                    />
                </div>
                <button className="bg-blue-600 text-white rounded-lg px-7 py-3 font-medium text-sm transition-transform duration-300 transform hover:bg-blue-700 hover:shadow-lg hover:translate-y-0 active:bg-blue-800 active:translate-y-1 focus:outline-none">
                    Gửi
                </button>
            </form>
        </div>
    );
};
export default Request