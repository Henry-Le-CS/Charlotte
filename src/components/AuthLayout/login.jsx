import facebook from '$/assets/icons/facebook.png';
import google from '$/assets/icons/google.png';
import PasswordInput from '$/components/PasswordInput';
import Spring from '$/components/Spring';
import { login } from '$/services/user';
import classNames from 'classnames';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LoginSocialFacebook, LoginSocialGoogle } from 'reactjs-social-login';
import loginImg from '../../../design/1558355117500.jfif';
import RouterLinks from '../RouterLinks/index';
import styles from './index.module.scss';
const AuthLayout = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, control, setValue } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit = async (data) => {
        const formData = new FormData();

        Object.keys(data).forEach(key => {
            if (typeof data[key] === 'object' && data[key] !== null) {
                Object.keys(data[key]).forEach(subKey => {
                    if (data[key][subKey] !== '') {
                        setValue(`${key}.${subKey}`, data[key][subKey]);
                        formData.append(`${key}[${subKey}]`, data[key][subKey]);
                    }
                });
            } else if (data[key] !== '') {
                setValue(key, data[key]); 
                formData.append(key, data[key]);
            }
        });

        try {
            const results = await login(formData);
            toast.success(results.message);
            setTimeout(() => navigate('/chat'), 3000)
        } catch (error) {
            toast.error('Login failed: ' + error.response.data.message || error.message || error);
        }
    };

    const onReject = (err) => {
        toast.error(err);
    }
    return (
        <div className={`p-10 min-h-screen flex items-center justify-center bg-gray-50 ${styles.container}`}>
            <div className="flex lg:flex-row lg:w-[80%] shadow-lg rounded-xl min-h-[60vh]">
                <img className='max-w-[450px] rounded-l-lg' src={loginImg} alt="" />
                <div className="bg-white w-full flex items-center justify-center">
                <Spring className="max-w-[80%] w-full" type="slideUp" duration={400} delay={300}>
                    <div className="text-center mb-10">
                        <h1 className="text-5xl font-semibold">Chào mừng trở lại!</h1>
                        <p className="text-gray-500 text-2xl mt-2">Hãy đăng nhập để tiếp tục sử dụng!</p>
                    </div>
                    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-6">
                            <div className="relative">
                                <label htmlFor="email" className="block text-2xl font-medium text-left text-gray field-label">E-mail</label>
                                <input
                                    className={classNames('text-3xl border-none mt-2 block w-full h-50 px-4 py-3 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500', {
                                        'ring-2 ring-red-500': errors.email,
                                    })}
                                    id="email"
                                    type="email"
                                    placeholder="Nhập E-Mail"
                                    {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                                />
                                {errors.email && <span className="text-red-500 text-md">E-mail không hợp lệ</span>}
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
                            <RouterLinks to='/user/forgot-password' className="text-md text-blue-600 hover:underline">Quên mật khẩu?</RouterLinks>
                            <button type="submit" className="bg-blue-600 text-white py-3 px-5 rounded-lg hover:bg-blue-700 transition-all">Đăng nhập</button>
                        </div>
                    </form>

                    <div className="my-10">
                        <div className="relative text-center">
                            <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gray-300"></span>
                            <span className="text-3xl relative bg-white px-4 text-lg text-gray-500">hoặc</span>
                        </div>
                        <div className="mt-8 grid grid-cols-2 gap-6">
                            <LoginSocialGoogle
                                className="border-none flex items-center justify-center gap-3 bg-gray-100 border border-gray-300 rounded-lg py-3 px-5 hover:bg-gray-200 transition-all"
                                client_id={import.meta.env.VITE_GOOGLE_APP_ID}
                                onReject={onReject}
                                onResolve={onSubmit}
                            >
                                <img className="w-6" src={google} alt="Google" />
                                Google
                            </LoginSocialGoogle>

                            <LoginSocialFacebook
                                className="border-none flex items-center justify-center gap-3 bg-gray-100 border border-gray-300 rounded-lg py-3 px-5 hover:bg-gray-200 transition-all"
                                appId={import.meta.env.VITE_FB_APP_ID}
                                onReject={onReject}
                                onResolve={onSubmit}
                            >
                                <img className="w-6" src={facebook} alt="Facebook" />
                                Facebook
                            </LoginSocialFacebook>
                        </div>
                    </div>

                    <div className="flex justify-center items-center gap-3 ">
                        <p className="text-gray-500 text-3xl">Bạn chưa có tài khoản?</p>
                        <RouterLinks to='/user/register' className="text-3xl text-blue-600 hover:underline">Đăng ký</RouterLinks>
                    </div>
                </Spring>

                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
