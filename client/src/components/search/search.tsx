import  { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { url, optionsOfApi } from "../../utils/helper/api.ts";
import './search.css'

const Search = ({ onSearchChange }:any) => {

    const [search, setSearch] = useState(null);

    const handleOnChange = (searchData:any) => {
        setSearch(searchData);
        onSearchChange(searchData);
    }
    const loadOptions = (inputValue:any) => {
        if (inputValue && inputValue.length > 0) {
            return fetch(`${url}/cities?minPopulation=100000&namePrefix=${inputValue}`, optionsOfApi)
                .then(response => response.json())
                .then(response => {
                    return {
                        options: response.data.map((city:any) => {
                            return {
                                value: `${city.latitude} ${city.longitude}`,
                                label: `${city.name} ${city.countryCode}`
                            }
                        })
                    }
                })
        } else {
            return Promise.resolve({ options: [] });
        }
    }

    

    return (
        <AsyncPaginate
            className="searchBar"
            placeholder="Search Here..."
            debounceTimeout={1000}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />
    )
}



export default Search;