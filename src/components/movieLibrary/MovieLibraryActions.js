import useGenres from "hooks/useGenres";
import { Fragment } from "react";

const MovieLibraryActions = ({ onSelectGenre, order, onOrderButtonClick }) => {
	const { genres, loading } = useGenres();
   return (
      <div className="movie-library__actions">
         <select 
				name="genre" 
				disabled = {loading}
				onChange = {event => {
					onSelectGenre(event.target.value);
				}}
			>
            {!loading ? (
					<Fragment>
						<option hidden selected>
							Search by genre...
						</option>
						<option value="all">All</option>
						{genres.map( genre => (
							<option value = {genre} key = {genre}>
								{genre}
							</option>
						))}
					</Fragment>
				): (
					<option hidden selected>
						Wait we're loading your favorite genres...
					</option>
				)}
         </select>
         <button onClick = {onOrderButtonClick} >Order {order}</button>
      </div>
   )
}

export default MovieLibraryActions;