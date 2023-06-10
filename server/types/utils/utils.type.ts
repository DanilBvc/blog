export interface TypedRequestBody<T, M> extends Express.Request {
  body: T;
  params: M
  headers: {
    authorization?: string;
  };
}
