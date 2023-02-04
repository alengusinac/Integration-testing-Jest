import { getData } from '../services/movieservice';
import axios from 'axios';

const testData = [
  {
    Title: 'The Matrix',
    imdbID: 'tt0133093',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
    Year: '1999',
  },
  {
    Title: 'The Matrix Reloaded',
    imdbID: 'tt0234215',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BODE0MzZhZTgtYzkwYi00YmI5LThlZWYtOWRmNWE5ODk0NzMxXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
    Year: '2003',
  },
];

jest.mock('axios', () => ({
  get: async (searchText: string) => {
    return new Promise((resolve, reject) => {
      if (!searchText.endsWith('error')) {
        resolve({ data: { Search: testData } });
      } else {
        reject([]);
      }
    });
  },
}));

describe('test getData', () => {
  test('should return data', async () => {
    // arrange
    const searchText = 'matrix';

    // act
    const response = await getData(searchText);

    // assert
    expect(response.length).toBe(2);
    expect(response[0].Title).toBe('The Matrix');
  });

  test('should not return data', async () => {
    // arrange
    const searchText = 'error';

    // act
    const response = await getData(searchText);

    // assert
    expect(response.length).toBe(0);
  });
});
