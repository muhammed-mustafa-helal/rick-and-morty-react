import { Episode } from "@services/RickMorty/RickMorty";
import "./CharacterChapters.scss";

export interface ICharacterChapters {
  episodes: Episode[];
}

export function CharacterChapters(props: ICharacterChapters) {
  const maxEpisodes = 4;
  let episodesToRender = props.episodes.slice(0, maxEpisodes);
  let nRemainingEpisodes = props.episodes.length - episodesToRender.length;

  if (nRemainingEpisodes > 0) {
    nRemainingEpisodes++;
    episodesToRender.pop();
  }

  return (
    <section className="character-chapters">
      <h5 className="character-chapters__title">Chapters featured on:</h5>
      <ul className="character-chapters__episodes">
        {episodesToRender.map((episode, index) => (
          <li key={index}>
            <a href={episode.url}>{episode.name}</a>
          </li>
        ))}
        {nRemainingEpisodes > 0 && <li>... {nRemainingEpisodes} more</li>}
      </ul>
    </section>
  );
}
