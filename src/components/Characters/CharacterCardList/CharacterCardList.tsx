import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import {
  getConcreteCharacters,
  ConcreteCharacter,
} from "../../../services/RickMorty/RickMorty";
import "./CharacterCardList.scss";
import { CharacterCard } from "../CharacterCard/CharacterCard";
import Spinner from "../../Spinner/Spinner";
import Pagination from "../../Pagination/Pagination";

function CharacterCardList() {
  const [characters, setCharacters] = useState([] as ConcreteCharacter[]);
  const [isloading, setisLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function loadCharacters() {
      setisLoading(true);
      const response = await getConcreteCharacters({ page });
      setCharacters(response.results || []);
      setisLoading(false);
    }
    loadCharacters();
  }, [page]);

  return (
    <>
      {(isloading && <Spinner />) || (
        <>
          <Pagination updatePage={setPage} pageNumber={page} />
          <motion.section
            className="character-card-grid"
            animate={{ y: 50 }}
            transition={{
              delay: 0.5,
              x: { type: "spring", stiffness: 100 },
              default: { duration: 1 },
            }}
          >
            <div className="character-card-grid__container">
              {characters.map((character) => (
                <CharacterCard
                  key={character.id}
                  name={character.name}
                  status={character.status}
                  species={character.species}
                  type={character.type}
                  gender={character.gender}
                  origin={character.origin}
                  location={character.location}
                  image={character.image}
                  episodes={character.episodes}
                  url={character.url}
                />
              ))}
            </div>
          </motion.section>
        </>
      )}
    </>
  );
}

export default CharacterCardList;
