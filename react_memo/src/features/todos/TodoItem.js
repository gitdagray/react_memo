import { useMutation, useQueryClient } from "react-query"
import { updateTodo, deleteTodo } from "../../api/todosApi"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { memo } from 'react'

const TodoItem = ({ todo }) => {
    const queryClient = useQueryClient()

    const updateTodoMutation = useMutation(updateTodo, {
        onSuccess: () => {
            // Invalidates cache and refetch 
            queryClient.invalidateQueries("todos")
        }
    })

    const deleteTodoMutation = useMutation(deleteTodo, {
        onSuccess: () => {
            // Invalidates cache and refetch 
            queryClient.invalidateQueries("todos")
        }
    })

    return (
        <article>
            <div className="todo">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    id={todo.id}
                    onChange={() =>
                        updateTodoMutation.mutate({ ...todo, completed: !todo.completed })
                    }
                />
                <label htmlFor={todo.id}>{todo.title}</label>
            </div>
            <button className="trash" onClick={() => deleteTodoMutation.mutate({ id: todo.id })}>
                <FontAwesomeIcon icon={faTrash} />
            </button>
        </article>
    )
}

const areEqual = (prevProps, nextProps) => {
    return prevProps.todo.id === nextProps.todo.id && prevProps.todo.completed === nextProps.todo.completed
}

const memoizedTodoItem = memo(TodoItem, areEqual)

export default memoizedTodoItem