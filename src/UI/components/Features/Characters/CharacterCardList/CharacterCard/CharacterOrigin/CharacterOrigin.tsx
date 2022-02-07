import { Location } from "@services/RickMorty/RickMorty";

import "./CharacterOrigin.scss";

export interface ICharacterOrigin {
  origin: Location;
}

export function CharacterOrigin(props: ICharacterOrigin) {
  return (
    <section className="character-origin">
      <h5 className="character-origin__title">
        Character origin:
        <a href={props.origin.name !== "unknown" ? props.origin.url : "#"}>
          {" "}
          {props.origin.name.charAt(0).toUpperCase() + props.origin.name.slice(1)}
        </a>
      </h5>

      <div className="character-origin__property">
        <div className="character-origin__property--one">
          <p>Dimension:</p>
          <p> {props.origin.name === "unknown" ? "?" : props.origin.dimension}</p>
        </div>
        <div className="character-origin__property--two">
          <p>No. of residents:</p>
          <p>{props.origin.name === "unknown" ? "?" : props.origin.residents.length}</p>
        </div>
      </div>
    </section>
  );
}
