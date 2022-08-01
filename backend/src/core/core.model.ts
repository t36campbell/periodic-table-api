export interface HttpRequest<T> {
    body: T,
    headers: { authorization: string }
}