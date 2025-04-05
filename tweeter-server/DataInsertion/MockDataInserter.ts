import { StatusDto, User } from "tweeter-shared";
import { FollowsDAO } from "../src/model/DAO/FollowsDAO";
import { UserDAO } from "../src/model/DAO/UserDAO";
import { AuthTokenDAO } from "../src/model/DAO/AuthTokenDAO";
import bcrypt from "bcryptjs";
import { StoryDAO } from "../src/model/DAO/StoryDAO";
import { StatusServiceBE } from "../src/model/service/StatusServiceBE";
import { DynamoFactoryDAO } from "../src/model/DAO/factory/DynamoFactoryDAO";

const MALE_IMAGE_URL: string =
  "https://faculty.cs.byu.edu/~jwilkerson/cs340/tweeter/images/donald_duck.png";
const FEMALE_IMAGE_URL: string =
  "https://faculty.cs.byu.edu/~jwilkerson/cs340/tweeter/images/daisy_duck.png";

class MockDataInserter {
  followsDao = new FollowsDAO();
  userDao = new UserDAO();
  authTokenDAO = new AuthTokenDAO();
  storyDAO = new StoryDAO();
  statusServiceBE = new StatusServiceBE(new DynamoFactoryDAO());

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

  readonly twitterPosts = [
    "Had a great workout today! Thanks for the motivation, @allen . Check out my favorite fitness blog: https://fitlife.com",
    "Just finished reading an amazing book! @amy , you need to read this one! More here: https://bookworm.com",
    "Loving the new project! Couldn’t have done it without @bob ’s support. Check out my new portfolio: https://creativeworks.com",
    "Caught up with @bonnie over coffee today! Always great conversations. Here's a fun article we discussed: https://coffeechat.com",
    "Finally trying out this new restaurant in town! @chris , let’s go next time! Review here: https://foodieadventures.com",
    "Big shoutout to @cindy for all the help on the team project! Also, check out this motivational podcast: https://teamtalk.com",
    "Excited about the weekend plans! @dan , let’s catch up soon. Here’s the event we’re attending: https://weekendvibes.com",
    "It’s always a pleasure to collaborate with @dee ! Check out the new update I worked on: https://technews.com",
    "Learning so much from @elliott . If you're into tech, check out this blog post: https://devworld.com",
    "Congrats to @elizabeth for landing that amazing opportunity! She deserves it. Read more about it here: https://careerhighlights.com",
    "Had an awesome time at the concert last night! @frank , that was epic. Review and setlist here: https://concertbuzz.com",
    "Just finished a painting I’ve been working on for weeks! @fran , I’d love your thoughts. See my work here: https://artgallery.com",
    "Spending the day outdoors. @gary , we need to do this more often. Here's a great guide to the trails we explored: https://natureexplore.com",
    "My latest project is finally live! Big thanks to @giovanna for the input. Check out the final product: https://designhub.com",
    "Feeling inspired after meeting @henry ! He’s always so insightful. See his latest work here: https://innovatorhub.com",
    "Caught up with @helen for a long walk and chat. Always so refreshing! Here's a blog post about healthy living: https://healthyhabits.com",
    "Excited about the new app update! Thanks to @igor for all the debugging help. Release notes here: https://appdev.com",
    "Just launched a new feature in our project! @isabel , your feedback was crucial. Check out the details: https://techtrends.com",
    "What an amazing day at the conference! @justin , we should definitely present next time. Here’s the agenda: https://techconference.com",
    "Had an inspiring conversation with @jill about mental health. Check out this article we talked about: https://mindmatters.com",
    "Just wrapped up a great presentation! @kent , thanks for the suggestions. Watch the recording here: https://bizinsights.com",
    "Planning my next travel destination. @kathy , what do you think of this place? Check out my travel blog: https://wanderlust.com",
    "Feeling super grateful for my team. @lisa , you’re the best! Here’s an article on team collaboration: https://worktogether.com",
    "Just finished a relaxing weekend getaway. @linda , you’d love this place! Full guide here: https://vacationvibes.com",
    "Had a productive week! @mary , you’re such an inspiration. Check out my latest productivity tips: https://worksmart.com",
    "Just got a new tech gadget. @nancy , you’ve got to check this out! Full review here: https://techreviewer.com",
    "Exploring a new hobby this month! @olivia , you’d be into this too. Here’s a tutorial: https://hobbyists.com",
    "Grateful for the feedback from @patricia on my design. Check out the project here: https://creatorshub.com",
    "Had a blast brainstorming with @peter today. Can’t wait for the next steps! Here’s our whitepaper: https://businessideas.com",
    "So proud of @rachel ’s accomplishments lately. Check out her latest article: https://thoughtleaders.com",
    "Such an interesting conversation with @rose today about life in the city! Here’s the guide we talked about: https://citylife.com",
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
      const randomNumbers = this.generateArrayOfRandomNumbers(
        followersPerUser,
        30,
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

  async insertRandomPostsForOneUser(userAlias: string, numPosts: number) {
    let userFound = this.getUserByAlias(userAlias);
    if (userFound === undefined) {
      console.log("stopping insertion of posts, user was undefined");
      return;
    }

    const randomNumbers = this.generateArrayOfRandomNumbers(
      numPosts,
      this.twitterPosts.length,
    );
    let i = 0;
    for (let number of randomNumbers) {
      await this.insertUserPost(userAlias, i, number, userFound);
    }
  }

  private async insertUserPost(
    userAlias: string,
    i: number,
    indexInTwitterPosts: number,
    userFound: User,
  ) {
    console.log(`inserting post for ${userAlias}`, i);
    let statusDto = {
      post: this.twitterPosts[indexInTwitterPosts],
      user: userFound.dto,
      timestamp: Date.now(),
    } as StatusDto;

    await this.statusServiceBE.postStatus(
      "acbafa2a-ecc9-434f-a694-ad5482103091",
      statusDto,
    );
    i++;
  }

  async insertPostsForMultipleUsersInRandomOrder(
    usersAliases: string[],
    numPosts: number,
  ) {
    let randomPostIndexes = this.generateArrayOfRandomNumbers(
      numPosts,
      this.twitterPosts.length,
    );
    let randomUsersIndexes = this.generateArrayOfRandomNumbers(
      numPosts,
      usersAliases.length,
    );
    for (let i = 0; i < numPosts; i++) {
      let userFound = this.getUserByAlias(usersAliases[randomUsersIndexes[i]]);
      if (userFound === undefined) {
        console.log("stopping insertion of posts, user was undefined");
        return;
      }

      await this.insertUserPost(
        userFound.alias,
        i,
        randomPostIndexes[i],
        userFound,
      );
    }
  }

  /**
   * Inserts a random number of posts for users who follow the specified followee.
   * Purpose: create posts for the `followeeAlias` feed page.
   * @param {string} followeeAlias - The alias of the user being followed.
   * @param {number} numPosts - The number of random posts to insert for each follower.
   * @return {Promise<void>} A promise that resolves when the posts have been inserted.
   */
  async insertRandomPostsForThoseWhoFollow(
    followeeAlias: string,
    numPosts: number,
  ) {
    let followeesAliases =
      await this.followsDao.getFolloweeAliases(followeeAlias);

    console.log(`Those that ${followeeAlias} follows to:`);
    console.table(followeesAliases);
    await this.insertPostsForMultipleUsersInRandomOrder(
      followeesAliases,
      numPosts,
    );
  }

  // ------------------------------------------
  // ---------------- Helpers -----------------

  getUserByAlias(alias: string): User | undefined {
    return this.allUsers.find((user) => user.alias === alias);
  }

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

  private generateArrayOfRandomNumbers(
    count: number,
    topLimit: number,
  ): number[] {
    const randomNumbers: number[] = Array.from({ length: count }, () =>
      Math.floor(Math.random() * topLimit),
    );
    return randomNumbers;
  }
}

// ------------------------------------------
// ---------------- Run ---------------------

// new MockDataInserter().insertUsers();
// new MockDataInserter().insertFollows(20);
// try {
//   new MockDataInserter()
//     .insertRandomPostsForThoseWhoFollow("frank", 30)
//     .then(() => {
//       console.log("done");
//       process.exit(0);
//     });
// } catch (e) {
//   console.log(e);
// }
