import { useSearchParams } from "react-router-dom";

function useURLSearchParam(paramName: string, initialValue: string = "")
    : [string, React.Dispatch<React.SetStateAction<string>>] {
    const [searchParams, setSearchParams] = useSearchParams();

    const paramValue = searchParams.get(paramName) || initialValue;

    const setParamValue = (value: any) => {
        if (value) {
            setSearchParams({ ...Object.fromEntries(searchParams), [paramName]: value})
        } else {
            searchParams.delete(paramName);
            setSearchParams(searchParams);
        }
    }

    return [paramValue, setParamValue];
}

export default useURLSearchParam;