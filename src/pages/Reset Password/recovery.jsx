import PasswordInput from '$/components/PasswordInput';
import { Controller, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { recoveryPassword } from "../../services/user";

const Recovery = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const { status, userId } = location.state
    
    if (!status && !userId ) {
        toast.error('Invalid request')
    }
    const { handleSubmit, formState: { errors }, control, watch } = useForm({
        defaultValues: {
            userId: userId,
            password: ''
        }
    });
    const password = watch('password');
    const onSubmit = async (data) => {
        try {
            if (userId != null) {
                const payload = {
                    userId,
                    password: data.password
                };
                await recoveryPassword(payload);
                toast.success('Mật khẩu đã thay đổi, vui lòng đăng nhập lại!');
                setTimeout(() => navigate('/user/login'), 2000);
            }
        } catch (error) {
            toast.error(error.response.data.message || error.message || error);
        }
    };
    return (
        status === true && userId && <form onSubmit={handleSubmit(onSubmit)} className="w-[800px] h-[300px] rounded-3xl px-[100px] py-[40px] bg-[var(--primary-color)] mt-[200px] m-auto shadow-xl">
            <Controller
            name="password"
            control={control}
            rules={{ required: 'Mật khẩu không được để trống' }}
            render={({ field }) => (
                <PasswordInput
                    id="password"
                    placeholder="Nhập mật khẩu"
                    error={errors?.password}
                    innerRef={field.ref}
                    isInvalid={errors?.password}
                    value={field.value}
                    onChange={field.onChange}
                />
            )}
        />

        <Controller
            name="confirmPassword"
            control={control}
            rules={{
                required: 'Mật khẩu không khớp',
                validate: value => value === password || 'Mật khẩu không khớp'
            }}
            render={({ field }) => (
                <PasswordInput
                    id="confirmPassword"
                    placeholder="Nhập lại mật khẩu"
                    error={errors?.confirmPassword}
                    innerRef={field.ref}
                    isInvalid={errors?.confirmPassword}
                    value={field.value}
                    onChange={field.onChange}
                />
            )}
        />
        <button className="bg-blue-600 mt-[30px] text-white rounded-lg px-7 py-3 font-medium text-sm transition-transform duration-300 transform hover:bg-blue-700 hover:shadow-lg hover:translate-y-0 active:bg-blue-800 active:translate-y-1 focus:outline-none">
            Xác nhận
        </button>
        </form>
    )
}

export default Recovery