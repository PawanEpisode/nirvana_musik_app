import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Error, Loader, SongCard, ArtistCard } from "../components";
import { useGetSongsBySearchQuery } from "../redux/services/shazamCore";

const Search = () => {
  const { searchTerm } = useParams();
  const {activeSong, isPlaying} = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsBySearchQuery(searchTerm);

  if (isFetching) return <Loader title="Loading results..." />;

  if (error) return <Error />;

  const songsList = data?.tracks?.hits?.map(song => song.track);
  const artistsList = data?.artists?.hits?.map(song => song.artist);

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">
          Showing results for <span className='font-black'>{searchTerm}</span>
        </h2>
      </div>

      <h2 className="font-bold text-3xl text-white text-left mb-4">
        Songs
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songsList?.map((song, i) => (
          <SongCard 
            key={song.key} 
            song={song} 
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data?.tracks}
            i={i} />
        ))}
      </div>

      <h2 className="font-bold text-3xl text-white text-left mb-4 mt-10">
        Artists
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
      {artistsList?.map((song) => (
          <ArtistCard key={song.adamid} track={song} />
        ))}
      </div>
    </div>
  );
};

export default Search;

