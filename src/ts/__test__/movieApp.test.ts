/**
 * @jest-environment jsdom
 */

import { IMovie } from '../models/Movie';
import * as movieApp from '../movieApp';
import * as movieservice from './../services/movieservice';

beforeEach(() => {
  document.body.innerHTML = '';
  jest.resetAllMocks();
});

jest.mock('./../services/movieservice.ts');

describe('test init', () => {
  test('should call handleSubmit on submit', () => {
    // arrange
    document.body.innerHTML = `
    <form id="searchForm">
      <button type="submit" id="search">Sök</button>
    </form>
    `;
    const spyOnHandleSubmit = jest
      .spyOn(movieApp, 'handleSubmit')
      .mockResolvedValue();

    // act
    movieApp.init();
    document.querySelector('button')?.click();

    // assert
    expect(spyOnHandleSubmit).toHaveBeenCalled();
  });
});

describe('test handleSubmit', () => {
  test('should get data and call createHtml', async () => {
    // arrange
    document.body.innerHTML = `
    <input type="text" id="searchText" placeholder="Skriv titel här" />
    <div id="movie-container"></div>
    `;
    const spyOnCreateHtml = jest
      .spyOn(movieApp, 'createHtml')
      .mockReturnValue();
    jest.spyOn(console, 'log').mockReturnValue();

    // act
    await movieApp.handleSubmit();

    // assert
    expect(spyOnCreateHtml).toHaveBeenCalled();
  });

  test('should get empty data and call displayNoResult', async () => {
    // arrange
    document.body.innerHTML = `
    <input type="text" id="searchText" placeholder="Skriv titel här" />
    <div id="movie-container"></div>
    `;
    const spyOnGetData = jest
      .spyOn(movieservice, 'getData')
      .mockResolvedValue([]);
    const spyOnDisplayNoResult = jest
      .spyOn(movieApp, 'displayNoResult')
      .mockReturnValue();
    jest.spyOn(console, 'log').mockReturnValue();

    // act
    await movieApp.handleSubmit();

    // assert
    expect(spyOnDisplayNoResult).toHaveBeenCalled();
  });

  test('should not get data and call displayNoResult', async () => {
    // arrange
    document.body.innerHTML = `
    <input type="text" id="searchText" placeholder="Skriv titel här" />
    <div id="movie-container"></div>
    `;
    const spyOnGetData = jest
      .spyOn(movieservice, 'getData')
      .mockRejectedValue([]);
    const spyOnDisplayNoResult = jest
      .spyOn(movieApp, 'displayNoResult')
      .mockReturnValue();
    jest.spyOn(console, 'log').mockReturnValue();

    // act
    await movieApp.handleSubmit();

    // assert
    expect(spyOnDisplayNoResult).toHaveBeenCalled();
  });
});

describe('test createHtml', () => {
  test('should create HTML', () => {
    // arrange
    const movies: IMovie[] = [
      {
        Title: 'The Matrix',
        imdbID: 'tt0133093',
        Type: 'movie',
        Poster: 'https://test.test/test',
        Year: '1999',
      },
      {
        Title: 'The Matrix Reloaded',
        imdbID: 'tt0234215',
        Type: 'movie',
        Poster: 'https://test.test/test',
        Year: '2003',
      },
    ];
    document.body.innerHTML = `
    <div id="movie-container"></div>
    `;
    const container = document.querySelector(
      '#movie-container'
    ) as HTMLDivElement;

    // act
    movieApp.createHtml(movies, container);

    // assert
    const movie = container.querySelectorAll('div');
    const title = container.querySelectorAll('h3');
    const img = container.querySelectorAll('img');
    expect(movie.length).toBe(2);
    expect(movie[0].classList).toContain('movie');
    expect(title.length).toBe(2);
    expect(title[0].innerHTML).toBe('The Matrix');
    expect(img.length).toBe(2);
    expect(img[0].src).toBe('https://test.test/test');
  });
});

describe('test displayNoResult', () => {
  test('should display error when called', () => {
    // arrange
    document.body.innerHTML = `
    <div id="movie-container"></div>
    `;
    const container = document.querySelector(
      '#movie-container'
    ) as HTMLDivElement;

    // act
    movieApp.displayNoResult(container);

    // assert
    expect(container.innerHTML).toEqual('<p>Inga sökresultat att visa</p>');
  });
});
