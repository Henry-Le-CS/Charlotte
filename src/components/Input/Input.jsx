import PropTypes from 'prop-types';

const FormField = ({ name, placeholder, value, onChange, onBlur }) => {
  return (
    <input
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};

FormField.propTypes = {
  control: PropTypes.object.isRequired,
  component: PropTypes.elementType,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
};

export default FormField;
