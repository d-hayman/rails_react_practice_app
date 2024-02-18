import PropTypes, {InferProps} from "prop-types";
import { Pagination } from "react-bootstrap";

const paginationPropTypes = {
    currentPage: PropTypes.number.isRequired,
    totalItems: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
};

type paginationTypes = InferProps<typeof paginationPropTypes>;
/**
 * 
 * @param param0 
 */
function Paginator({ currentPage, totalItems, itemsPerPage, onPageChange }: paginationTypes) {
    const totalPages = Math.ceil(totalItems/itemsPerPage);

    const handleFirst = () => {
        if(currentPage > 1) {
            onPageChange(1);
        }
    }

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

    const handleLast = () => {
        if ( currentPage < totalPages) {
            onPageChange(totalPages);
        }
    }

    const getVisiblePageNumbers = () => {
        const lastPageBeforeEllipsis = 8;

        if(totalPages <= 10) {
            return createRange(1, totalPages);
        }

        if(currentPage <= 6){
            return [...createRange(1, lastPageBeforeEllipsis), "...", totalPages];
        }

        if(currentPage >= totalPages - 5){
            return [1, "...", ...createRange(totalPages - lastPageBeforeEllipsis, totalPages)];
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
        <Pagination style={{float:"right"}}>
            <Pagination.First onClick={handleFirst} disabled={currentPage === 1}/>
            <Pagination.Prev onClick={handlePrevious} disabled={currentPage === 1} />
            {getVisiblePageNumbers().map((page: any, index: number) => 
                typeof page === "number" ? (
                    <Pagination.Item
                        key={page}
                        onClick={() => onPageChange(page)}
                        active={currentPage === page}
                    >
                        {page}
                    </Pagination.Item>
                ) : (
                    <Pagination.Ellipsis/>
                )
            )}

            <Pagination.Next onClick={handleNext} disabled={currentPage === totalPages || totalItems === 0} />
            <Pagination.Last onClick={handleLast} disabled={currentPage === totalPages || totalItems === 0} />
        </Pagination>
    );
}

export default Paginator;