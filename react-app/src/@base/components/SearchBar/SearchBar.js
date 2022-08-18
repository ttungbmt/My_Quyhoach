import React, {useState, useEffect} from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import ComboBoxExample from './ComboBoxExample'
import {useDebounce} from 'react-use'
import axios from 'axios'

// https://www.digitalocean.com/community/tutorials/how-to-use-downshift-in-common-dropdown-use-cases

import Downshift from 'downshift';

function DownshiftTwo(){
    const [suggestions, setSuggestions] = useState([])
    const [text, setText] = useState('')
    const [debouncedText, setDebouncedText] = useState('');

    const [, cancel] = useDebounce(
        () => {
            setDebouncedText(text)
        },
        500,
        [text]
    );

    useEffect(() => {
        if (!debouncedText) {
            return
        }

        fetchMovies(debouncedText)
    }, [debouncedText])

    const inputOnChange = (event) => {
        setText(event.target.value)

        if (!event.target.value) {
            return
        }

    }

    const fetchMovies = (keyword) => {
        const URL = `https://api.meeymap.com/map/v1/suggest-places?keyword=${keyword}`;
        axios.get(URL).then(resp => {
            setSuggestions(resp.data.data)
        })
    }

    const downshiftOnChange = (item) => {
        setText(item.name)
        axios.get(`https://api.meeymap.com/map/v1/place-detail-by-id?placeId=${item.place_id}`).then(resp => {
            const {location, bounds} = _.get(resp, 'data.data.geometry') || {}
        })
    }


    return (
        <Downshift onChange={downshiftOnChange} itemToString={item => {
            return (item ? item.title : '')
        }}>
            {({ selectedItem, getInputProps, getItemProps, highlightedIndex, isOpen, inputValue, getLabelProps, getToggleButtonProps }) => (
                <div className="flex items-center w-full h-[40px] relative">
                    <input {...getInputProps({
                        className: 'pl-[10px] w-full',
                        value: text,
                        placeholder: "Search movies",
                        onFocus: (e) => {
                            // console.log(getToggleButtonProps().onClick())

                        },
                        onChange: inputOnChange,
                        onKeyDown: (event) => {
                            switch (event.key) {
                                case 'Enter': {
                                    event.preventDefault();
                                    console.log(111)
                                    // do stuff here
                                }
                            }
                        },
                    })} />
                    {isOpen ? (
                        <Paper className="downshift-dropdown absolute w-full overflow-auto" style={{top: 48}}>
                            {
                                suggestions
                                    // ?.filter(item => !inputValue || item.name.toLowerCase().includes(inputValue.toLowerCase()))
                                    // .slice(0, 10) // return just the first ten. Helps improve performance
                                    // map the filtered movies and display their title
                                    .map((item, index) => (
                                        <div
                                            className="dropdown-item px-12 py-8 truncate"
                                            {...getItemProps({ key: index, index, item })}
                                            style={{
                                                backgroundColor: highlightedIndex === index ? 'lightgray' : 'white',
                                                fontWeight: selectedItem === item ? 'bold' : 'normal',
                                            }}>
                                            {item.name}
                                        </div>
                                    ))
                            }
                        </Paper>
                    ) : null}
                </div>
            )}
        </Downshift>
    )
}


function SearchBar() {
    return (
        <Paper
            className="absolute z-50 m-12 ml-20"
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, backgroundColor: '#fffffff2' }}
            elevation={1}
        >
            <DownshiftTwo />
            {/*<InputBase
                sx={{ ml: 2, flex: 1 }}
                placeholder="Nhập địa chỉ, tọa độ vệ tinh để tìm kiếm"
                inputProps={{ 'aria-label': 'search google maps' }}
            />
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>*/}
        </Paper>
    );
}

export default SearchBar