import React, { Component } from 'react';
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

class ImageGallery extends Component {
  state = {
    gallery: null,
    error: null,
    status: Status.IDLE,
    pageNumber: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevRequest = prevProps.request;
    const nextRequest = this.props.request;
    const { pageNumber } = this.state;

    if (prevRequest !== nextRequest) {
      this.setState({ status: Status.PENDING, pageNumber: 1 });

      galleryAPI
        .fetchGallery(nextRequest, 1)
        .then(gallery => {
          this.setState({ gallery, status: Status.RESOLVED });
        })
        .catch(error => this.setState({ error, status: Status.REJECTED }));
    }

    if (prevState.pageNumber !== pageNumber && pageNumber !== 1) {
      galleryAPI
        .fetchGallery(nextRequest, pageNumber)
        .then(newGallery => {
          this.setState(({ gallery }) => ({
            gallery: [...gallery, ...newGallery],
            status: Status.RESOLVED,
          }));
        })
        .catch(error => this.setState({ error, status: Status.REJECTED }));
    }
  }

  getActiveImageURL = imageURL => {
    this.props.getImageURL(imageURL);
  };

  loadMoreImages = () => {
    this.setState(({ pageNumber }) => ({ pageNumber: pageNumber + 1 }));
  };

  render() {
    const { gallery, error, status } = this.state;

    if (status === 'idle') {
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

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'rejected') {
      return <ErrorRequest message={error.message} />;
    }

    if (status === 'resolved') {
      return (
        <>
          <ul className={s.ImageGallery}>
            {gallery.map(item => (
              <ImageGalleryItem
                item={item}
                key={item.id}
                onClick={this.getActiveImageURL}
              />
            ))}
          </ul>

          <Button
            onClick={this.loadMoreImages}
            aria-label="Загрузить больше картинок"
          />
        </>
      );
    }
  }
}

ImageGallery.propTypes = {
  request: PropTypes.string.isRequired,
  getImageURL: PropTypes.func.isRequired,
};

export default ImageGallery;
