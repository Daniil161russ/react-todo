import React, { useState, useEffect } from 'react'
import axios from 'axios'

import List from '../List'
import Badge from '../Badge'
import closeSvg from '../../assets/img/close.svg'

import './AddListButton.scss'

const AddButtonList = ({ colors, onAdd }) => {
	const [visible, setVisible] = useState(false)
	const [selectedColor, setSelectColor] = useState(3)
	const [inputValue, setInputValue] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		if (Array.isArray(colors)) {
			setSelectColor(colors[0].id)
		}
	}, [colors])

	const onClose = () => {
		setVisible(false)
		setInputValue('')
		setSelectColor(colors[0].id)
	}

	const addList = () => {
		if (!inputValue) {
			alert('Введите название списка')
			return;
		}
		setIsLoading(true)
		axios.post('http://localhost:3001/lists', { 
			name: inputValue,
			colorId: selectedColor
		}).then(({data}) => {
			let color = colors.filter(c => c.id === selectedColor)[0].name
			const listObj = {...data, color: { name: color}}
			onAdd(listObj)
			onClose()
		}).catch(() => {
			alert("Ошибка при добавлении списка!")
		}).finally(() => {
			setIsLoading(false)
		})
	}

	return (
		<div className="add-list">
			<List items={[
				{
					icon: <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M8 1V15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
					<path d="M1 8H15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
					</svg>,
					className: 'list__add-button',
					name: 'Добавить список'
				}
			]}
			onClick={() => setVisible(!visible)}
			/>
			{ visible && 
				<div className="add-list__popup">
					<img onClick={onClose} src={closeSvg} alt="icon: close" className="add-list__popup-close-btn"/>
					<input value={inputValue} onChange={e => setInputValue(e.target.value)} type="text" placeholder="Название списка" className="field"/>
					<div className="add-list__popup-colors">
						{ colors.map(color => (
							<Badge color={color.name} 
										onClick={() => setSelectColor(color.id)} 
										className={ selectedColor === color.id && 'active'} key={color.id}
							/>
						))}
					</div>
					<button onClick={addList} className="button">{isLoading ? 'Добавление..' : 'Добавить'}</button>
				</div>
			}
		</div>
	)
}

export default AddButtonList