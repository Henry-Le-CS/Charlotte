import { useTheme } from '$/contexts/themeContext';
import PropTypes from 'prop-types'; // Thêm import PropTypes
import { memo } from 'react';
import { NavLink } from 'react-router-dom';

import dark from '$/assets/logo_dark.svg';
import light from '$/assets/logo_light.svg';

const Logo = ({ imgClass, textClass }) => {
    const theme = useTheme();

    return (
        <NavLink className="logo" to="/">
            <span className={`logo_img relative ${imgClass || ''}`}>
                <img src={light} alt="Charlotte" />
                <img className={`absolute top-0 left-0 ${theme === 'light' ? 'hidden' : ''}`}
                     src={dark}
                     alt="Charlotte" />
            </span>
            <h4 className={`logo_text ${textClass || ''}`}>Charlotte</h4>
        </NavLink>
    );
};

// Thêm PropTypes để xác định kiểu dữ liệu cho các props
Logo.propTypes = {
    imgClass: PropTypes.string,
    textClass: PropTypes.string,
};

export default memo(Logo);
