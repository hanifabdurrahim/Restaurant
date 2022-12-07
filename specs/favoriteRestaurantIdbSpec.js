import { itActsAsfavoriteRestaurantModel } from './contract/favoriteRestaurantContract';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';

describe('Favorite Movie Idb Contract Test Implementation', () => {
  afterEach(async () => {
    (await FavoriteRestaurantIdb.getAllRestaurant()).forEach(async (restaurant) => {
      await FavoriteRestaurantIdb.deleteRestaurant(restaurant.id);
    });
  });

  itActsAsfavoriteRestaurantModel(FavoriteRestaurantIdb);
});
