import { IMovie } from '../../models/Movie';

export const getData = async (searchText: string): Promise<IMovie[]> => {
  return new Promise((resolve) => {
    resolve([
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
    ]);
  });
};
