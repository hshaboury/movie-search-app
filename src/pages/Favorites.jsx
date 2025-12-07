import { useFavorites } from '../context/FavoritesContext';
import MovieList from '../components/MovieList';

export default function Favorites() {
  const { favorites } = useFavorites();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">My Favorites</h1>

      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">❤️</div>
          <h2 className="text-2xl font-semibold mb-2">No favorites yet</h2>
          <p className="text-gray-400">Start adding movies to your favorites list</p>
        </div>
      ) : (
        <MovieList movies={favorites} />
      )}
    </div>
  );
}
