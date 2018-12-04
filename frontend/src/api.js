import axios from "axios";

export default {
  user: {
    login: async (credentials) => {
      try {
        return await axios.post("/api/auth", { credentials })
      } catch (e) {
        console.log('failed login', e)
        return null
      }
    },
    signup: async (user) => {
      try {
        return axios.post("/api/user", { user })
      } catch (e) {
        console.log('failed signup', e)
        return null
      }
    },
    fetchCurrentUser: async () => {
      try {
        return await axios.get("/api/user/current_user")
      } catch (e) {
        console.log('failed to fetch current user', e)
        return null
      }
    },
    confirm: async (token) => {
      try {
        return await axios.post('/api/auth/confirmation', { token })
      } catch (e) {
        console.log('failed to confirm', e)
        return null
      }
    }
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
