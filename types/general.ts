export type UUID = `${string}-${string}-${string}-${string}-${string}`;

export type APIError = {
    message: string;
}

export type APIResponse<T> = APIError | T;