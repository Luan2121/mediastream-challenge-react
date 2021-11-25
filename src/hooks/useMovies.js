import { useState , useEffect } from 'react';

const useMovies = () => {

  const [movies, setMovies] = useState([])
  const [fetchCount, setFetchCount] = useState(0)
  const [loading, setLoading] = useState(false)
	const [error,setError] = useState(null)

  useEffect(() => {
		const handleMovieFetch = () => {
			setLoading(true)
			setFetchCount( oldCount => oldCount + 1 )
			fetchMovies()
				.then( movies => setMovies(movies) )
				.catch( error => setError(error) )
				.finally( setLoading(false) )
			console.log('Getting movies')
		}
    handleMovieFetch()
  }, [setFetchCount]);

	return { movies, loading, error, fetchCount }
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