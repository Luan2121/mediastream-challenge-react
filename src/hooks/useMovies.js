import { useState , useEffect, useCallback } from 'react';

const ASCENDING = "Ascending";
const DESCENDING = "Descending";

const orderMovies = (movies,currentOrder) => {
	return movies.sort( (movieA,movieB) => {
		if( movieA.year < movieB.year ){
			return -1 * ( currentOrder.toUpperCase() === "ASCENDING" ? 1 : -1 );
		}
		if( movieA.year > movieB.year ){
			return 1 * ( currentOrder.toUpperCase() === "ASCENDING" ? 1 : -1 );
		}
		return 0;
	})
}

const useMovies = () => {

  const [movies, setMovies] = useState([])
	const [filteredMovies, setFilteredMovies ] = useState([])
  const [fetchCount, setFetchCount] = useState(0)
  const [loading, setLoading] = useState(false)
	const [error,setError] = useState(null)
	const [order,setOrder] = useState(ASCENDING);

	const applyFilter = useCallback( ({ genre }) => {
		if(genre === "all"){
			setFilteredMovies(movies);
			return;
		}
		setFilteredMovies( 
			orderMovies( movies.filter( movie => movie.genres.includes( genre )) , order )
		)
	}, [setFilteredMovies,movies,order])

	const toggleOrder = useCallback( () => {
		setOrder( oldOrder => {
			const newOrder = oldOrder === DESCENDING ? ASCENDING : DESCENDING;
			setFilteredMovies( oldMovies => orderMovies(oldMovies,newOrder) )
			return newOrder
		})

	} , [setOrder, setFilteredMovies] );

  useEffect(() => {
		const handleMovieFetch = () => {
			setLoading(true)
			setFetchCount( oldCount => oldCount + 1 )
			fetchMovies()
				.then( movies => {
					const orderedMovies = orderMovies(movies,ASCENDING);
					setMovies(orderedMovies)
					setFilteredMovies(orderedMovies)
				})
				.catch( error => setError(error) )
				.finally( setLoading(false) )
			console.log('Getting movies')
		}
    handleMovieFetch()
  }, [setFetchCount]);

	return { movies: filteredMovies, loading, error, fetchCount, applyFilter, order, toggleOrder }
}

const fetchMovies = () => {
	return fetch('http://localhost:3001/movies?_limit=50')
	.then(res => res.json())
	.then(json => json)
	.catch((error) => {
		return error;
	})
}


export default useMovies