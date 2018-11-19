import axios from "axios";

export default {
  user: {
    login: credentials => axios.post("/api/auth", { credentials }).then(res => res.data.user),
    signup: user => axios.post("/api/user", { user }).then(res => res.data.user),
    fetchCurrentUser: () => axios.get("/api/user/current_user").then(res => { console.log('res', res); return res.data.user })
  },
};
