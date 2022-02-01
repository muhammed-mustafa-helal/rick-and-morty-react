import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { motion } from "framer-motion";
import ScrollToTop from "react-scroll-to-top";

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

  const scrollToTop: Element = document.getElementById("scroll-to-top")!;


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

  //TODO: Fix this Logic gate hell
  //TODO: Add a Modal component for errors with a backdrop. Use React Portals to display them in the top of HTML
  return (
    <>
      {(error && <h1 className="error-message">{error}</h1>) ||
        (isloading && <Spinner />) || (
          <>
            {ReactDOM.createPortal(
              <ScrollToTop
                top={500}
                smooth={true}
                color={"#02a9c0"}
                width="16"
                height="16"
              />,
              scrollToTop
            )}

            <motion.section
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              transition={{
                delay: 0.5,
                x: { type: "spring", stiffness: 50 },
                default: { duration: 1 },
              }}
            >
              <Pagination
                updatePage={setPage}
                pageNumber={page}
                totalPages={totalPages}
              />
            </motion.section>
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
