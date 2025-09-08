import { selectAllTasks, insertTask, deleteTaskById } from '../models/Task.js'


const getTasks = async (req, res, next) => {
  try {
    const result = await selectAllTasks()
    res.status(200).json(result.rows || [])
  } catch (error) {
    next(error)
  }
}

const postTask = async (req, res, next) => {
  const { task } = req.body
  try {
    if (!task || !task.description || task.description.trim().length === 0) {
      const error = new Error('Task description is required')
      error.status = 400
      return next(error)
    }

    const result = await insertTask(task.description)
    res.status(201).json(result.rows[0])
  } catch (error) {
    next(error)
  }
}


const deleteTask = async (req, res, next) => {
  const { id } = req.params
  try {
    const result = await deleteTaskById(id)
    if (result.rowCount === 0) {
      const error = new Error('Task not found')
      error.status = 404
      return next(error)
    }
    res.status(200).json({ id })
  } catch (error) {
    next(error)
  }
}

export { getTasks, postTask, deleteTask }
