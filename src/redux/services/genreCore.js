import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const genreCoreApi = createApi({
    reducerPath: 'genreCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam-core7.p.rapidapi.com',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key','b512578801mshe046a6c0b93636ap1c9808jsnd5d59493dffd');
            // headers.set('X-RapidAPI-Host','shazam.p.rapidapi.com');

            return headers;
        },
    }),
    endpoints: (builder) => ({
        getSongsByGenre: builder.query({ query: (genre) => `/charts/get-top-songs-in_world_by_genre?genre=${genre}`}),
    }),
});

export const { useGetSongsByGenreQuery } = genreCoreApi;