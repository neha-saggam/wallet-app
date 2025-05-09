import { UserService } from "./UserService";
import { User } from "./models/User";
import { Wallet } from "./models/Wallet";

describe("UserService", () => {
  let service: UserService;

  beforeEach(() => {
    service = new UserService();
  });

  describe("registerUser", () => {
    it("registers a user and sets currentUser", () => {
      service.registerUser("alice");
      expect(service.currentUser?.getUsername()).toBe("alice");
      expect(service.users.length).toBe(1);
    });
  })

  describe("topUpWallet", () => {
    it("tops up wallet correctly", () => {
      service.registerUser("bob");
      service.topUpWallet(100);
      expect(service.currentUser?.getWallet().getBalance()).toBe(100);
    });
  
    it("throws error when no user is registered on top up", () => {
      expect(() => service.topUpWallet(100)).toThrow("Please register first");
    });
  
  })

  describe("transferTo", () => {
    it("transfers money between users", () => {
      service.registerUser("alice");
      service.topUpWallet(200);
  
      service.registerUser("bob");
  
      service.currentUser = service.users.find((u: User) => u.getUsername() === "alice")!;
      service.transferTo("bob", 50);
  
      const alice = service.users.find((u: User) => u.getUsername() === "alice")!;
      const bob = service.users.find((u: User) => u.getUsername() === "bob")!;
  
      expect(alice.getWallet().getBalance()).toBe(150);
      expect(bob.getWallet().getBalance()).toBe(50);
    });
  
    it("throws error on transfer to non-existing user", () => {
      service.registerUser("alice");
      expect(() => service.transferTo("nonexistent", 50)).toThrow("No such user: nonexistent");
    });
  })

  describe("checkMoneyReceivedAndSent", () => {
    it("should throw an error if no user is registered", () => {
      expect(() => service.checkMoneyReceivedAndSent()).toThrow(
        "Please register first"
      );
    });

    it("should log the wallet history of the current user", () => {
      service.registerUser("alice");
      service.topUpWallet(200);
      service.currentUser = service.users.find(
        (u: User) => u.getUsername() === "alice"
      )!;

      const consoleSpy = jest.spyOn(console, "log");
      service.checkMoneyReceivedAndSent();
      expect(consoleSpy).toHaveBeenCalledWith(service.currentUser.getWallet().getHistory());
      consoleSpy.mockRestore();
    });
  });

});
