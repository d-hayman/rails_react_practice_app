import { useRef } from "react";
import PropTypes, {InferProps} from "prop-types";

const searchPropTypes = {
    value: PropTypes.string.isRequired,
    onSearchChange: PropTypes.func.isRequired,
    onImmediateChange: PropTypes.func.isRequired,
}

type searchTypes = InferProps<typeof searchPropTypes>;
function SearchBar({ value, onSearchChange, onImmediateChange }: searchTypes){
    const searchDebounceRef = useRef<NodeJS.Timeout | null>(null);

    const handleSearchChange = (e: any) => {
        const searchValue = e.target.value;

        onImmediateChange(searchValue);

        if (searchDebounceRef.current) {
            clearTimeout(searchDebounceRef.current);
        }

        searchDebounceRef.current = setTimeout(() => {
            onSearchChange(searchValue);
        }, 500);
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Search..."
                value={value}
                onChange={handleSearchChange}
            />
        </div>
    )
}

SearchBar.propTypes = searchPropTypes;

export default SearchBar;