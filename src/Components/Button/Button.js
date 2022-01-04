import React from 'react';
import PropTypes from 'prop-types';
import s from './Button.module.css';

const Button = ({ onClick, ...allyProps }) => (
  <button type="button" className={s.Button} onClick={onClick} {...allyProps}>
    Load more
  </button>
);

Button.defaultProps = {
  onClick: () => null,
};

Button.propTypes = {
  onClick: PropTypes.func,
  'aria-label': PropTypes.string.isRequired,
};

export default Button;
