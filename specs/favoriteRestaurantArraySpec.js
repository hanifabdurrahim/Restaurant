import { itActsAsfavoriteRestaurantModel } from './contract/favoriteRestaurantContract';

let favoriteRestaurant = [];

const FavoriteRestaurantArray = {
  getRestaurant(id) {
    if (!id) {
      return;
    }

    // eslint-disable-next-line consistent-return, eqeqeq
    return favoriteRestaurant.find((restaurant) => restaurant.id == id);
  },

  getAllRestaurant() {
    return favoriteRestaurant;
  },

  putRestaurant(restaurant) {
    // eslint-disable-next-line no-prototype-builtins
    if (!restaurant.hasOwnProperty('id')) {
      return;
    }

    // pastikan id ini belum ada dalam daftar favoriteRestaurant
    if (this.getRestaurant(restaurant.id)) {
      return;
    }

    favoriteRestaurant.push(restaurant);
  },

  deleteRestaurant(id) {
    // cara boros menghapus film dengan meng-copy film yang ada
    // kecuali film dengan id == id
    // eslint-disable-next-line eqeqeq
    favoriteRestaurant = favoriteRestaurant.filter((restaurant) => restaurant.id != id);
  },

  searchRestaurant(query) {
    return this.getAllRestaurant()
      .filter((restaurant) => {
        const loweredCaseMovieTitle = (restaurant.title || '-').toLowerCase();
        const jammedMovieTitle = loweredCaseMovieTitle.replace(/\s/g, '');

        const loweredCaseQuery = query.toLowerCase();
        const jammedQuery = loweredCaseQuery.replace(/\s/g, '');

        // eslint-disable-next-line eqeqeq
        return jammedMovieTitle.indexOf(jammedQuery) != -1;
      });
  },
};

describe('Favorite restaurant Array Contract Test Implementation', () => {
  // eslint-disable-next-line no-return-assign
  afterEach(() => favoriteRestaurant = []);

  itActsAsfavoriteRestaurantModel(FavoriteRestaurantArray);
});
