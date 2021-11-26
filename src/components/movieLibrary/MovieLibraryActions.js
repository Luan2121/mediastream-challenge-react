import useGenres from "hooks/useGenres";

const MovieLibraryActions = ({ onSelectGenre, order, onOrderButtonClick }) => {
	const { genres, loading } = useGenres();
   return (
      <div className="movie-library__actions">
         <select name="genre" placeholder="Search by genre..." onChange = {event => {
				onSelectGenre(event.target.value);
			}}>
            <option value="all">All</option>
				{genres.map( genre => (
					<option value = {genre} key = {genre}>
						{genre}
					</option>
				))}
         </select>
         <button onClick = {onOrderButtonClick} >Order {order}</button>
      </div>
   )
}

export default MovieLibraryActions;