import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../ui/pagination";

const DataPagination: React.FC<{
  url: string;
  data: any;
  pageData?: (page: string) => void;
  hasFilter?: boolean;
}> = ({ url, data, pageData, hasFilter }) => {
  const handleSetDataPage = (page: string | null | undefined) => {
    if (page != null) {
      pageData && pageData(String(page));
    }
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className="cursor-pointer"
            onClick={() => handleSetDataPage(data?.previous)}
          />
        </PaginationItem>
        {Array.from({ length: Math.ceil(data?.count / 24) }).map((_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              className="cursor-pointer"
              onClick={() =>
                handleSetDataPage(
                  index !== 0
                    ? !hasFilter
                      ? `${url}?page=${index + 1}`
                      : `${url}&page=${index + 1}`
                    : url
                )
              }
            >
              {index}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            className="cursor-pointer"
            onClick={() => handleSetDataPage(data?.next)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default DataPagination;
