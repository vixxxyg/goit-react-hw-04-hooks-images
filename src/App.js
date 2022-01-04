import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Components/Searchbar';
import ImageGallery from './Components/ImageGallery';
import Modal from './Components/Modal';
import s from './App.module.css';

export default function App() {
  const [request, setRequest] = useState();
  const [activeImageURL, setActiveImageURL] = useState(null);

  const handleFormSubmit = request => {
    setRequest(request);
  };

  const getActiveImageURL = imageURL => {
    setActiveImageURL(imageURL);
  };

  const toggleModal = () => {
    setActiveImageURL(null);
  };

  return (
    <div className={s.App} style={{ margin: '0 auto', padding: 20 }}>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery request={request} getImageURL={getActiveImageURL} />
      {activeImageURL && (
        <Modal onClose={toggleModal} imageURL={activeImageURL}>
          <img src={activeImageURL} alt={request} />
        </Modal>
      )}

      <ToastContainer autoClose={3000} />
    </div>
  );
}
