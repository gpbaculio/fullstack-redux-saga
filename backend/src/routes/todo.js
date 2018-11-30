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
    .catch(error => res.status(400).json({ error }))
})

router.post('/toggle_complete', async (req, res) => {
  const { todoId, userId, complete } = req.body;
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: todoId, userId },
      { $set: { complete: !complete } },
      { new: true }
    ).populate('userId', '_id');
    res.json({ todo })
  } catch (error) {
    res.status(400).json({ error })
  }
})

router.post('/toggle_all', async (req, res) => {
  const { ids, userId, complete } = req.body;
  try {
    const todos = await Todo.update(
      { _id: { $in: ids }, userId },
      { $set: { complete } },
      { new: true }
    ).populate('userId', '_id');
    res.json({ todos })
  } catch (error) {
    res.status(400).json({ error })
  }
})

router.get("/todos_by_user", authenticate, async (req, res) => {

  const { _id: userId } = req.currentUser
  const { offset, limit, searchText } = req.query
  let findQuery;

  if (searchText) {
    findQuery = {
      userId,
      text: { '$regex': `${searchText}`, '$options': 'i' },
    }
  } else {
    findQuery = { userId }
  }

  Todo.paginate(
    findQuery,
    {
      offset: parseFloat(offset),
      limit: parseFloat(limit),
      sort: { createdAt: -1 } // Sort by Date Added DESC
    },
    (error, { docs, total }) =>
      error ? res.status(400).json({ error }) :
        res.status(200).json({ count: total, todos: docs })
  );
});

export default router