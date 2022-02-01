import * as _ from "lodash";

import * as rmapi from "rickmortyapi"; //rickAndMortyAPI
import * as rmapii from "rickmortyapi/dist/interfaces"; //rickAndMortyApiInterface

// TODO: Wrap rmapi's APIs adding:
// * Caching

/* Types */

export type Character = rmapii.Character;
export type Episode = rmapii.Episode;
export type Location = rmapii.Location;
export type Info<T> = rmapii.Info<T>;
export type CharacterFilter = rmapii.CharacterFilter;
export type EpisodeFilter = rmapii.EpisodeFilter;
export type LocationFilter = rmapii.LocationFilter;

/* Functions */

export const getCharacter = rmapi.getCharacter;
export const getCharacters = rmapi.getCharacters;
export const getEpisode = rmapi.getEpisode;
export const getEpisodes = rmapi.getEpisodes;
export const getLocation = rmapi.getLocation;
export const getLocations = rmapi.getLocations;

/* Concrete Types */

export interface ConcreteCharacter extends Omit<Character, "episode"> {
  origin: Location;
  location: Location;
  episodes: Episode[];
}

export interface ConcreteEpisode extends Omit<Episode, "character"> {
  characters: Character;
}

export type ConcreteLocation = Location;

/* Helper Functions */

function handleAPIResponse<T>(respone: rmapii.ApiResponse<T>): T {
  return respone.data;
}

function getIdfromUrl(url: string) {
  const id = url.split("/").pop();
  return id === undefined ? undefined : +id;
}

async function getOr<T, R>(
  f: (arg: T) => Promise<rmapii.ApiResponse<R>>,
  arg: T | undefined,
  or: R
) {
  return arg === undefined ? or : handleAPIResponse(await f(arg));
}

// export async function getConcreteCharacter(id: number[]): Promise<ConcreteCharacter[]> {
//   await getCharacter(id);
//   return [];
// }

const DEFAULT_LOCATION: Location = {
  id: -1,
  name: "",
  url: "",
  created: "",
  type: "",
  dimension: "",
  residents: [],
};

//FIXME: Function getCharacters used by the rick and morty client  doesn not have error handling and therefore the App gets stuck in loading if the connection is lost. (I managed to fix the issue and send a merge request to the repo but I doubt it would be accepted anytime soon)
//TODO: Switch to axios or JS https client instead

export async function getConcreteCharacters(
  filters?: CharacterFilter | undefined
): Promise<Info<ConcreteCharacter[]>> {
  const { info, results } = handleAPIResponse(await getCharacters(filters));
  const concreteResults =
    results === undefined
      ? undefined
      : await Promise.all(
          results.map(async ({ origin, location, episode, ...c }) => ({
            ...c,
            origin: await getOr(
              getLocation,
              getIdfromUrl(origin.url),
              DEFAULT_LOCATION
            ),
            location: await getOr(
              getLocation,
              getIdfromUrl(location.url),
              DEFAULT_LOCATION
            ),
            episodes: _.flatten([
              await getOr(
                getEpisode,
                episode.map(getIdfromUrl).filter(_.isNumber),
                [] as Episode[]
              ),
            ]),
          }))
        );
  return { info, results: concreteResults };
}

// export async function getConcreteEpisode(id: number[]): Promise<ConcreteEpisode[]> {
//   await getEpisode(id);
//   return [];
// }

// export async function getConcreteEpisodes(
//   filters?: EpisodeFilter | undefined
// ): Promise<Info<Episode[]>> {
//   handleAPIResponse(await getEpisodes(filters));
//   return {};
// }

// export async function getConcreteLocation(id: number[]): Promise<ConcreteLocation[]> {
//   getLocation(id);
//   return [];
// }

// export async function getConcreteLocations(
//   filters?: LocationFilter | undefined
// ): Promise<Info<Location[]>> {
//   handleAPIResponse(await getLocations(filters));
//   return {};
// }
