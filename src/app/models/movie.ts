export class Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  overview: string;
  backdrop_path: string;
  genres: genre[]
}

class genre {
  id: number;
  name: string;
}
