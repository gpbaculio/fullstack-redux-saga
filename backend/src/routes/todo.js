import express from 'express'
import { Todo } from '../models'
import parseErrors from '../utils/parseErrors'
import { authenticate } from '../middlewares'

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

router.get("/todos_by_user", authenticate, async (req, res) => {
  const { _id: userId } = req.currentUser
  const { offset, limit, searchText } = req.query
  let findQuery;
  if (searchText) {
    findQuery = { userId, text: new RegExp(`^${searchText}$`, "i") }
  } else {
    findQuery = { userId }
  }
  console.log('findQuery = ', findQuery)
  Todo.paginate(
    findQuery,
    { offset: parseFloat(offset), limit: parseFloat(limit) },
    (err, { docs, total }) => {
      if (err) {
        res.status(400).json({ error: err })
      } else {
        res.json({ count: total, todos: docs })
      }
    });
});

export default router