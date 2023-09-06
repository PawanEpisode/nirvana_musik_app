import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamCoreApi = createApi({
    reducerPath: 'shazamCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam.p.rapidapi.com',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key','3f0394f088msh8c4732585a22d95p19640djsnf3b9c9683408');
            // headers.set('X-RapidAPI-Host','shazam.p.rapidapi.com');

            return headers;
        },
    }),
    endpoints: (builder) => ({
        getTopCharts: builder.query({ query: () => '/charts/track'}),
        getTopCharts: builder.query({ query: () => '/charts/track'}),
        getSongDetails: builder.query({ query: ({ songid }) => `/songs/get-details?key=${songid}`}),
        getArtistDetails: builder.query({ query: (artistId) => `/artists/get-summary?id=${artistId}`}),
        getSongsBySearch: builder.query({ query: (searchTerm) => `/search?term=${searchTerm}&limit=10`}),
    }),
});

export const { useGetTopChartsQuery, useGetSongDetailsQuery, useGetArtistDetailsQuery, useGetSongsBySearchQuery } = shazamCoreApi;