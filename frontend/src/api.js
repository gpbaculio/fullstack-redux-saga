import axios from "axios";

export default {
  user: {
    login: (credentials) => axios.post("/api/auth", { credentials }),
    signup: (user) => axios.post("/api/user", { user }),
    fetchCurrentUser: () => axios.get("/api/user/current_user"),
    confirm: (token) => axios.post('/api/auth/confirmation', { token })
  },
  todo: {
    fetchTodosByUser: async ({ sortFirst, offset, limit, searchText, complete }) => {
      try {
        const { data } = await axios.get("/api/todo/todos_by_user", {
          params: { sortFirst, offset, limit, searchText, complete }
        })
        return { count: data.count, todos: data.todos };
      } catch (e) {
        console.log('failed to fetch todos by user', e)
        return null
      }
    },
    toggleTodoCompleteByUser: async ({ todoId, userId, complete }) => {
      try {
        const updatedTodo = await axios.post('/api/todo/update_todo', {
          todoId, userId, complete
        })
        return updatedTodo
      } catch (error) {
        return null
      }
    }
  }
};
