//import ReactSearchBox from "react-search-box";
import { AiOutlineSearch } from 'react-icons/ai'
import styled from 'styled-components'
import React from 'react'

const Search = styled.div`
	border-radius: 8px;
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: #fff;
	padding: 8px 16px;
	flex: 1;
	max-height: 50px;

	border: 1px solid grey;
`
const SearchIconWrapper = styled.div`
	height: '100%';
	position: 'absolute';
	pointer-events: 'none';
	display: 'flex';
	align-items: 'center';
	justify-content: 'center';
`
const StyledInputBase = styled.input`
	color: 'inherit';
	padding: 8px 8px 8px 0;
	width: 100%;
	background-color: #fff;
	height: 25px;
	border: none;
	outline: none;
`

const SearchBar = ({ input, searchTerm }) => {
	return (
		<Search>
			<StyledInputBase
				placeholder='Search Name or Email or Role'
				inputProps={{ 'aria-label': 'search' }}
				onChange={(e) => searchTerm(e.target.value)}
				value={input}
			/>
			<SearchIconWrapper>
                <AiOutlineSearch size={30}/>
			</SearchIconWrapper>
		</Search>
	)
}

export default SearchBar;