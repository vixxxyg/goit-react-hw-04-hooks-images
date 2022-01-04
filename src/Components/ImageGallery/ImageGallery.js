import React, { useState, useEffect } from 'react';
import galleryAPI from '../../API/API';
import ImageGalleryItem from '../ImageGalleryItem';
import ErrorRequest from '../ErrorRequest';
import Loader from '../Loader';
import Button from '../Button';
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function ImageGallery({ request, getImageURL }) {
  const [gallery, setGallery] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    if (!request) {
      return;
    }

    setStatus(Status.PENDING);

    galleryAPI
      .fetchGallery(request, 1)
      .then(gallery => {
        setGallery(gallery);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [request]);

  useEffect(() => {
    if (pageNumber !== 1) {
      galleryAPI
        .fetchGallery(request, pageNumber)
        .then(newGallery => {
          setGallery([...gallery, ...newGallery]);
          setStatus(Status.RESOLVED);
        })
        .catch(error => {
          setError(error);
          setStatus(Status.REJECTED);
        });
    }
  }, [pageNumber]);

  const getActiveImageURL = imageURL => {
    getImageURL(imageURL);
  };

  const loadMoreImages = () => {
    setPageNumber(pageNumber + 1);
  };

  if (status === Status.IDLE) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        Введите Ваш запрос.
      </div>
    );
  }

  if (status === Status.PENDING) {
    return <Loader />;
  }

  if (status === Status.REJECTED) {
    return <ErrorRequest message={error.message} />;
  }

  if (status === Status.RESOLVED) {
    return (
      <>
        <ul className={s.ImageGallery}>
          {gallery.map(item => (
            <ImageGalleryItem
              item={item}
              key={item.id}
              onClick={getActiveImageURL}
            />
          ))}
        </ul>

        <Button
          onClick={loadMoreImages}
          aria-label="Загрузить больше картинок"
        />
      </>
    );
  }
}

ImageGallery.propTypes = {
  request: PropTypes.string.isRequired,
  getImageURL: PropTypes.func.isRequired,
};
