import React, {useState} from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import ComboBoxExample from './ComboBoxExample'

// https://www.digitalocean.com/community/tutorials/how-to-use-downshift-in-common-dropdown-use-cases

import Downshift from 'downshift';

function DownshiftTwo(){
    const [state, setState] = useState([])
    const [text, setText] = useState('')

    const inputOnChange = (event) => {
        setText(event.target.value)

        if (!event.target.value) {
            return
        }

        fetchMovies(event.target.value)
    }

    const fetchMovies = (movie) => {
        // const moviesURL = `https://api.themoviedb.org/3/search/movie?api_key=APIKey&query=${movie}`;
        // axios.get(moviesURL).then(response => {
        //     this.setState({ movies: response.data.results })
        // })

        setState({ movies: [
            { title: 'Harry Potter' },
            { title: 'Net Moves' },
            { title: 'Half of a yellow sun' },
            { title: 'The Da Vinci Code' },
            { title: 'Born a crime' },
        ]})
    }

    const downshiftOnChange = (selectedMovie) => {
        setText(selectedMovie.title)
    }


    return (
        <Downshift onChange={downshiftOnChange} itemToString={item => {
            console.log(item)
            return (item ? item.title : '')
        }}>
            {({ selectedItem, getInputProps, getItemProps, highlightedIndex, isOpen, inputValue, getLabelProps, getToggleButtonProps }) => (
                <div className="flex items-center w-full h-[40px] pl-[10px]">
                    <input {...getInputProps({
                        className: 'w-full',
                        value: text,
                        placeholder: "Search movies",
                        onFocus: (e) => {
                            // console.log(getToggleButtonProps().onClick())

                        },
                        onChange: inputOnChange,
                        onKeyDown: (event) => {
                            console.log(event.target.value)
                            switch (event.key) {
                                case 'Enter': {
                                    event.preventDefault();
                                    console.log(111)
                                    // do stuff here
                                }
                            }
                        },
                    })} />
                    {(isOpen || true) ? (
                        <div className="downshift-dropdown">
                            {
                                state.movies
                                    ?.filter(item => !inputValue || item.title.toLowerCase().includes(inputValue.toLowerCase()))
                                    .slice(0, 10) // return just the first ten. Helps improve performance
                                    // map the filtered movies and display their title
                                    .map((item, index) => (
                                        <div
                                            className="dropdown-item"
                                            {...getItemProps({ key: index, index, item })}
                                            style={{
                                                backgroundColor: highlightedIndex === index ? 'lightgray' : 'white',
                                                fontWeight: selectedItem === item ? 'bold' : 'normal',
                                            }}>
                                            {item.title}
                                        </div>
                                    ))
                            }
                        </div>
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