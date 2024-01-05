import PropTypes from 'prop-types';
import { Button } from './customButton.style';

export const CustomButton = ({ text, color = '#f5f5f5', onClick, disabled = false }) => {
    return (
        <Button
            onClick={onClick}
            disabled={disabled}
            color={color}
        >
            {text}
        </Button>
    );
}

CustomButton.propTypes = {
    text: PropTypes.string.isRequired,
    color: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool
}

export default CustomButton;