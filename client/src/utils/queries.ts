export const authorizedRequest = async (
  url: string,
  method: string,
  tokenType = 'token',
  body?: object
) => {
  const token = localStorage.getItem(tokenType);

  const request: object = body
    ? {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      }
    : {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

  if (!token || token === '') {
    return undefined;
  }
  try {
    const response = await fetch(url, request);
    if (response.status === 200 || response.status === 201) {
      return await response.json();
    }
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || 'Request failed');
  } catch (err) {
    throw new Error(String(err));
  }
};

export const unauthorizedRequest = async (url: string, method: string, body?: object) => {
  const request: object = body
    ? {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    : {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
      };

  try {
    const response = await fetch(url, request);
    if (response.status === 200 || response.status === 201) {
      return await response.json();
    }
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || 'Request failed');
  } catch (err) {
    throw new Error(String(err));
  }
};
