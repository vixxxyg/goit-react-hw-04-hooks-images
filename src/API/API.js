const API_KEY = '23663516-5b9185b3c8a7e0813ba6eb26c';
const BASE_URL = 'https://pixabay.com';

function fetchGallery(nextRequest, pageNumber) {
  return fetch(
    `${BASE_URL}/api/?q=${nextRequest}&page=${pageNumber}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  )
    .then(response => response.json())
    .then(gallery => {
      if (gallery.hits.length === 0) {
        return Promise.reject(
          new Error(`По запросу: ${nextRequest} ничего не найдено.`),
        );
      }
      return gallery.hits;
    });
}

const api = {
  fetchGallery,
};

export default api;
