import { User } from "tweeter-shared";
import { FollowsDAO } from "../src/model/DAO/FollowsDAO";
import { UserDAO } from "../src/model/DAO/UserDAO";
import { AuthTokenDAO } from "../src/model/DAO/AuthTokenDAO";
import bcrypt from "bcryptjs";

const MALE_IMAGE_URL: string =
  "https://faculty.cs.byu.edu/~jwilkerson/cs340/tweeter/images/donald_duck.png";
const FEMALE_IMAGE_URL: string =
  "https://faculty.cs.byu.edu/~jwilkerson/cs340/tweeter/images/daisy_duck.png";

class MockDataInserter {
  followsDao = new FollowsDAO();
  userDao = new UserDAO();
  authTokenDAO = new AuthTokenDAO();

  constructor() {}

  readonly allUsers: User[] = [
    new User("Allen", "Anderson", "allen", this.generateImageURL()),
    new User("Amy", "Ames", "amy", this.generateImageURL()),
    new User("Bob", "Bobson", "bob", this.generateImageURL()),
    new User("Bonnie", "Beatty", "bonnie", this.generateImageURL()),
    new User("Chris", "Colston", "chris", this.generateImageURL()),
    new User("Cindy", "Coats", "cindy", this.generateImageURL()),
    new User("Dan", "Donaldson", "dan", this.generateImageURL()),
    new User("Dee", "Dempsey", "dee", this.generateImageURL()),
    new User("Elliott", "Enderson", "elliott", this.generateImageURL()),
    new User("Elizabeth", "Engle", "elizabeth", this.generateImageURL()),
    new User("Frank", "Frandson", "frank", this.generateImageURL()),
    new User("Fran", "Franklin", "fran", this.generateImageURL()),
    new User("Gary", "Gilbert", "gary", this.generateImageURL()),
    new User("Giovanna", "Giles", "giovanna", this.generateImageURL()),
    new User("Henry", "Henderson", "henry", this.generateImageURL()),
    new User("Helen", "Hopwell", "helen", this.generateImageURL()),
    new User("Igor", "Isaacson", "igor", this.generateImageURL()),
    new User("Isabel", "Isaacson", "isabel", this.generateImageURL()),
    new User("Justin", "Jones", "justin", this.generateImageURL()),
    new User("Jill", "Johnson", "jill", this.generateImageURL()),
    new User("Kent", "Knudson", "kent", this.generateImageURL()),
    new User("Kathy", "Kunzler", "kathy", this.generateImageURL()),
    new User("Lisa", "Lee", "lisa", this.generateImageURL()),
    new User("Linda", "Lindsay", "linda", this.generateImageURL()),
    new User("Mary", "Mason", "mary", this.generateImageURL()),
    new User("Nancy", "Nelson", "nancy", this.generateImageURL()),
    new User("Olivia", "Oliver", "olivia", this.generateImageURL()),
    new User("Patricia", "Patterson", "patricia", this.generateImageURL()),
    new User("Peter", "Peterson", "peter", this.generateImageURL()),
    new User("Rachel", "Rosen", "rachel", this.generateImageURL()),
    new User("Rose", "Rosen", "rose", this.generateImageURL()),
  ];

  // -----------------------------------------------
  // ---------------- Data Inserters ----------------

  async insertUsers() {
    let password = "a"; //all users will have password "a"
    let hashedPassword = await this.hashPassword(password);

    for (let user of this.allUsers) {
      console.log("inserting ", user.alias);
      await this.userDao.insertNewUser(user.dto, hashedPassword);
    }
  }

  async insertFollows(followersPerUser: number) {
    for (let user of this.allUsers) {
      const randomNumbers: number[] = Array.from(
        { length: followersPerUser },
        () => Math.floor(Math.random() * 30),
      );
      for (let number of randomNumbers) {
        if (user.alias !== this.allUsers[number].alias) {
          console.log(
            "following ",
            user.alias,
            " with ",
            this.allUsers[number].alias,
          );
          await this.followsDao.follow(user.dto, this.allUsers[number].dto);
        } else {
          console.log(
            "skipping ",
            user.alias,
            " with ",
            this.allUsers[number].alias,
          );
        }
      }
    }
  }

  // ------------------------------------------
  // ---------------- Helpers -----------------

  private generateSixDigitHash(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  private async hashPassword(plainTextPassword: string): Promise<string> {
    const saltRounds = 3;
    return await bcrypt.hash(plainTextPassword, saltRounds);
  }

  generateImageURL(): string {
    let hash = this.generateSixDigitHash();
    return `https://dummyjson.com/icon/${hash}/300`;
  }
}

// ------------------------------------------
// ---------------- Run ---------------------

// new MockDataInserter().insertUsers();
new MockDataInserter().insertFollows(20);
