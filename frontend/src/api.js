import axios from "axios";

export default {
  user: {
    login: credentials => axios.post("/api/auth", { credentials }).then(res => res.data.user),
    signup: user => axios.post("/api/user", { user }).then(res => res.data.user),
    fetchCurrentUser: () => axios.get("/api/user/current_user").then(res => res.data.user, () => { }),
    confirm: token => axios.post('/api/auth/confirmation', { token }).then(res => res.data.user)
  },
  todo: {
    addTodoByUser: ({ todoText, userId }) => axios.post("/api/todo", { todoText, userId }).then(res => res.data.todo),
    fetchTodosByUser: async ({ offset, limit, searchText }) => {
      try {
        let todosData;
        await axios.get(
          "/api/todo/todos_by_user", {
            params: {
              offset,
              limit,
              searchText
            }
          }).then(res => {
            todosData = {
              totalElements: res.data.count,
              elements: res.data.todos.map(t => ({
                ...t,
                id: t._id
              }))
            }
          })
        return todosData
      } catch (e) {
        return null
      }
    },
    toggleTodoCompleteByUser: async ({ todoId, userId, complete }) => {
      try {
        const updatedTodo = await axios.post('/api/todo/update_todo', { todoId, userId, complete })
        return updatedTodo
      } catch (error) {
        return { error }
      }
    }
  }
};
