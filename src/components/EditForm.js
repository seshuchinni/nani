import React, { useState } from 'react'
//import { MenuItem, Select, TextField } from '@material-ui/core'
import {AiOutlineSave} from 'react-icons/ai';
import {ImCancelCircle} from 'react-icons/im'

const EditForm = ({ row, ...props }) => {
	const [name, setName] = useState(row.name)
	const [email, setEmail] = useState(row.email)
	const [role, setRole] = useState(row.role)

	const onSave = () => {
		props.handleSave({
			id: row.id,
			name,
			email,
			role,
			isChecked: row.isChecked,
			isEditable: false,
		})
	}

	const onCancel = () => {
		props.handleCancelEdit({
			...row,
			isEditable: false,
		})
	}

	return (
		<tr key={row.id}>
			<td align='center'>{row.id}</td>
			<td>
				<input
					color='secondary'
					id='standard-basic'
					label='Name'
					variant='standard'
					value={name}
					type='text'
					onChange={(e) => setName(e.target.value)}
				/>
			</td>
			<td>
				<input
					color='secondary'
					id='standard-basic'
					label='Email'
					variant='standard'
					value={email}
					type='email'
					onChange={(e) => setEmail(e.target.value)}
				/>
			</td>
			<td>
				<select
					color='secondary'
					value={role}
					label='Role'
					autoWidth
					onChange={(e) => setRole(e.target.value)}>
					<option value={'member'}>member</option>
					<option value={'admin'}>admin</option>
				</select>
			</td>
			<td>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-around',
						alignItems: 'center',
					}}>
					<div onClick={onSave} style={{ cursor: 'pointer' }}>
							<AiOutlineSave style={{
								marginRight: '10px',
								color: '#1976d2',
								fontSize: '20px',
							}}/>
					</div>
					<div onClick={onCancel} style={{ cursor: 'pointer' }}>
							<ImCancelCircle style={{
								marginRight: '10px',
								color: '#ff5171',
								fontSize: '20px',
							}}/>
					</div>
				</div>
			</td>
		</tr>
	)
}

export default EditForm
