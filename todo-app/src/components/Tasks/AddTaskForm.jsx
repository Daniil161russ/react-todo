import React, {useState} from 'react'
import axios from 'axios'

import addSvg from '../../assets/img/add.svg'

const AddTaskForm = ({list, onAddTask}) => {
	const [visible, setVisible] = useState(false)
	const [inputValue, setInputValue] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const toggleForm = () => {
		setVisible(!visible)
		setInputValue('')
	}

	const addTask = () => {
		const obj = {
			listId: list.id,
			text: inputValue,
			completed: false
		}
		setIsLoading(true)
		axios.post('http://localhost:3001/tasks', obj).then(({ data }) => {
			onAddTask(list.id, data)
			toggleForm()
		}).catch(() => {
			alert("Ошибка при добавлении задачи!")
		}).finally(() => {
			setIsLoading(false)
		})
	}

	return (
		<div className="tasks__form">
			{!visible ?
				<div onClick={toggleForm} className="tasks__form-new">
					<img src={addSvg} alt="icon: add" />
					<span>Новая задача</span>
				</div>
				:
				<div className="tasks__form-block">
					<input value={inputValue} onChange={e => setInputValue(e.target.value)} type="text" placeholder="Текст задачи" className="field"/>
					<button disabled={isLoading} onClick={addTask} className="button">{isLoading ? 'Добавление..' : 'Добавить задачу'}</button>
					<button onClick={toggleForm} className="button button--grey">Отмена</button>
				</div>
			}
		</div>
	)
}

export default AddTaskForm
