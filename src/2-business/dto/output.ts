export interface Output<T> {
    status?: 'success' | 'fail' | 'error',
    message?: string
    code?: string
    httpCode?: number
    data?: T
}