import { motion } from "framer-motion";

import "./CharacterCard.scss";

import { CharacterChapters } from "@components/CharacterCardList/CharacterCard/CharacterChapters/CharacterChapters";

import { CharacterLocation } from "@components/CharacterCardList/CharacterCard/CharacterLocation/CharacterLocation";

import { CharacterInfo } from "@components/CharacterCardList/CharacterCard/CharacterInfo/CharacterInfo";

export function CharacterCard(props: any) {
  return (
    <motion.section
      className="character-card"
      whileHover={{
        scale: 1.1,
        boxShadow: ".4rem .4px 1rem #070707",
      }}
    >
      <div className="character-card__img">
        <img src={props.image} alt={props.name} title={props.name} />
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
        <CharacterLocation location={props.origin} title="Character origin: " />
        <CharacterLocation location={props.location} title="Last known location: " />
        <CharacterChapters episodes={props.episodes} />
      </div>
    </motion.section>
  );
}
