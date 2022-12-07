import CONFIG from '../../globals/config';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const createMenuItemListTemplate = (restaurant) => restaurant.map((item) => `<li><span tabindex="0">${item.name}</span></li>`).join('');
const createCategoriesTemplate = (restaurant) => restaurant.map((item) => `<li><span tabindex="0">${item.name}</span></li>`).join('');
const createRestaurantDetailTemplate = (restaurant) => `
  <h2 class="movie__title">${restaurant.name}</h2>
  <img class="movie__poster" src="${CONFIG.BASE_IMAGE_URL}/medium/${restaurant.pictureId}" alt="${restaurant.name}" />
  <div class="movie__info">
    <h3>Information</h3>
    <h4>Name</h4>
    <p>${restaurant.name}</p>
    <h4>Address</h4>
    <p>${restaurant.address}</p>
    <h4>City</h4>
    <p>${restaurant.city}</p>
    <h4>Description</h4>
    <p>${restaurant.description}</p>
    <h4>Categories</h4>
    <p>${createCategoriesTemplate(restaurant.categories)}</p>
    <h4>Menu</h4>
    <h4>Food</h4>
    <p>${createMenuItemListTemplate(restaurant.menus.foods)}</p>
    <h4>Drink<h4>
    <p>${createMenuItemListTemplate(restaurant.menus.drinks)}</p>
  </div>
  <div class="movie__overview">
    <h3>Customer Reviews</h3>
  ${restaurant.customerReviews.map((review) => `
  <div class="review">
    <b>${review.name}</b>
    <p>${review.date}</b>
    <p>${review.review}</b>
  `).join('')}
  </div>
  </div>
`;

const createMovieItemTemplate = (cafe) => `
  <div class="movie-item" tabindex="0">
    <div class="movie-item__header">
      <img class="lazyload" alt="${cafe.name || '-'}"
         data-src="${CONFIG.BASE_IMAGE_URL}/large/${cafe.pictureId}">
      <div class="movie-item__header__rating">
        <p>⭐️<span class="movie-item__header__rating__score">${cafe.rating}</span></p>
      </div>
    </div>
    <div class="movie-item__content">
      <h3 class="movie__title"><a href="/#/detail/${cafe.id}">${cafe.name || '-'}</a></h3>
      <p>${cafe.description}</p>
      <p>${cafe.review || '-'}</p>
    </div>
  </div>
`;

const createLikeRestaurantButtonTemplate = () => `
  <button aria-label="like this movie" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createUnlikeRestaurantButtonTemplate = () => `
  <button aria-label="unlike this movie" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createMovieItemTemplate,
  createRestaurantDetailTemplate,
  createLikeRestaurantButtonTemplate,
  createUnlikeRestaurantButtonTemplate,
};
