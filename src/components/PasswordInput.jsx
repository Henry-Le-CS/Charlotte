// hooks
import { forwardRef, useEffect, useState } from 'react';

// utils
import classNames from 'classnames';
import PropTypes from 'prop-types';

const PasswordInput = forwardRef(({ id, label = 'Password', isInvalid, ...props }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = e => {
        e.preventDefault();
        setIsPasswordVisible(!isPasswordVisible);
    }

    useEffect(() => {
        props.value === '' && setIsPasswordVisible(false);
    }, [props.value]);

    return (
        <div className="field-wrapper">
            <label className="field-label" htmlFor={id}>
                {label}
            </label>
            <div className="relative">
                <input
                    className={classNames('text-3xl border-none mt-1 w-full px-3 py-2 rounded-lg shadow-sm', {
                        'field-input--error': !!isInvalid // Ensure this is always a boolean
                    })}
                    id={id}
                    type={isPasswordVisible ? 'text' : 'password'}
                    ref={ref} // Use ref here instead of innerRef
                    {...props}
                />
                <button
                    className="field-btn"
                    onClick={togglePasswordVisibility}
                    aria-label="Toggle password visibility">
                    <i className={`icon icon-eye${isPasswordVisible ? '-slash-regular' : '-regular' }`}/>
                </button>
            </div>
        </div>
    );
});

// Set the display name for better debugging and to fix the eslint error
PasswordInput.displayName = 'PasswordInput';

PasswordInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    isInvalid: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    value: PropTypes.string
};

export default PasswordInput;
