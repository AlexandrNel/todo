import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createTask, getTasks, deleteTask, updateTask } from "@/api";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export type Task = {
  id: string;
  userId: TaskId;
  title: string;
  content: string;
  isCompleted: boolean;
};
export type TaskId = string;

enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

const fetchTasks = createAsyncThunk("fetchTasks", getTasks);
const fetchCreatedTask = createAsyncThunk("fetchCreatedTask", createTask);
const fetchRemovedTask = createAsyncThunk("fetchRemovedTask", deleteTask);
const fetchUpdatedTask = createAsyncThunk("fetchUpdatedTask", updateTask);

interface TasksState {
  tasks: Task[];
  deletedTask: Task | null;
  indexOfDeleted: number | null;
  status: "loading" | "success" | "error";
}

const initialState: TasksState = {
  tasks: [],
  indexOfDeleted: null,
  deletedTask: null,
  status: Status.LOADING,
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTaskStatus: (state, action: PayloadAction<{ id: string }>) => {
      const foundTask = state.tasks.find((item) => item.id === action.payload.id);
      foundTask && (foundTask.isCompleted = !foundTask.isCompleted)
    },
    removeTask: (state, action) => {
      const foundTask = state.tasks.find((item) => item.id === action.payload)
      if (foundTask) {
        state.indexOfDeleted = state.tasks.indexOf(foundTask)
        state.deletedTask = foundTask
        state.tasks.splice(state.indexOfDeleted, 1)
      }
    },
    undoRemove: (state) => {
      if (state.deletedTask && (state.indexOfDeleted !== null)) { state.tasks.splice(state.indexOfDeleted, 0, state.deletedTask) }
      state.deletedTask = null
      state.indexOfDeleted = null
    }
  },
  extraReducers: (builder) => {
    // Get Tasks
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchTasks.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchTasks.rejected, (state) => {
      state.status = Status.ERROR;
    });
    // Create Task
    builder.addCase(fetchCreatedTask.fulfilled, (state, action) => {
      state.tasks.push(action.payload);
    });
    builder.addCase(fetchCreatedTask.rejected, (state, action) => {
      state.tasks = state.tasks.filter((item) => item.id !== action.meta.arg.id);
    });
    // Remove Task
    builder.addCase(fetchRemovedTask.fulfilled, (state, action) => {
      state.tasks = state.tasks.filter((item) => item.id !== action.meta.arg);
      state.deletedTask = null
      state.indexOfDeleted = null
    });
    builder.addCase(fetchRemovedTask.rejected, (state) => {
      if (state.deletedTask && state.indexOfDeleted || state.deletedTask && state.indexOfDeleted === 0) { state.tasks.splice(state.indexOfDeleted, 0, state.deletedTask) }
      state.deletedTask = null
      state.indexOfDeleted = null
    });
    // UPDATE Task
    builder.addCase(
      fetchUpdatedTask.fulfilled,
      (state, action: PayloadAction<Task>) => {
        const foundTask = state.tasks.find((item) => item.id === action.payload.id);
        if (foundTask) {
          if ('content' in foundTask) foundTask.content = action.payload.content;
          if ('title' in foundTask) foundTask.title = action.payload.title;
          if ('isCompleted' in foundTask) foundTask.isCompleted = action.payload.isCompleted;
        }
      }
    );
  },
});

export const { setTaskStatus, removeTask, undoRemove } = todosSlice.actions;
export { fetchTasks, fetchCreatedTask, fetchRemovedTask, fetchUpdatedTask };
export const selectIsDeleted = (state: RootState) => Boolean(state.todos.deletedTask)
export const selectTasks = (state: RootState) => state.todos.tasks;
export const selectStatus = (state: RootState) => state.todos.status;
export const selectDeletedTask = (state: RootState) => state.todos.deletedTask;
export const selectIndexOfDeleted = (state: RootState) => state.todos.indexOfDeleted
export default todosSlice.reducer;
