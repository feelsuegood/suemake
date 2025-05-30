import { useSearchParams } from "react-router";
import {
  Pagination,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationContent,
} from "./ui/pagination";

type ProductPaginationProps = {
  totalPage: number;
};

export default function ProductPagination({
  totalPage,
}: ProductPaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  //   console.log(searchParams);
  //! because of Number it returns NaN if the page is not a number so put ?? 1 inside of Number()
  const page = Number(searchParams.get("page") ?? 1);
  if (isNaN(page) || page < 1) {
    return null;
  }
  const onClick = (page: number) => {
    searchParams.set("page", page.toString());
    //* prevent scroll up to top
    // setSearchParams(searchParams, { preventScrollReset: true });
    //* ?page=3&hello=world -> hello=world is not lost by using setSearchParams
    setSearchParams(searchParams);
  };
  return (
    <div>
      <Pagination>
        <PaginationContent>
          {page === 1 ? null : (
            <>
              <PaginationItem>
                <PaginationPrevious
                  to={`?page=${page - 1}`}
                  onClick={(event) => {
                    event.preventDefault();
                    onClick(page - 1);
                  }}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  to={`?page=${page - 1}`}
                  onClick={(event) => {
                    event.preventDefault();
                    onClick(page - 1);
                  }}
                >
                  {page - 1}
                </PaginationLink>
              </PaginationItem>
            </>
          )}
          <PaginationItem>
            <PaginationLink
              to={`?page=${page}`}
              isActive
              onClick={(event) => {
                event.preventDefault();
                onClick(page);
              }}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
          {page === totalPage ? null : (
            <>
              <PaginationItem>
                <PaginationLink
                  to={`?page=${page + 1}`}
                  onClick={(event) => {
                    event.preventDefault();
                    onClick(page + 1);
                  }}
                >
                  {page + 1}
                </PaginationLink>
              </PaginationItem>
              {page === totalPage - 1 ? null : (
                <>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                </>
              )}
              <PaginationItem>
                <PaginationNext
                  to={`?page=${page + 1}`}
                  onClick={(event) => {
                    event.preventDefault();
                    onClick(page + 1);
                  }}
                />
              </PaginationItem>
            </>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
