import React from 'react'
import axios from 'axios'
import classNames from 'classnames'

import removeSvg from '../../assets/img/remove.svg'
import Badge from '../Badge'

import './List.scss'

const List = ({ items, isRemovable, onClick, onRemove, onClickItem, activeItem }) => {
	const removeList = (item) => {
		if (window.confirm('Вы действительно хотите удалить список?')) {
			axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
				onRemove(item.id)
			})
		}
	}

	return (
		<ul className="list" onClick={onClick}>
			{ items.map((item, index) => (
				<li key={index} className={classNames(item.className, { 
					active: item.active ? item.active : activeItem && activeItem.id === item.id 
					})} 
					onClick={onClickItem ? () => onClickItem(item) : null}
				>
					<i>{ item.icon ? ( item.icon ) : (<Badge color={item.color.name}/>)}</i>
					<span>{ item.name }{ item.tasks && ` (${item.tasks.length})`}</span>
					{ isRemovable && 
						<img onClick={() => removeList(item)} src={removeSvg} className="list__remove-icon" alt="icon: remove" />
					}
				</li>
			))}
		</ul>
	)
}

export default List;

