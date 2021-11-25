
const MovieCard = ({ movie }) => {
   return (
    <li key={movie.id} className="movie-library__card">
			<img src={movie.posterUrl} alt={movie.title} />
			<ul>
				<li className = "movie-library__card-title">{movie.title}</li>
				<li>Genres: {movie.genres.join(', ')}</li>
				<li>Year: {movie.year}</li>
			</ul>
		</li>
   )
}

export default MovieCard;