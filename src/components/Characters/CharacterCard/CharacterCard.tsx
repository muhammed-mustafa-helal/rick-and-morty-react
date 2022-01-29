import { motion } from "framer-motion";

import { Character } from "rickmortyapi/dist/interfaces";

import "./CharacterCard.scss";

import {
  CharacterChapters,
  ICharacterChapters,
} from "../CharacterChapters/CharacterChapters";

import { CharacterOrigin, ICharacterOrigin } from "../CharacterOrigin/CharacterOrigin";

import {
  CharacterLocation,
  ICharacterLocation,
} from "../CharacterLocation/CharacterLocation";

import { CharacterInfo, ICharacterInfo } from "../CharacterInfo/CharacterInfo";

export type ICharacterCard = Pick<Character, "image"> &
  ICharacterInfo &
  ICharacterOrigin &
  ICharacterLocation &
  ICharacterChapters;

export function CharacterCard(props: ICharacterCard) {
  return (
    <motion.section
      className="character-card"
      whileHover={{
        scale: 1.1,
        boxShadow: ".4rem .4px 1rem #070707",
      }}
    >
      <div className="character-card__img">
        <img src={props.image} alt="Character Img" />
      </div>

      <div className="character-card__info">
        <CharacterInfo
          name={props.name}
          status={props.status}
          species={props.species}
          type={props.type}
          gender={props.gender}
          url={props.url}
        />
        <CharacterOrigin origin={props.origin} />
        <CharacterLocation location={props.location} />
        <CharacterChapters episodes={props.episodes} />
      </div>
    </motion.section>
  );
}
