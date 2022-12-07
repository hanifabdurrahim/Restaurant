/* eslint-disable no-new */
import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import FavoriteRestaurantSearchView from './liked-restaurant/favorite-restaurant-search-view';
import FavoriteRestaurantSearchPresenter from './liked-restaurant/favorite-restaurant-search-presenter';
import FavoriteRestaurantShowPresenter from './liked-restaurant/favorite-restaurant-show-presenter';

const view = new FavoriteRestaurantSearchView();

const Like = {
  async render() {
    return view.getTemplate();
  },

  async afterRender() {
    new FavoriteRestaurantShowPresenter({ view, favoriteRestaurant: FavoriteRestaurantIdb });
    new FavoriteRestaurantSearchPresenter({ view, favoriteRestaurant: FavoriteRestaurantIdb });
  },
};
export default Like;
