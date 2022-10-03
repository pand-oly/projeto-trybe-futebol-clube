export default class CustomError extends Error {
  private _code: number;

  constructor(code: number, mensage: string) {
    super(mensage);
    this._code = code;
  }

  get code(): number { return this._code; }
}
