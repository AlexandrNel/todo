import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
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

const apiUrl = import.meta.env.VITE_API_URL

const fetchTasks = createAsyncThunk("fetchTasks", async () => {
  const { data } = await axios.get(`${apiUrl}/tasks`);
  return data;
});
const fetchCreatedTask = createAsyncThunk(
  "fetchCreatedTask",
  async (task: Task) => {
    const { data } = await axios.post(`${apiUrl}/tasks`, task);
    return data;
  }
);
const fetchRemovedTask = createAsyncThunk(
  "fetchRemovedTask",
  async (id: TaskId) => {
    const { data } = await axios.delete(`${apiUrl}/tasks/${id}`);
    return data as Task;
  }
);
const fetchUpdatedTask = createAsyncThunk(
  "fetchUpdatedTask",
  async ({ id, task }: { id: TaskId; task: Partial<Task> }) => {
    const { data } = await axios.patch(`${apiUrl}/tasks/${id}`, task);
    return data;
  }
);
interface TasksState {
  tasks: Task[];
  isDeleted: boolean;
  deletedTask: Task | null;
  indexOfDeleted: number | null;
  status: "loading" | "success" | "error";
}

const initialState: TasksState = {
  tasks: [],
  isDeleted: false,
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
        state.isDeleted = true
      }
    },
    undoRemove: (state) => {
      if (state.deletedTask && state.indexOfDeleted || state.deletedTask && state.indexOfDeleted === 0) { state.tasks.splice(state.indexOfDeleted, 0, state.deletedTask) }
      state.deletedTask = null
      state.isDeleted = false
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
      state.isDeleted = false
      state.deletedTask = null
      state.indexOfDeleted = null
    });
    builder.addCase(fetchRemovedTask.rejected, (state) => {
      if (state.deletedTask && state.indexOfDeleted || state.deletedTask && state.indexOfDeleted === 0) { state.tasks.splice(state.indexOfDeleted, 0, state.deletedTask) }
      state.isDeleted = false
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
export const selectIsDeleted = (state: RootState) => state.todos.isDeleted
export const selectTasks = (state: RootState) => state.todos.tasks;
export const selectDeletedTask = (state: RootState) => state.todos.deletedTask;
export const selectIndexOfDeleted = (state: RootState) => state.todos.indexOfDeleted
export default todosSlice.reducer;
