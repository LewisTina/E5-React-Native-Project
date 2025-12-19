import { auth } from "./auth";

export interface ServiceParams {
  url: string;
  body?: { [key: string]: string | number | boolean | object } | FormData;
  required_auth?: boolean;
}

class Services {
  static getHeaders = async (isFiles?: boolean) => {
    const headers = new Headers();
    if (!isFiles) {
      headers.append("Content-Type", "application/json");
    }
    headers.append("Accept", "application/json");
    headers.append("Accept-Encoding", "gzip, deflate, br, zstd");
    return headers;
  };

  static getHeadersAuth = async (isFiles?: boolean) => {
    const headers = await Services.getHeaders(isFiles);
    const userToken = await auth.getTokens();
    const access_token = userToken?.accessToken;
    if (access_token === null) {
      window.location.reload();
    }
    headers.append("Authorization", `Bearer ${access_token}`);
    return headers;
  };

  static postRequest = async (data: ServiceParams, isFiles?: boolean) => {
    const { url, body, required_auth } = data;
    const head = required_auth
      ? await Services.getHeadersAuth(isFiles)
      : await Services.getHeaders(isFiles);

    const headers: RequestInit = {
      method: "POST",
      headers: head,
      mode: "cors",
      cache: "default",
      body: isFiles ? (body as FormData) : JSON.stringify(body),
    };

    const response = await fetch(url, headers)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
    return response;
  };

  static putRequest = async (data: ServiceParams) => {
    const { url, body, required_auth } = data;
    const head = required_auth
      ? await Services.getHeadersAuth()
      : await Services.getHeaders();

    const headers: RequestInit = {
      method: "PUT",
      headers: head,
      mode: "cors",
      cache: "default",
      body: JSON.stringify(body),
    };
    const response = await fetch(url, headers)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
    return response;
  };

  static patchRequest = async (data: ServiceParams) => {
    const { url, body, required_auth } = data;
    const head = required_auth
      ? await Services.getHeadersAuth()
      : await Services.getHeaders();

    const headers: RequestInit = {
      method: "PATCH",
      headers: head,
      mode: "cors",
      cache: "default",
      body: JSON.stringify(body),
    };
    const response = await fetch(url, headers)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
    return response;
  };

  static deleteRequest = async (data: ServiceParams) => {
    const { url, body, required_auth } = data;
    const head = required_auth
      ? await Services.getHeadersAuth()
      : await Services.getHeaders();

    const headers: RequestInit = {
      method: "DELETE",
      headers: head,
      mode: "cors",
      cache: "default",
      body: JSON.stringify(body),
    };
    const response = await fetch(url, headers)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
    return response;
  };

  static getRequest = async (data: ServiceParams) => {
    const { url, required_auth } = data;
    const head = required_auth
      ? await Services.getHeadersAuth()
      : await Services.getHeaders();

    const headers: RequestInit = {
      method: "GET",
      headers: head,
      mode: "cors",
      cache: "default",
    };
    const response = await fetch(url, headers)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
    return response;
  };
}

export default Services;
