import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'

import styles from './taskInput.module.scss'

import { Todo } from '../../@types/todo.type'
import { TodoTypes } from '../../PropTypes/todo.proptype'
import connect from '../../HOC/connect'
import { debug, log } from '../../constants'
import Title from '../Title'

interface TaskInputProps {
  addTodo: (name: string) => void
  editTodo: (name: string) => void
  finishEditTodo: () => void
  currentTodo: Todo | null
}

function TaskInput(props: TaskInputProps & typeof injectedProps) {
  const { addTodo, currentTodo, editTodo, finishEditTodo, debug, log } = props
  const [name, setName] = useState<string>('')
  // log(debug)

  const address = useMemo(() => {
    return {
      street: '99 pham dang giang'
    }
  }, [currentTodo])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (currentTodo) {
      finishEditTodo()
      if (name) setName('')
    } else {
      addTodo(name)
      setName('')
    }
  }

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (currentTodo) {
      editTodo(value)
    } else {
      setName(value)
    }
  }

  // const NewTitle = React.memo(Title, equal) // cach sai

  return (
    <div className='mb-2'>
      <Title address={address} />
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='caption goes here'
          value={currentTodo ? currentTodo.name : name}
          onChange={onChangeInput}
        />
        <button type='submit'>{currentTodo ? '☑️' : '➕'}</button>
      </form>
    </div>
  )
}

TaskInput.propTypes = {
  addTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
  finishEditTodo: PropTypes.func.isRequired,
  currentTodo: PropTypes.oneOfType([TodoTypes, PropTypes.oneOf([null])])
}

// export default connect<TaskInputProps>(TaskInput)
const injectedProps = { debug: debug, log: log }
export default connect(injectedProps)(TaskInput)
