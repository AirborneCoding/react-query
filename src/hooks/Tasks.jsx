import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { customFetchTasks } from "../utils";

export const useFetchTasks = () => {
    const { isLoading, data, isError, error } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const { data } = await customFetchTasks.get('/');
            return data;
        },
    });
    return { isLoading, isError, data };
};
export const useCreateTask = () => {
    const queryClient = useQueryClient();
    const { mutate: createTask, isLoading } = useMutation({
        mutationFn: (taskTitle) => customFetchTasks.post('/', { title: taskTitle }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            toast.success('task added');
        },
        onError: (error) => {
            toast.error(error.response.data.msg);
        },
    });
    return { createTask, isLoading };
};

export const useEditTask = () => {
    const queryClient = useQueryClient();

    const { mutate: editTask } = useMutation({
        mutationFn: ({ taskId, isDone }) => {
            return customFetchTasks.patch(`/${taskId}`, { isDone });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });
    return { editTask };
};
export const useDeleteTask = () => {
    const queryClient = useQueryClient();

    const { mutate: deleteTask, isLoading: deleteTaskLoading } = useMutation({
        mutationFn: (taskId) => {
            return customFetchTasks.delete(`/${taskId}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });
    return { deleteTask, deleteTaskLoading };
};
