import axios from "axios";

export default {
  user: {
    login: (credentials) => axios.post("/api/auth", { credentials }),
    signup: (user) => axios.post("/api/user", { user }),
    fetchCurrentUser: () => axios.get("/api/user/current_user"),
    confirm: (token) => axios.post('/api/auth/confirmation', { token })
  },
  todo: {
    fetchTodosByUser: ({ sortFirst, offset, limit, searchText, complete }) => axios.get("/api/todo/todos_by_user", {
      params: { sortFirst, offset, limit, searchText, complete }
    }),
    toggleTodoCompleteByUser: ({ todoId, userId, complete }) => axios.post('/api/todo/update_todo', {
      todoId, userId, complete
    })
  }
};
