import { useState, useEffect } from "react"

const useGenres = () => {
  const [genres, setGenres] = useState([])
  const [loading, setLoading] = useState(false)
  const [error,setError] = useState(null)
  
	useEffect(() => {
			const handleMovieFetch = () => {
				setLoading(true)
				fetchGenres()
					.then( genres => setGenres(genres) )
					.catch( error => setError(error) )
					.finally( setLoading(false) )
			}
		handleMovieFetch()
	}, []);
  
  return { genres, loading, error }
}

const fetchGenres = () => {
	return fetch('http://localhost:3001/genres')
		.then(res => res.json())
		.then(json => json)
		.catch((error) => {
			return error;
		})
}

export default useGenres;