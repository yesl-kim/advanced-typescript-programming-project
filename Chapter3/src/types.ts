import { IPersonState } from './state'

export type StringOrNull = string | null

export interface Validator<T> {
  isValid: (input: T) => boolean
}

export interface Validation {
  validate: (state: IPersonState, errors: string[]) => void
}
