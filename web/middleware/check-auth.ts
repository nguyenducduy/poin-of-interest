import {
  getUserFromLocalStorage,
  getTokenFromLocalStorage
} from "~/helper/auth";

export default function({ store }) {
  const loggedUser = getUserFromLocalStorage();
  const loggedToken = getTokenFromLocalStorage();

  store.commit("SET_USER", {
    user: loggedUser,
    token: loggedToken
  });
}
