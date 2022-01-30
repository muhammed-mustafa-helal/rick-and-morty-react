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
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    async function loadCharacters() {
      setisLoading(true);
      setError(null);
      try {
        const response = await getConcreteCharacters({ page });
        setTotalPages(response.info?.pages || 0);
        if (response.results === undefined) {
          throw new Error("Something went wrong!");
        }
        setCharacters(response.results);
      } catch (error: any) {
        setError(error.message);
        setCharacters([]);
      }
      setisLoading(false);
    }
    loadCharacters();
  }, [page]);

  return (
    <>
      {(error && <h1 className="error-message">{error}</h1>) ||
        (isloading && <Spinner />) || (
          <>
            <Pagination
              updatePage={setPage}
              pageNumber={page}
              totalPages={totalPages}
            />
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
