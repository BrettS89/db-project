interface ErrorInput {
  message?: string,
  code?: number,
}

export default class Err extends Error {
  code?: number;

  constructor(input: ErrorInput) {
    super(input.message);

    this.code = input.code;
  }
}
