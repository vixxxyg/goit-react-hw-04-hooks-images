import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Components/Searchbar';
import ImageGallery from './Components/ImageGallery';
import Modal from './Components/Modal';
import s from './App.module.css';

class App extends Component {
  state = {
    request: '',
    activeImageURL: null,
  };

  handleFormSubmit = request => {
    this.setState({ request });
  };

  getActiveImageURL = imageURL => {
    this.setState({ activeImageURL: imageURL });
  };

  toggleModal = () => {
    this.setState({ activeImageURL: null });
  };

  render() {
    const { activeImageURL, request } = this.state;

    return (
      <div className={s.App} style={{ margin: '0 auto', padding: 20 }}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          request={this.state.request}
          getImageURL={this.getActiveImageURL}
        />
        {activeImageURL && (
          <Modal onClose={this.toggleModal} imageURL={activeImageURL}>
            <img src={activeImageURL} alt={request} />
          </Modal>
        )}

        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default App;
