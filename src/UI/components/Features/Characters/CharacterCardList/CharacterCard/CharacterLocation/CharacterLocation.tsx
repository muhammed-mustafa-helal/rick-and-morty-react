import { Location } from "../../../../../../../services/RickMorty/RickMorty";

import "./CharacterLocation.scss";

export interface ICharacterLocation {
  location: Location;
}

export function CharacterLocation(props: ICharacterLocation) {
  return (
    <section className="character-location">
      <h5 className="character-location__title">
        Last known location:
        <a href={props.location.name !== "unknown" ? props.location.url : "#"}>
          {" "}
          {props.location.name.charAt(0).toUpperCase() + props.location.name.slice(1)}
        </a>
      </h5>

      <div className="character-location__property">
        <div className="character-location__property--one">
          <p>Dimension:</p>
          <p> {props.location.name === "unknown" ? "?" : props.location.dimension}</p>
        </div>
        <div className="character-location__property--two">
          <p>No. of residents:</p>
          <p>
            {props.location.name === "unknown" ? "?" : props.location.residents.length}
          </p>
        </div>
      </div>
    </section>
  );
}
