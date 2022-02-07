import ReactPaginate from "react-paginate";
import "./Pagination.scss";

interface IPagination {
  pageNumber: number;
  totalPages: number;
  updatePage: React.Dispatch<React.SetStateAction<number>>;
}
function Pagination(props: IPagination) {
  const updatePageHandler = (data: any) => props.updatePage(data.selected + 1);

  return (
    <>
      <ReactPaginate
        containerClassName="pagination"
        nextLabel="&raquo;"
        forcePage={props.pageNumber - 1}
        previousLabel="&laquo;"
        pageRangeDisplayed={1}
        marginPagesDisplayed={1}
        previousClassName="pagination__button pagination__cursor "
        nextClassName="pagination__button pagination__cursor "
        activeClassName="active"
        pageCount={props.totalPages}
        onPageChange={updatePageHandler}
        pageClassName="pagination__item"
        pageLinkClassName="pagination__button"
      />
    </>
  );
}

export default Pagination;
