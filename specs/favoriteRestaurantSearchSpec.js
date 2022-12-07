import FavoriteRestaurantSearchPresenter from '../src/scripts/views/pages/liked-restaurant/favorite-restaurant-search-presenter';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';
import FavoriteRestaurantSearchView from '../src/scripts/views/pages/liked-restaurant/favorite-restaurant-search-view';

describe('Searching restaurant', () => {
  let presenter;
  let favoriteRestaurant;
  let view;

  const searchRestaurant = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;
    queryElement.dispatchEvent(new Event('change'));
  };

  const setRestaurantSearchContainer = () => {
    view = new FavoriteRestaurantSearchView();
    document.body.innerHTML = view.getTemplate();
  };
  const constructPresenter = () => {
    favoriteRestaurant = spyOnAllFunctions(FavoriteRestaurantIdb);
    presenter = new FavoriteRestaurantSearchPresenter({
      favoriteRestaurant,
      view,
    });
  };

  beforeEach(() => {
    setRestaurantSearchContainer();
    constructPresenter();
  });

  describe('When query is not empty', () => {
    it('should be able to capture the query typed by the user', () => {
      searchRestaurant('restaurant a');

      expect(presenter.latestQuery).toEqual('restaurant a');
    });

    it('should ask the model to search for liked restaurant', () => {
      searchRestaurant('restaurant a');

      expect(favoriteRestaurant.searchRestaurant)
        .toHaveBeenCalledWith('restaurant a');
    });

    it('should show the restaurant found by Favorite restaurant', (done) => {
      document.getElementById('restaurant').addEventListener('restaurant:updated', () => {
        expect(document.querySelectorAll('.movie-item').length).toEqual(3);
        done();
      });

      favoriteRestaurant.searchRestaurant.withArgs('restaurant a').and.returnValues([
        { id: 111, title: 'restaurant abc' },
        { id: 222, title: 'ada juga restaurant abcde' },
        { id: 333, title: 'ini juga boleh restaurant a' },
      ]);

      searchRestaurant('restaurant a');
    });

    it('should show the name of the restaurant found by Favorite restaurant', (done) => {
      document.getElementById('restaurant').addEventListener('restaurant:updated', () => {
        const RestaurantTitles = document.querySelectorAll('.movie__title');
        expect(RestaurantTitles.item(0).textContent).toEqual('-');
        expect(RestaurantTitles.item(1).textContent).toEqual('-');
        expect(RestaurantTitles.item(2).textContent).toEqual('-');

        done();
      });

      favoriteRestaurant.searchRestaurant.withArgs('restaurant a').and.returnValues([
        { id: 111, title: 'restaurant abc' },
        { id: 222, title: 'ada juga restaurant abcde' },
        { id: 333, title: 'ini juga boleh restaurant a' },
      ]);

      searchRestaurant('restaurant a');
    });
  });
  describe('When query is empty', () => {
    it('should capture the query as empty', () => {
      searchRestaurant(' ');

      expect(presenter.latestQuery.length).toEqual(0);
    });

    it('should show all favorite restaurant', () => {
      searchRestaurant('    ');
      expect(favoriteRestaurant.getAllRestaurant)
        .toHaveBeenCalled();
    });
  });

  describe('When no favorite restaurant could be found', () => {
    it('should show the empty message', (done) => {
      document.getElementById('restaurant')
        .addEventListener('restaurant:updated', () => {
          expect(document.querySelectorAll('.movie-item__not__found').length).toEqual(1);
          done();
        });

      // eslint-disable-next-line no-shadow
      favoriteRestaurant.searchRestaurant.withArgs('restaurant a')
        .and
        .returnValues([]);

      searchRestaurant('restaurant a');
    });

    it('should not show any restaurant', (done) => {
      document.getElementById('restaurant').addEventListener('restaurant:updated', () => {
        expect(document.querySelectorAll('.movie').length).toEqual(0);
        done();
      });

      favoriteRestaurant.searchRestaurant.withArgs('restaurant a').and.returnValues([]);

      searchRestaurant('restaurant a');
    });

    it('should show - when the restaurant returned does not contain a title', (done) => {
      document.getElementById('restaurant').addEventListener('restaurant:updated', () => {
        const movieTitles = document.querySelectorAll('.movie__title');
        expect(movieTitles.item(0).textContent).toEqual('-');

        done();
      });

      favoriteRestaurant.searchRestaurant.withArgs('restaurant a').and.returnValues([
        { id: 444 },
      ]);

      searchRestaurant('restaurant a');
    });
  });
});
