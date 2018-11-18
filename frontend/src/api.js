import axios from "axios";

export default {
  user: {
    signup: user => {
      console.log('fired signup')
      return axios.post("/api/user", { user }).then(res => res.data.user)
    },
  }
};
