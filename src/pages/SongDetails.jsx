import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";

import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { useGetSongDetailsQuery } from "../redux/services/shazamCore";

const SongDetails = () => {
    // const dispatch = useDispatch();
    const { songid, id: artistId } = useParams();
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    const { data: songData, isFetching: isFetchingSongDetails, error: songError} =
    useGetSongDetailsQuery({ songid });

    // const { data: relatedSongData, isFetching: isFetchingRelatedSongDetails, error: relatedSongError } =
    // useGetSongRelatedQuery({ songid });
    
    // const relatedModifiedData = relatedSongData && Object.values(relatedSongData?.resources['shazam-songs'])
    
    // const handlePauseClick =() => {
    //     dispatch(playPause(false));
    //   }
    
    //   const handlePlayClick =(song, i) => {
    //     dispatch(setActiveSong({ song, data: relatedModifiedData, i}));
    //     dispatch(playPause(true));
    //   }

    if(isFetchingSongDetails 
        // || isFetchingRelatedSongDetails
        ) {
        return <Loader title="Searching song details..." />;
    }

    if(songError 
        // || relatedSongError
        ) {
        return <Error />
    }
    // console.log('song details', relatedSongData,relatedModifiedData)
    return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistId} songData={songData} />

      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>

        <div className="mt-5">
          {songData?.sections[1]?.type === "LYRICS" ? (
            songData?.sections[1].text.map((line, i) => (
              <p key={i} className="text-gray-400 text-base my-1">{line}</p>
            ))
          ) : (
            <p className="text-gray-400 text-base my-1">
              Sorry, No Lyrics Found !!!
            </p>
          )}
        </div>
      </div>

      {/* <RelatedSongs
            data={relatedModifiedData}
            artistId={artistId}
            isPlaying={isPlaying}
            activeSong={activeSong}
        /> */}
    </div>
  );
};

export default SongDetails;
