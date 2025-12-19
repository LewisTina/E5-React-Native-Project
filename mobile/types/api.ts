export type APIResponse<T> = {
  status_code: number;
  data: T;
  description: string;
  message: string;
};
