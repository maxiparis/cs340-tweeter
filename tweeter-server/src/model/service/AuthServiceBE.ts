import { IAuthTokenDAO } from "../DAO/AuthTokenDAO";
import { IFactoryDAO } from "../DAO/factory/IFactoryDAO";

//
// The AuthServiceBE class serves as a backend service responsible for handling authentication-related logic.
// It utilizes a data access object (DAO) to interact with the underlying data layer for validating authentication tokens.
// Key functionalities of this class include:
// - Dependency injection of an IAuthTokenDAO via a factory (IFactoryDAO) to decouple implementation details.
// - Providing a method `validateToken` to verify the validity of a given authentication token
//   and ensure that it maps to a valid user. If the token is invalid, it throws an error.
export class AuthServiceBE {
  protected authtokenDAO: IAuthTokenDAO;

  constructor(factoryDAO: IFactoryDAO) {
    this.authtokenDAO = factoryDAO.getAuthTokenDAO();
  }

  async validateToken(authToken: string): Promise<string> {
    let userValidated = await this.authtokenDAO.validToken(authToken);
    if (userValidated == null) {
      throw new Error("Invalid token");
    }
    return userValidated;
  }
}
