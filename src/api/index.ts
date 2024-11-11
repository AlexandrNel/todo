import { Task, TaskId } from "@/redux/slices/todosSlice";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL

export const getTasks = async () => {
    const { data } = await axios.get(`${apiUrl}/tasks`);
    return data;
}
export const createTask = async (task: Task) => {
    const { data } = await axios.post(`${apiUrl}/tasks`, task);
    return data;
}

export const deleteTask = async (id: TaskId) => {
    const { data } = await axios.delete(`${apiUrl}/tasks/${id}`);
    return data as Task;
}

export const updateTask = async ({ id, task }: { id: TaskId; task: Partial<Task> }) => {
    const { data } = await axios.patch(`${apiUrl}/tasks/${id}`, task);
    return data;
}
