export default class CustomError extends Error {
  private _code: number;

  constructor(code: number, message: string) {
    super(message);
    this._code = code;
  }

  get code(): number { return this._code; }
}
