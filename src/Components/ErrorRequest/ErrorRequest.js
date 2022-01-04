import React from 'react';
import errorImage from './error.jpg';
import PropTypes from 'prop-types';

function ErrorRequest({ message }) {
  return (
    <div
      role="alert"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        margin: '0 auto',
        padding: 20,
      }}
    >
      <img
        src={errorImage}
        width="300"
        alt="sadcat"
        style={{ display: 'block', margin: 'auto' }}
      />
      <p>{message}</p>
    </div>
  );
}

ErrorRequest.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorRequest;
