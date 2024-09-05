// components
// import Logo from '$/components/Logo';
import PasswordInput from '$/components/PasswordInput';
import Spring from '$/components/Spring';
import { toast } from 'react-toastify';
import { LoginSocialFacebook, LoginSocialGoogle } from 'reactjs-social-login';
import RouterLinks from '../RouterLinks/index';

// hooks
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

// utils
import classNames from 'classnames';

// assets
import facebook from '$/assets/icons/facebook.png';
import google from '$/assets/icons/google.png';

const AuthLayout = () => {
    // const {width} = useWindowSize();
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}, control} = useForm({
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

    const handlePasswordReminder = e => {
        e.preventDefault();
    }

    return (
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 4xl:grid-cols-[minmax(0,_1030px)_minmax(0,_1fr)]">
            {
                // width >= 1024 &&
                // <div className="flex flex-col justify-center items-center lg:p-[60px]">
                //     {/* <Logo imgClass="w-[60px]" textClass="text-[28px]"/> */}
                //     <p className="text-center tracking-[0.2px] font-semibold text-lg leading-6 max-w-[540px] my-7 mx-auto">
                //         Gain data-based insights, view progress at a glance, and manage your organization smarter
                //     </p>
                //     <img className="max-w-[780px]" src={media} alt="media"/>
                // </div>
            }
            <div className="bg-widget flex items-center justify-center w-full py-10 px-4 lg:p-[60px]">
                <Spring className="max-w-[460px] w-full" type="slideUp" duration={400} delay={300}>
                    <div className="flex flex-col gap-2.5 text-center">
                        <h1>Chào mừng trở lại!</h1>
                        <p className="lg:max-w-[300px] m-auto 4xl:max-w-[unset]">
                            Hãy đăng nhập để tiếp tục sử dụng!
                        </p>
                    </div>
                    <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-5">
                            <div className="field-wrapper">
                                <label htmlFor="email" className="field-label">E-mail</label>
                                <input className={classNames('field-input', {'field-input--error': errors.email})}
                                       id="email"
                                       type="text"
                                       placeholder="Nhập E-Mail"
                                       {...register('email', {required: true, pattern: /^\S+@\S+$/i})}
                                       />
                            </div>
                            <Controller name="password"
                                        control={control}
                                        rules={{required: true}}
                                        render={({field}) => (
                                            <PasswordInput id="password"
                                                           placeholder="Nhập mật khẩu"
                                                           error={errors.password}
                                                           innerRef={field.ref}
                                                           isInvalid={errors.password}
                                                           value={field.value}
                                                           onChange={field.onChange}/>
                                        )}/>
                        </div>
                        <div className="flex flex-col items-center gap-6 mt-4 mb-10">
                            <button className="text-btn" onClick={handlePasswordReminder}>
                                <RouterLinks to='/user/forgot-password'>Quên mật khẩu?</RouterLinks>
                            </button>
                            <button className="btn btn--primary w-full">Đăng nhập</button>
                        </div>
                    </form>
                    <div>
                        <div className="relative">
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1px] bg-border"/>
                            <span className="flex items-center justify-center relative z-10 w-11 h-[23px] m-auto bg-widget">
                                hay
                            </span>
                        </div>
                        <div className="grid grid-cols-1 gap-4 2xs:grid-cols-2 xs:gap-[30px] mt-[30px] mb-9">
                            <LoginSocialGoogle className="btn btn--social"
                                               client_id={import.meta.env.VITE_GOOGLE_APP_ID}
                                               onReject={onReject}
                                               onResolve={onSubmit}>
                                <img className="icon" src={google} alt="Google"/>
                                Google
                            </LoginSocialGoogle>
                            <LoginSocialFacebook className="btn btn--social"
                                                 appId={import.meta.env.VITE_FB_APP_ID}
                                                 onRejec={onReject}

                                                 onResolve={onSubmit}>
                                <img className="icon" src={facebook} alt="Facebook"/>
                                Facebook
                            </LoginSocialFacebook>
                        </div>
                        <div className="flex justify-center gap-2.5 leading-none">
                            <p>Bạn chưa có tài khoản?</p>
                            <button className="text-btn">
                                <RouterLinks to='/user/register'>Đăng ký</RouterLinks>
                            </button>
                        </div>
                    </div>
                </Spring>
            </div>
        </div>
    )
}

export default AuthLayout