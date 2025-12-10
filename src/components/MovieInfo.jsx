export default function MovieInfo({ director, writer, actors }) {
  // Parse actors into array
  const actorArray = actors && actors !== 'N/A' 
    ? actors.split(',').map(a => a.trim()) 
    : [];

  return (
    <div className="space-y-4">
      {/* Director */}
      {director && director !== 'N/A' && (
        <div>
          <h3 className="text-sm font-semibold text-slate-500 dark:text-gray-400 mb-2">Director</h3>
          <p className="text-slate-900 dark:text-gray-200">{director}</p>
        </div>
      )}

      {/* Writer */}
      {writer && writer !== 'N/A' && (
        <div>
          <h3 className="text-sm font-semibold text-slate-500 dark:text-gray-400 mb-2">Writer</h3>
          <p className="text-slate-900 dark:text-gray-200">{writer}</p>
        </div>
      )}

      {/* Actors */}
      {actorArray.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-slate-500 dark:text-gray-400 mb-2">Cast</h3>
          <div className="flex flex-wrap gap-2">
            {actorArray.map((actor, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-slate-100 dark:bg-gray-700 rounded-full text-sm text-slate-900 dark:text-gray-200 hover:bg-slate-200 dark:hover:bg-gray-600 transition-colors cursor-default"
              >
                {actor}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
