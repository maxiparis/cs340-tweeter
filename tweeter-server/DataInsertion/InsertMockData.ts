import { User } from "tweeter-shared";

const MALE_IMAGE_URL: string =
  "https://faculty.cs.byu.edu/~jwilkerson/cs340/tweeter/images/donald_duck.png";
const FEMALE_IMAGE_URL: string =
  "https://faculty.cs.byu.edu/~jwilkerson/cs340/tweeter/images/daisy_duck.png";

class InsertMockData {
  static readonly allUsers: User[] = [
    new User("Allen", "Anderson", "allen", MALE_IMAGE_URL),
    new User("Amy", "Ames", "amy", FEMALE_IMAGE_URL),
    new User("Bob", "Bobson", "bob", MALE_IMAGE_URL),
    new User("Bonnie", "Beatty", "bonnie", FEMALE_IMAGE_URL),
    new User("Chris", "Colston", "chris", MALE_IMAGE_URL),
    new User("Cindy", "Coats", "cindy", FEMALE_IMAGE_URL),
    new User("Dan", "Donaldson", "dan", MALE_IMAGE_URL),
    new User("Dee", "Dempsey", "dee", FEMALE_IMAGE_URL),
    new User("Elliott", "Enderson", "elliott", MALE_IMAGE_URL),
    new User("Elizabeth", "Engle", "elizabeth", FEMALE_IMAGE_URL),
    new User("Frank", "Frandson", "frank", MALE_IMAGE_URL),
    new User("Fran", "Franklin", "fran", FEMALE_IMAGE_URL),
    new User("Gary", "Gilbert", "gary", MALE_IMAGE_URL),
    new User("Giovanna", "Giles", "giovanna", FEMALE_IMAGE_URL),
    new User("Henry", "Henderson", "henry", MALE_IMAGE_URL),
    new User("Helen", "Hopwell", "helen", FEMALE_IMAGE_URL),
    new User("Igor", "Isaacson", "igor", MALE_IMAGE_URL),
    new User("Isabel", "Isaacson", "isabel", FEMALE_IMAGE_URL),
    new User("Justin", "Jones", "justin", MALE_IMAGE_URL),
    new User("Jill", "Johnson", "jill", FEMALE_IMAGE_URL),
    new User("Kent", "Knudson", "kent", MALE_IMAGE_URL),
    new User("Kathy", "Kunzler", "kathy", FEMALE_IMAGE_URL),
  ];

  static test() {
    console.log(this.allUsers);
  }
}

InsertMockData.test();
