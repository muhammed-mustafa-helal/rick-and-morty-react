import { motion } from "framer-motion";

import "./Pagination.scss";
interface IPagination {
  pageNumber: number;
  updatePage: React.Dispatch<React.SetStateAction<number>>;
}
function Pagination(props: IPagination) {
  // const currentPage = Number(window.location.pathname.split("/").pop()) || 1;
  // const [clickablePages, setClickablePages] = useState([1, 2, 3, 4]);

  const updateClickablePages = (actualPage: number) => {
    const positiveOffsets = [0, 1, 2, 3];
    // const negativeOffsets = [-3, -2, -1, 0];
    return positiveOffsets.map((number) => actualPage + number);
  };

  const clickablePages = updateClickablePages(props.pageNumber);

  const updatePaginationPage = (direction: number, actualPage: number) => {
    const nextPage = actualPage + direction;
    const pageUpdated = nextPage >= 0 ? nextPage : 1;
    return pageUpdated;
  };

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
            href={`/${updatePaginationPage(-1, props.pageNumber)}`}
            onClick={() => props.updatePage(updatePaginationPage(-1, props.pageNumber))}
          >
            <span aria-hidden="true">&laquo;</span>
            <span className="visuallyhidden">previous set of pages</span>
          </a>
        </li>

        {clickablePages.map((pageNumber) => (
          <li key={pageNumber}>
            <a href={`/${pageNumber}`} onClick={() => props.updatePage(pageNumber)}>
              <span className="visuallyhidden">page </span>
              {pageNumber}
            </a>
          </li>
        ))}

        <li>
          <a
            href={`/${updatePaginationPage(1, props.pageNumber)}`}
            onClick={() => props.updatePage(updatePaginationPage(1, props.pageNumber))}
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
