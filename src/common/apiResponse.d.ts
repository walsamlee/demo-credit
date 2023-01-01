export interface Success {
  status: boolean,
  code: string,
  message: string,
  data: object
}

export interface Failure {
  status: boolean,
  code: string,
  error: string
}