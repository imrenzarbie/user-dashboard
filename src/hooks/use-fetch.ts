import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

type GetError = AxiosError<unknown>;

export function useFetch<T = unknown>(
    url: string,
    options?: Omit<UseQueryOptions<T, GetError>, "queryKey" | "queryFn">
) {
    return useQuery<T, GetError>({
        queryKey: url ? ["GET", url] : ["disabled"],
        queryFn: async (): Promise<T> => {
            const { data } = await axios.get<T>(url!);
            return data;
        },
        enabled: !!url,
        staleTime: 1000 * 60,
        ...options,
    });
}
