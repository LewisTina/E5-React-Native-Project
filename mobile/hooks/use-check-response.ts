import { APIResponse } from "@/types/api";

type ResponseMessageCheck<T> = {
  title_key?: string;
  details?: string;
  action?: (d: T) => void;
};

type MutationResponsePayload<T> = {
  res: Response;
  onSuccess?: ResponseMessageCheck<T>;
  onFailed?: ResponseMessageCheck<T>;
  onError?: ResponseMessageCheck<T>;
};

const useCheckResponse = () => {
  const checkMutationResponse = async <T>(d: MutationResponsePayload<T>) => {
    const { res, onSuccess, onFailed, onError } = d;

    try {
      const data = (await res.json()) as APIResponse<T>;
      if (res.status >= 200 && res.status < 300) {
        if (onSuccess?.action) {
          onSuccess.action(data.data);
        }
      } else if (res.status >= 500) {
        if (onError?.action) {
          onError.action(data.data);
        }
      } else {
        if (onFailed?.action) {
          onFailed.action(data.data);
        }
      }

      const response = { status: res.status, data: data.data };
      return response;
    } catch (e) {
      if (onError) {
        if (onError.action) {
          onError.action({ error: e } as T);
        }
      }
      const response = { status: res.status, data: undefined };
      return response;
    }
  };

  return {
    checkMutationResponse,
  };
};

export default useCheckResponse;
