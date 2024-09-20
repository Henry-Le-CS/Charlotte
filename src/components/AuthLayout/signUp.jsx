import facebook from '$/assets/icons/facebook.png';
import google from '$/assets/icons/google.png';
import PasswordInput from '$/components/PasswordInput';
import Spring from '$/components/Spring';
import { signup } from '$/services/user';
import classNames from 'classnames';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LoginSocialFacebook, LoginSocialGoogle } from 'reactjs-social-login';
import loginImg from '../../../design/1558355117500.jfif';
import RouterLinks from '../RouterLinks/index';
import styles from './index.module.scss';
const AuthLayout = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, control, watch, setValue } = useForm({
        defaultValues: {
            userDetails: {
                username: '',
                phoneNumber: '',
                email: '',
                password: ''
            },
            permissions: {
                resource: 'default/local',
                actions: ['read']
            }
        }
    });

    const password = watch('userDetails.password');

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
            const results = await signup(formData);
            toast.success(results.message);
            setTimeout(() => navigate('/email-sent', { state: { email: results.metadata?.email, userId: results.metadata?._id } }), 3000);
        } catch (error) {
            toast.error('Registration failed: ' + error.message);
        }        
    };

    useEffect(() => {
        setValue('userDetails.phoneNumber', '');
    }, [setValue]);

    const onReject = (err) => {
        toast.error(err);
    };

    return (
        <div className={`p-10 min-h-screen flex items-center justify-center bg-gray-50 ${styles.container}`}>
            <div className="flex lg:flex-row lg:w-[80%] shadow-lg rounded-xl min-h-[60vh]">
                <img className='max-w-[450px] rounded-l-lg' src={loginImg} alt="Login Illustration" />
                <div className="bg-white w-full flex items-center justify-center">
                    <Spring className="max-w-[80%] w-full" type="slideUp" duration={400} delay={300}>
                        <div className="text-center mb-10">
                            <h1 className="text-5xl font-semibold">Tạo tài khoản mới</h1>
                            <p className="text-gray-500 text-2xl mt-2">Hãy đăng ký để tham gia cộng đồng của chúng tôi!</p>
                        </div>
                        <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
                            <div className="space-y-6">
                                <div className="relative">
                                    <label htmlFor="name" className="block text-2xl font-medium text-left text-gray field-label">Tên</label>
                                    <input
                                        className={classNames('text-3xl border-none mt-2 block w-full h-50 px-4 py-3 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500', {
                                            'ring-2 ring-red-500': errors?.userDetails?.username,
                                        })}
                                        id="name"
                                        type="text"
                                        placeholder="Nhập Tên"
                                        {...register('userDetails.username', { required: 'Tên không được để trống' })}
                                    />
                                    {errors?.userDetails?.username && <span className="text-red-500 text-md">{errors.userDetails.name.message}</span>}
                                </div>

                                <div className="relative">
                                    <label htmlFor="email" className="block text-2xl font-medium text-left text-gray field-label">E-mail</label>
                                    <input
                                        className={classNames('text-3xl border-none mt-2 block w-full h-50 px-4 py-3 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500', {
                                            'ring-2 ring-red-500': errors?.userDetails?.email,
                                        })}
                                        id="email"
                                        type="email"
                                        placeholder="Nhập E-Mail"
                                        {...register('userDetails.email', {
                                            required: 'E-mail không được để trống',
                                            pattern: { value: /^\S+@\S+$/i, message: 'E-mail không hợp lệ' }
                                        })}
                                    />
                                    {errors?.userDetails?.email && <span className="text-red-500 text-md">{errors.userDetails.email.message}</span>}
                                </div>

                                <Controller
                                    name="userDetails.password"
                                    control={control}
                                    rules={{ required: 'Mật khẩu không được để trống' }}
                                    render={({ field }) => (
                                        <PasswordInput
                                            id="password"
                                            placeholder="Nhập mật khẩu"
                                            error={errors?.userDetails?.password}
                                            innerRef={field.ref}
                                            isInvalid={errors?.userDetails?.password}
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
                                {errors?.confirmPassword && <span className="text-red-500 text-md">{errors.confirmPassword.message}</span>}
                            </div>

                            <div className="flex justify-between items-center">
                                <RouterLinks to='/user/login' className="text-md text-blue-600 hover:underline">Đã có tài khoản? Đăng nhập</RouterLinks>
                                <button type="submit" className="bg-blue-600 text-white py-3 px-5 rounded-lg hover:bg-blue-700 transition-all">Đăng ký</button>
                            </div>
                        </form>

                        <div className="my-10">
                            <div className="relative text-center">
                                <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gray-300"></span>
                                <span className="text-3xl relative bg-white px-4text-gray-500">hoặc</span>
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
                    </Spring>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
