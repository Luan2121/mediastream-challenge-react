import MovieCard from "./MovieCard";

const MovieLibrary = ({ movies }) => {
    return (
        <ul className="movie-library__list">
          {movies.map(movie => (
            <MovieCard movie = {movie} key = {`movie-card-${movie.id}`} />
          ))}
        </ul>
    )
}

export default MovieLibrary;