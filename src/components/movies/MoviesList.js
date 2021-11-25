import MovieItem from './MovieItem';

const MoviesList = ({ movies , onAddMovie }) => {
  return (
    <div className="movies__list">
      <ul>
        {movies.map( movie => (
          <MovieItem key = {`movie-${movie.id}`} movie = {movie} onAddMovie = {onAddMovie} />
        ))}
      </ul>
    </div>
  );
}

export default MoviesList;