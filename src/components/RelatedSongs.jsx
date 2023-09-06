import { useDispatch } from 'react-redux';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import SongBar from './SongBar';


const RelatedSongs = ({
  data,
  isPlaying,
  activeSong,
  artistId}) => {

    const dispatch = useDispatch();

    const handlePauseClick = () => {
      dispatch(playPause(false));
    };
  
    const handlePlayClick = (song, i) => {
      console.log('handleplaypause',song,i,data);
      dispatch(setActiveSong({ song, data, i }));
      dispatch(playPause(true));
    };
    // console.log('data',data)
    return (
      <div className='flex flex-col'>
        <h1 className='font-bold text-3xl text-white'>Related Songs:</h1>

        <div className='mt-6 w-full flex flex-col'>
          {
            data?.map((song, i) => (
              <SongBar 
                key={`${song?.id}`}
                song={song}
                i={i}
                artistId={artistId}
                isPlaying={isPlaying}
                activeSong={activeSong}
                handlePauseClick={handlePauseClick}
                handlePlayClick={()=> handlePlayClick(song, i)}
                />
            ))
          }
        </div>
      </div>
    )
  }

export default RelatedSongs;
