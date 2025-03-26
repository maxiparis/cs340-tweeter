import { LoginRequest } from "./LoginRequest";

export interface RegisterRequest extends LoginRequest {
  //From LoginRequest:
  // readonly alias: string;
  // readonly password: string;

  readonly firstName: string;
  readonly lastName: string;
  readonly imageStringBase64: string;
  readonly imageFileExtension: string;
}
