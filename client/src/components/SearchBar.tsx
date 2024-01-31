import { useRef } from "react";
import PropTypes, {InferProps} from "prop-types";
import { Form } from "react-bootstrap";

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
        <Form>
            <Form.Control
                type="text"
                placeholder="Search..."
                value={value}
                onChange={handleSearchChange}
            />
        </Form>
    )
}

SearchBar.propTypes = searchPropTypes;

export default SearchBar;