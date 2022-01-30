import { useState } from "react";

import { motion } from "framer-motion";

import "./Pagination.scss";
interface IPagination {
  pageNumber: number;
  updatePage: React.Dispatch<React.SetStateAction<number>>;
}

//TODO: TO BE OPTIMIZED AND FIX THE GLITCHES
function Pagination(props: IPagination) {
  // const currentPage = Number(window.location.pathname.split("/").pop()) || 1;
  // const [clickablePages, setClickablePages] = useState([1, 2, 3, 4]);

  const updateClickablePages = (actualPage: number) => {
    const offsets = [0, 1, 2, 3];
    const updatedClickablePages = offsets.map((number) => actualPage + number);
    const paginationLimit = updatedClickablePages.find((number) => number >= 42);
    if (typeof paginationLimit === "undefined") return updatedClickablePages;
    return [39, 40, 41, 42];
  };
  let clickablePages: number[] = updateClickablePages(props.pageNumber);

  const updatePaginationPage = (direction: number, actualPage: number) => {
    const nextPage = actualPage + direction;
    const pageUpdated = nextPage >= 0 ? nextPage : 1;
    clickablePages = updateClickablePages(pageUpdated);

    return pageUpdated;
  };

  //TODO: FIx active state class ISSUE
  const [activeState, setActiveState] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  //Handlers

  const updatePageHandler = (pageNumber: number) => props.updatePage(pageNumber);

  return (
    <motion.nav
      aria-label="pagination"
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{
        delay: 0.5,
        x: { type: "spring", stiffness: 100 },
        default: { duration: 1 },
      }}
    >
      <ul className="pagination">
        <li>
          {" "}
          <a
            href="javascript:void(0)"
            onClick={() =>
              updatePageHandler(updatePaginationPage(-1, props.pageNumber))
            }
            className={activeState[0] ? "active" : ""}
          >
            <span aria-hidden="true">&laquo;</span>
            <span className="visuallyhidden">previous set of pages</span>
          </a>
        </li>

        {clickablePages.map((pageNumber: number, index: number) => (
          <li key={pageNumber}>
            <a
              href="javascript:void(0)"
              onClick={() => updatePageHandler(pageNumber)}
              className={pageNumber === props.pageNumber ? "active" : ""}
            >
              <span className="visuallyhidden">page </span>
              {pageNumber}
            </a>
          </li>
        ))}

        <li>
          <a
            href="javascript:void(0)"
            onClick={() => updatePageHandler(updatePaginationPage(1, props.pageNumber))}
            className={activeState[5] ? "active" : ""}
          >
            <span className="visuallyhidden">next set of pages</span>
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </motion.nav>
  );
}

export default Pagination;
