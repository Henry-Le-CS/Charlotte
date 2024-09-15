import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { Input } from '../Input';

const InputField = ({
  control,
  component,
  name,
  placeholder,
  value: internalValue,
  onChange: internalOnchange,
  ...otherProps
}) => {
  const Component = component || Input;

  const onBlurFields = (e) => {
    if ((e.target.localName === 'input' || e.target.localName === 'textarea') && e.target.value === '') {
      e.target.style.border = '1px solid red';
    }
  };

  const onChangeValue = (target) => {
    if (target.value.length !== 0) {
      target.style.border = '1px solid black';
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({ field: { onChange, onBlur, value, ref }, formState: { errors } }) => (
        <>
          <Component
            ref={ref}
            type="text"
            placeholder={placeholder}
            {...otherProps}
            onBlur={(e) => {
              onBlurFields(e);
              onBlur();
            }}
            onChange={(e) => {
              onChange(internalOnchange?.(e) ?? e.target.value);
              onChangeValue(e.target);
            }}
            value={internalValue ?? value}
            status={Boolean(errors?.[name]?.message)}
          />
          {errors?.[name]?.message && (
            <span style={{ fontSize: '12px', color: 'red', display: 'inline-block' }}>
              {'Nhập ' + placeholder}
            </span>
          )}
        </>
      )}
    />
  );
};

InputField.propTypes = {
  control: PropTypes.object.isRequired,
  component: PropTypes.elementType,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
};

export default InputField;
