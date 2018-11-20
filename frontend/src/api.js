import axios from "axios";

export default {
  user: {
    login: credentials => axios.post("/api/auth", { credentials }).then(res => res.data.user),
    signup: user => axios.post("/api/user", { user }).then(res => res.data.user),
    fetchCurrentUser: () => axios.get("/api/user/current_user").then(res => res.data.user),
    confirm: token => axios.post('/api/auth/confirmation', { token }).then(res => res.data.user)
  },
};
