import {React, useEffect, useState } from 'react'
import styled from 'styled-components'
import SearchBar from './components/SearchBar/SearchBar'

import axios from 'axios'

import AdminTable from './components/AdminTable.js/index.js'
import CustomPagination from './components/Pagination/Pagination'

import './App.css';
import LoadingSpin from "react-loading-spin";

const Container = styled.div`
	min-height: 100vh;
	width: 100vw;
	padding: 0.5rem;

	display: flex;
	justify-content: center;
	align-items: flex-start;
`
const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	min-height: 100vh;
	width: 100%;
	height: 100%;
	padding: 0.5rem;

	@media screen (min-width:1200px) {
		width: 80%;
		padding: 2rem;
	}

	@media screen (max-width:492px) {
		width: 50%;
		padding: 2rem;
	}

	@media screen (min-width:493px) and (max-width:776px) {
		width: 70%;
		padding: 2rem;
	}

	@media screen (min-width:777px) and (max-width:992px) {
		width: 75%;
		padding: 2rem;
	}

`
const LoadingContainer = styled.div`
	border-radius: 8px;
	min-width: 300px;
	width: 100%;

	flex: 10;
	display: flex;
	justify-content: center;
	align-items: center;
`


function App() {
  const [data, setData] = useState([])
	const [input, setInput] = useState('')
	const [selected, setSelected] = useState([])
	const rowsPerPage = 10
	const [page, setPage] = useState(0)
	const [selectedAll, setSelectedAll] = useState(false)
	const [filteredData, setFilteredData] = useState(data)

	const [loading, setLoading] = useState(true)


  const columns = [
		{
			field: 'name',
			headerName: 'Name',
		},
		{
			field: 'email',
			headerName: 'Email',
		},
		{
			field: 'role',
			headerName: 'Role',
		},
		{
			field: 'actions',
			headerName: 'Actions',
		},
	]

  useEffect(() => {
		fetchData()
	}, [])

	const fetchData = async () => {
		const response = await axios.get(
			'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
		)
		const rowData = await response.data
		const formattedData = rowData.map((each) => ({
			...each,
			isChecked: false,
			isEditable: false,
		}))
		setData(formattedData)
		setFilteredData(formattedData)
		setLoading(false)
	}

  const handleChecked = (e, row) => {
		if (e.target.checked) {
			setSelected([...selected, row])
		} else {
			const filteredRows = selected.filter((each) => each.id !== row.id)
			setSelected(filteredRows)
		}
		const updatedData = filteredData.map((each) => {
			if (each.id === row.id) {
				return {
					...each,
					isChecked: !each.isChecked,
				}
			}

			return each
		})

		setFilteredData(updatedData)
	}

	const handleSelectAll = (e) => {
		const selectedAllIds = filteredData
			.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
			.map((each) => each.id)

		if (e.target.checked) {
			const formatSelectedData = filteredData.map((each) => {
				if (selectedAllIds.includes(each.id)) {
					return {
						...each,
						isChecked: true,
					}
				}
				return each
			})
			setSelected(
				formatSelectedData.slice(
					page * rowsPerPage,
					page * rowsPerPage + rowsPerPage
				)
			)

			setFilteredData(formatSelectedData)
			setSelectedAll(!selectedAll)
		} else {
			const formatSelectedData = filteredData.map((each) => {
				if (selectedAllIds.includes(each.id)) {
					return {
						...each,
						isChecked: false,
					}
				}
				return each
			})
			setSelected([])

			setFilteredData(formatSelectedData)
			setSelectedAll(!selectedAll)
		}
	}

	const handlePagination = (e, value) => {
		const selectedAllIds = filteredData
			.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
			.map((each) => each.id)
		const formatSelectedData = filteredData.map((each) => {
			if (selectedAllIds.includes(each.id)) {
				return {
					...each,
					isChecked: false,
				}
			}
			return each
		})
		setFilteredData(formatSelectedData)
		setPage(value - 1)
		setSelected([])
		setSelectedAll(false)
	}

	const handleDelete = (id) => {
		const updatedData = filteredData.filter((each) => each.id !== id)

		setFilteredData(updatedData)
	}

	const handleDeleteMany = () => {
		setSelectedAll(false)
		const selectedAllIds = selected.map((each) => each.id)

		const updatedData = filteredData.filter((each) => {
			if (!selectedAllIds.includes(each.id)) {
				return each
			}
			return null
		})

		setFilteredData(updatedData)
		setSelectedAll(false)
		setSelected([])
	}

	const searchTerm = (value) => {
		setLoading(true)
		setInput(value)
		setSelectedAll(false)
		const filterData = data.filter((each) => {
			if (each.name.toLowerCase().includes(value.toLowerCase())) {
				return each
			} else if (each.role.toLowerCase().includes(value.toLowerCase())) {
				return each
			} else if (each.email.toLowerCase().includes(value.toLowerCase())) {
				return each
			}
			return null
		})

		setFilteredData(filterData)
		setLoading(false)
	}

	const handleEdit = (row) => {
		const updatedData = filteredData.map((each) => {
			if (each.id === row.id) {
				return {
					...each,
					isEditable: !each.isEditable,
				}
			}

			return each
		})
		setFilteredData(updatedData)
	}

	const handleSave = (row) => {
		const filter = filteredData.map((each) => {
			if (each.id === row.id) {
				return row
			} else {
				return each
			}
		})

		setFilteredData(filter)
	}

	const handleCancelEdit = (row) => {
		const filter = filteredData.map((each) => {
			if (each.id === row.id) {
				return row
			} else {
				return each
			}
		})

		setFilteredData(filter)
	}



  return (
    <Container>
			<Wrapper>
				<SearchBar input={input} searchTerm={searchTerm} />
				{!loading ? (
					<>
						<AdminTable
							data={filteredData}
							columns={columns}
							handleChecked={handleChecked}
							handleSelectAll={handleSelectAll}
							handleDelete={handleDelete}
							rowsPerPage={rowsPerPage}
							page={page}
							selectedAll={selectedAll}
							selected={selected}
							handleEdit={handleEdit}
							handleSave={handleSave}
							handleCancelEdit={handleCancelEdit}
						/>
						<CustomPagination
							page={page}
							count={Math.ceil(filteredData.length / rowsPerPage)}
							rowsPerPage={rowsPerPage}
							handlePagination={handlePagination}
							handleDeleteMany={handleDeleteMany}
							selected={selected}
						/>
					</>
				) : (
					<LoadingContainer>
						 <LoadingSpin />
					</LoadingContainer>
				)}
			</Wrapper>
		</Container>
    
       
    
  );
}

export default App;
