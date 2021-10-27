import UserStore from "./user";
import NotesStore from "./notes";
import PasswordStore from "./passwords";
import TodoListStore from "./todo-list";
import PageViewStore from "./page-view";
import { reaction } from "mobx";
import UserModel from "../models/user/UserModel";

export const pageView = new PageViewStore();
export const user = new UserStore();
export const notes = new NotesStore(pageView.currentUserId);
export const passwords = new PasswordStore();
export const todoList = new TodoListStore(pageView.currentUserId);

reaction(
  () => pageView.currentUserId,
  async (userId) => {
    const loadedUser = await UserModel.selectUserById(userId);

    todoList.loadData(userId);

    user.data = loadedUser;
  }
);
