import TheRestaurantDbSource from '../../data/therestaurantdb-source';
import { createMovieItemTemplate } from '../templates/template-creator';
import CONFIG from '../../globals/config';

const NowPlaying = {
  async render() {
    return `
        <div class="hero-element">
        <img src="${CONFIG.BASE_IMAGE_URL}/medium/21" alt="hero element">
        </div>
        <h2 class="content__heading">Restaurant</h2>
        <div id="movies" class="movies">
        </div>
      `;
  },

  async afterRender() {
    const cafes = await TheRestaurantDbSource.listRestaurant();
    const moviesContainer = document.querySelector('#movies');
    cafes.forEach((restaurants) => {
      moviesContainer.innerHTML += createMovieItemTemplate(restaurants);
    });
  },
};

export default NowPlaying;
