import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from 'zustand/middleware'
import { createSelectors } from "./selector";
import ITask from "@/shared/ITask";

interface ToDoState {
    tasks: ITask[]
    changeTitle: (id: string, title: string) => void
    addTask: (task: ITask) => void
    deleteTask: (id: string) => void
    deleteAll: () => void
    changeStatus: (id: string) => void
}

const useToDoStoreBase = create<ToDoState>()(
    persist(
        (set) => ({
            tasks: [],
            changeTitle: (id, title) => set((state) => ({tasks: [...state.tasks.map(item => item.id == id ? {...item, title: title} : item)]})),
            addTask: (task) => set((state) => ({tasks: [...state.tasks, task]})),
            deleteTask: (id) => set((state) => ({tasks: [...state.tasks.filter(item => item.id != id)]})),
            deleteAll: () => set((state) => ({tasks: [...state.tasks = []]})),
            changeStatus: (id) => set((state) => ({tasks: [...state.tasks.map(item => item.id == id ? {...item, isDone: !item.isDone } : item)]}))
        }),
        {
            name: 'todo-storage',
            storage: createJSONStorage(() => AsyncStorage)
        }
    )
)

export const useToDoStore = createSelectors(useToDoStoreBase)