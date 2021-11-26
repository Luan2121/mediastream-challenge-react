import MovieCard from "./MovieCard";

const MovieLibrary = ({ movies }) => {

  if(!movies.length){
    return null;
  }

  return (
    <ul className="movie-library__list">
      {movies.map(movie => (
        <MovieCard movie = {movie} key = {`movie-card-${movie.id}`} />
      ))}
    </ul>
  )
}

export default MovieLibrary;