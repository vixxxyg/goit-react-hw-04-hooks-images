import React from 'react';
import s from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

function ImageGalleryItem({
  item: { id, webformatURL, largeImageURL, tags },
  onClick,
}) {
  return (
    <li className={s.ImageGalleryItem}>
      <img
        src={webformatURL}
        alt={tags}
        className={s.ImageGalleryItem__image}
        id={id}
        onClick={() => onClick(largeImageURL)}
      />
    </li>
  );
}

ImageGalleryItem.defaultProps = {
  onClick: () => null,
};

ImageGalleryItem.propTypes = {
  onClick: PropTypes.func,
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),
};

export default ImageGalleryItem;
