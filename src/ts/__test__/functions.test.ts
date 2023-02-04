import { movieSort } from '../functions';
import { IMovie } from '../models/Movie';

describe('test movieSort', () => {
  test('should sort movies in descending order', () => {
    // arrange
    const movies: IMovie[] = [
      {
        Title: 'The Matrix Reloaded',
        imdbID: 'tt0234215',
        Type: 'movie',
        Poster: 'https://test.test/test',
        Year: '2003',
      },
      {
        Title: 'The Matrix',
        imdbID: 'tt0133093',
        Type: 'movie',
        Poster: 'https://test.test/test',
        Year: '1999',
      },
      {
        Title: 'The Matrix',
        imdbID: 'tt0133093',
        Type: 'movie',
        Poster: 'https://test.test/test',
        Year: '1999',
      },
      {
        Title: 'Alen',
        imdbID: '123',
        Type: 'person',
        Poster: 'https://test.test/test',
        Year: '1994',
      },
      {
        Title: 'Balen',
        imdbID: '123',
        Type: 'person',
        Poster: 'https://test.test/test',
        Year: '1994',
      },
    ];

    // act
    const result = movieSort(movies);

    // assert
    expect(result[0].Title).toBe('Alen');
    expect(result[1].Title).toBe('Balen');
    expect(result[2].Title).toBe('The Matrix');
    expect(result[3].Title).toBe('The Matrix');
    expect(result[4].Title).toBe('The Matrix Reloaded');
  });

  test('should sort movies in ascending order', () => {
    // arrange
    const movies: IMovie[] = [
      {
        Title: 'The Matrix Reloaded',
        imdbID: 'tt0234215',
        Type: 'movie',
        Poster: 'https://test.test/test',
        Year: '2003',
      },
      {
        Title: 'The Matrix',
        imdbID: 'tt0133093',
        Type: 'movie',
        Poster: 'https://test.test/test',
        Year: '1999',
      },
      {
        Title: 'The Matrix',
        imdbID: 'tt0133093',
        Type: 'movie',
        Poster: 'https://test.test/test',
        Year: '1999',
      },
      {
        Title: 'Alen',
        imdbID: '123',
        Type: 'person',
        Poster: 'https://test.test/test',
        Year: '1994',
      },
      {
        Title: 'Balen',
        imdbID: '123',
        Type: 'person',
        Poster: 'https://test.test/test',
        Year: '1994',
      },
    ];

    // act
    const result = movieSort(movies, false);

    // assert
    expect(result[0].Title).toBe('The Matrix Reloaded');
    expect(result[1].Title).toBe('The Matrix');
    expect(result[2].Title).toBe('The Matrix');
    expect(result[3].Title).toBe('Balen');
    expect(result[4].Title).toBe('Alen');
  });
});
