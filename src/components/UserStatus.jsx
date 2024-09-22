import { PropTypes } from 'prop-types';
import { FaCircle } from "react-icons/fa";
import styled from 'styled-components';

const StatusCircle = styled(FaCircle)`
  width: 15px !important;
  color: ${props => props.color};
  position: absolute;
  top: 0;
  right: 0;
  &:hover {
        cursor: default !important;
        color: ${props => props.color} !important;
        fill: revert-layer !important;
  }
`;

const UserStatus = ({ status }) => {
    const color = status === 'active' ? 'green' : status === 'inactive' ? 'red' : 'gray';

    return (
        <StatusCircle color={color} />
    );
}

UserStatus.propTypes = {
    status: PropTypes.oneOf(['active', 'inactive', 'lazy']).isRequired,
}
export default UserStatus;
