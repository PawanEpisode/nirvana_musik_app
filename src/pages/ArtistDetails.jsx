import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";

import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { useGetArtistDetailsQuery } from "../redux/services/shazamCore";

const ArtistDetails = () => {
  const { id: artistId } = useParams();
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    const { data: artistData, isFetching: isFetchingArtistDetails, error: artistError} =
    useGetArtistDetailsQuery(artistId);

    console.log('artist', artistId, artistData);

    const modifiedData = artistData && Object.values(artistData?.resources?.songs);

    if(isFetchingArtistDetails) {
        return <Loader title="Loading Artist details..." />;
    }

    if(artistError) {
        return <Error />
    }
  return (
    <div className="flex flex-col">
    <DetailsHeader artistId={artistId} artistData={artistData} />

    <RelatedSongs
        data={modifiedData}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
      />
  </div>
)}

export default ArtistDetails;
