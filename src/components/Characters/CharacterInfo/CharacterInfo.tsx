import { Character } from "../../../services/RickMorty/RickMorty";

import "./CharacterInfo.scss";

export type ICharacterInfo = Pick<
  Character,
  "name" | "status" | "species" | "type" | "gender" | "url"
>;

export function CharacterInfo(props: ICharacterInfo) {
  //TODO: Optimize this part

  let [statusTitle, statusClasses] = ["", ""];
  if (props.status.toLowerCase() === "alive") {
    statusTitle = "Alive";
    statusClasses = "character-info__status green";
  } else if (props.status.toLowerCase() === "dead") {
    statusTitle = "Dead";
    statusClasses = "character-info__status red";
  } else {
    statusTitle = "Unknown";
    statusClasses = "character-info__status grey";
  }

  //TODO: Optimize this part
  return (
    <section className="character-info">
      <h1>
        <a href={props.url}>{props.name}</a>
      </h1>
      <div className="character-info__details">
        <span className={statusClasses} title={statusTitle}></span>
        <p title="Species">{props.species}&nbsp; - &nbsp;</p>
        <p title="Gender">{props.gender}</p>
      </div>
    </section>
  );
}
