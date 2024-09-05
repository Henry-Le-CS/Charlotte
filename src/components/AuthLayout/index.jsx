import facebook from '$/assets/icons/facebook.png';
import google from '$/assets/icons/google.png';
import PasswordInput from '$/components/PasswordInput';
import Spring from '$/components/Spring';
import classNames from 'classnames';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LoginSocialFacebook, LoginSocialGoogle } from 'reactjs-social-login';
import RouterLinks from '../RouterLinks/index';

const AuthLayout = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, control } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit = () => {
        navigate('/');
    }

    const onReject = (err) => {
        toast.error(err);
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="flex flex-col lg:flex-row lg:w-[80%] shadow-xl rounded-xl overflow-hidden">
                <div className="hidden lg:flex lg:flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white lg:p-[60px]">
                    <h2 className="text-3xl font-bold mb-6">Chào mừng trở lại!</h2>
                    <p className="text-lg font-medium text-center max-w-sm">Quản lý tổ chức thông minh và hiệu quả với các công cụ chuyên sâu</p>
                    {/* <img className="max-w-[450px] mt-10" src={media} alt="media" /> */}
                </div>
                <div className="bg-white w-full p-8 lg:p-[60px] flex items-center justify-center">
                    <Spring className="max-w-[460px] w-full" type="slideUp" duration={400} delay={300}>
                        <div className="text-center mb-8">
                            <h1 className="text-2xl font-semibold">Chào mừng trở lại!</h1>
                            <p className="text-gray-500">Hãy đăng nhập để tiếp tục sử dụng!</p>
                        </div>
                        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            <div className="space-y-4">
                                <div className="relative">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
                                    <input
                                        className={classNames('mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500', {
                                            'border-red-500': errors.email
                                        })}
                                        id="email"
                                        type="email"
                                        placeholder="Nhập E-Mail"
                                        {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                                    />
                                    {errors.email && <span className="text-red-500 text-sm">E-mail không hợp lệ</span>}
                                </div>

                                <Controller
                                    name="password"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <PasswordInput
                                            id="password"
                                            placeholder="Nhập mật khẩu"
                                            error={errors.password}
                                            innerRef={field.ref}
                                            isInvalid={errors.password}
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    )}
                                />
                            </div>

                            <div className="flex justify-between items-center">
                                <RouterLinks to='/user/forgot-password' className="text-sm text-blue-600 hover:underline">Quên mật khẩu?</RouterLinks>
                                <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all">Đăng nhập</button>
                            </div>
                        </form>

                        <div className="my-8">
                            <div className="relative text-center">
                                <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gray-300"></span>
                                <span className="relative bg-white px-3 text-gray-500">hoặc</span>
                            </div>
                            <div className="mt-6 grid grid-cols-2 gap-4">
                                <LoginSocialGoogle
                                    className="flex items-center justify-center gap-2 bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 hover:bg-gray-200 transition-all"
                                    client_id={import.meta.env.VITE_GOOGLE_APP_ID}
                                    onReject={onReject}
                                    onResolve={onSubmit}
                                >
                                    <img className="w-5" src={google} alt="Google" />
                                    Google
                                </LoginSocialGoogle>

                                <LoginSocialFacebook
                                    className="flex items-center justify-center gap-2 bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 hover:bg-gray-200 transition-all"
                                    appId={import.meta.env.VITE_FB_APP_ID}
                                    onReject={onReject}
                                    onResolve={onSubmit}
                                >
                                    <img className="w-5" src={facebook} alt="Facebook" />
                                    Facebook
                                </LoginSocialFacebook>
                            </div>
                        </div>

                        <div className="flex justify-center items-center gap-2">
                            <p className="text-gray-500">Bạn chưa có tài khoản?</p>
                            <RouterLinks to='/user/register' className="text-blue-600 hover:underline">Đăng ký</RouterLinks>
                        </div>
                    </Spring>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
