import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { searchMovies } from '../services/api';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const results = await searchMovies(query);
      setMovies(results);
    } catch (err) {
      setError(err.message);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Discover Movies</h1>
      
      <SearchBar onSearch={handleSearch} />

      {loading && <Loader />}

      {error && <Error message={error} />}

      {!loading && !error && !hasSearched && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎬</div>
          <h2 className="text-2xl font-semibold mb-2">Welcome to MovieSearch</h2>
          <p className="text-gray-400">Search for your favorite movies above to get started</p>
        </div>
      )}

      {!loading && !error && hasSearched && <MovieList movies={movies} />}
    </div>
  );
}
