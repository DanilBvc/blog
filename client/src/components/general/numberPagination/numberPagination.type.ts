export type numberPaginationProps = {
  currentPage: number;
  totalPages: number;
  gridSize: number;
  onGridResize: (size: number) => void;
  onPageChange: (pageNumber: number) => void;
};
