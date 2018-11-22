import express from 'express'
import { Todo } from '../models'
import parseErrors from '../utils/parseErrors'

const router = express.Router()

router.post('/', async (req, res) => {
  const { todoText: text, userId } = req.body;
  const newTodo = await new Todo({ text, userId });
  newTodo
    .save()
    .then(async ({ _id: id }) => {
      const todoWithUserRecord = await Todo.findOne({ _id: id }).populate('userId', '_id')
      return res.json({ todo: todoWithUserRecord })
    })
    .catch(err => res.status(400).json({
      errors: parseErrors(err.errors)
    }))
})

export default router