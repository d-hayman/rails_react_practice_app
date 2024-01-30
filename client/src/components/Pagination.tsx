import PropTypes, {InferProps} from "prop-types";

const paginationPropTypes = {
    currentPage: PropTypes.number.isRequired,
    totalArticles: PropTypes.number.isRequired,
    articlesPerPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
};

type paginationTypes = InferProps<typeof paginationPropTypes>;
/**
 * 
 * @param param0 
 */
function Pagination({ currentPage, totalArticles, articlesPerPage, onPageChange }: paginationTypes) {
    const totalPages = Math.ceil(totalArticles/articlesPerPage);

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    }
    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    }

    const getVisiblePageNumbers = () => {
        if(totalPages <= 10) {
            return createRange(1, totalPages);
        }

        if(currentPage <= 6){
            const lastPageBeforeEllipsis = 8;
            return [...createRange(1, lastPageBeforeEllipsis), "...", totalPages];
        }

        if(currentPage >= totalPages - 5){
            const lastPageBeforeEllipsis = 8;
            return [1, "...", ...createRange(totalPages - 8, totalPages)];
        }

        return [1, "...", ...createMiddlePages(), "...", totalPages];
    }

    const createRange = (start:number, end:number) => {
        return Array.from({ length: end - start + 1 }, (_, i) => i + start);
    }

    const createMiddlePages = () => {
        const middlePagesStart = Math.max(2, currentPage - 3);
        const middlePagesEnd = Math.min(currentPage + 3, totalPages - 1);

        return createRange(middlePagesStart, middlePagesEnd);
    }

    return (
        <div>
            <button onClick={handlePrevious} disabled={currentPage === 1}>
                Previous
            </button>

            {getVisiblePageNumbers().map((page: any, index: number) => 
                typeof page === "number" ? (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        disabled={currentPage === page}
                    >
                        {page}
                    </button>
                ) : (
                    <span key={`ellipsis-${index}`} style={{margin: "0 5px"}}>
                        {page}
                    </span>
                )
            )}

            <button onClick={handleNext} disabled={currentPage === totalPages || totalArticles === 0}>
                Next
            </button>
        </div>
    );
}

export default Pagination;