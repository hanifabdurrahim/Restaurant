const assert = require('assert');

Feature('Liking Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/like');
  I.waitForElement('.movie-item__not__found', 30); // Waktu tunggu selama 30 detik
});

Scenario('showing empty liked restaurant', ({ I }) => {
  I.seeElement('#query');
  I.see('Tidak ada restaurant untuk ditampilkan', '.movie-item__not__found');
});

Scenario('liking one restaurant', async ({ I }) => {
  I.see('Tidak ada restaurant untuk ditampilkan', '.movie-item__not__found');

  I.amOnPage('/');

  I.seeElement('.movie__title a');

  const firstFilm = locate('.movie__title a').first();
  const firstFilmTitle = await I.grabTextFrom(firstFilm);
  I.click(firstFilm);
  I.waitForElement('#likeButton', 60); // Waktu tunggu selama 30 detik
  I.seeElement('#likeButton');
  I.click('#likeButton');
  I.amOnPage('/#/like');
  I.waitForElement('.movie-item', 60);
  I.seeElement('.movie-item');
  const likedFilmTitle = await I.grabTextFrom('.movie__title');
  assert.strictEqual(firstFilmTitle, likedFilmTitle);
});

Scenario('searching restaurant', async ({ I }) => {
  I.see('Tidak ada restaurant untuk ditampilkan', '.movie-item__not__found');

  I.amOnPage('/');

  I.seeElement('.movie__title a');

  const titles = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= 3; i++) {
    I.click(locate('.movie__title a').at(i));
    I.waitForElement('#likeButton', 60);
    I.seeElement('#likeButton');
    I.click('#likeButton');
    // eslint-disable-next-line no-await-in-loop
    titles.push(await I.grabTextFrom('.movie__title'));
    I.amOnPage('/');
  }

  I.amOnPage('/#/like');
  I.seeElement('#query');
});
