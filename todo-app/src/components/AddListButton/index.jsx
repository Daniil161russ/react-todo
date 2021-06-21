import React, { useState } from 'react'
import List from '../List'

import Badge from '../Badge'
import closeSvg from '../../assets/img/close.svg'

import './AddListButton.scss'

const AddButtonList = ({ colors, onAdd }) => {
	const [visible, setVisible] = useState(false)
	const [selectedColor, setSelectColor] = useState(colors[0].id)
	const [inputValue, setInputValue] = useState('')

	const addList = () => {
		if (!inputValue) {
			alert('Введите название списка')
			return;
		}
		onAdd({ id: Math.random(), name: inputValue, color: colors.filter(c => c.id === selectedColor)[0].name });
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
					<img onClick={() => setVisible(false)} src={closeSvg} alt="icon: close" className="add-list__popup-close-btn"/>
					<input value={inputValue} onChange={e => setInputValue(e.target.value)} type="text" placeholder="Название списка" className="field"/>
					<div className="add-list__popup-colors">
						{ colors.map(color => (
							<Badge color={color.name} 
										onClick={() => setSelectColor(color.id)} 
										className={ selectedColor === color.id && 'active'} key={color.id}
							/>
						))}
					</div>
					<button onClick={addList} className="button">Добавить</button>
				</div>
			}
		</div>
	)
}

export default AddButtonList