import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { motion } from "framer-motion";
import ScrollToTop from "react-scroll-to-top";

import { CharacterCard } from "@components/CharacterCardList/CharacterCard/CharacterCard";
import Spinner from "@helperComponents/Spinner/Spinner";
import Pagination from "@components/CharacterCardList/Pagination/Pagination";
import ErrorModal from "@helperComponents/ErrorModal/ErrorModal";

import "./CharacterCardList.scss";

import {
  getConcreteCharacters,
  ConcreteCharacter,
} from "../../../../../services/RickMorty/RickMorty";

function CharacterCardList() {
  //state
  const [characters, setCharacters] = useState([] as ConcreteCharacter[]);
  const [isloading, setisLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  //handlers
  const errorHandler = () => {
    setError(null);
  };

  //Portaled components

  const scrollToTop: Element = document.getElementById("scroll-to-top")!;
  const errorModal: Element = document.getElementById("error-modal")!;

  const scrollToTopUI = ReactDOM.createPortal(
    <ScrollToTop top={500} smooth color={"#02a9c0"} width="16" height="16" />,
    scrollToTop
  );

  const errorUI = ReactDOM.createPortal(
    <ErrorModal
      title="Something went wrong ..."
      errorMessage={`${error} + Check your internet connection and refresh the page
    `}
      errorModal={errorHandler}
    />,
    errorModal
  );

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
  return (
    <>
      {(error && errorUI) || (isloading && <Spinner />) || (
        <>
          {scrollToTopUI}
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
