import { Location } from "@services/RickMorty/RickMorty";

import "./CharacterLocation.scss";

export interface ICharacterLocation {
  location: Location;
  title: string;
}

export interface ICharacterOrigin {
  origin: Location;
  title: string;
}


export function CharacterLocation({location, title}: ICharacterLocation) {
  return (
    <section className="character-location">
      <h5 className="character-location__title">
        {title}
        <a href={location.name !== "unknown" ? location.url : "#"}>
          {" "}
          {location.name.charAt(0).toUpperCase() + location.name.slice(1)}
        </a>
      </h5>

      <div className="character-location__property">
        <div className="character-location__property--one">
          <p>Dimension:</p>
          <p> {location.name === "unknown" ? "?" : location.dimension}</p>
        </div>
        <div className="character-location__property--two">
          <p>No. of residents:</p>
          <p>
            {location.name === "unknown" ? "?" : location.residents.length}
          </p>
        </div>
      </div>
    </section>
  );
}
