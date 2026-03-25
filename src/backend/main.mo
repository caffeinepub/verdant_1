import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Time "mo:base/Time";
import Nat "mo:base/Nat";

actor {
  public type Review = {
    id: Nat;
    name: Text;
    email: Text;
    message: Text;
    rating: Nat;
    approved: Bool;
    timestamp: Int;
  };

  stable var reviews: [Review] = [];
  stable var nextId: Nat = 1;

  public func submitReview(name: Text, email: Text, message: Text, rating: Nat) : async Nat {
    let review: Review = {
      id = nextId;
      name = name;
      email = email;
      message = message;
      rating = if (rating > 5) 5 else rating;
      approved = false;
      timestamp = Time.now();
    };
    reviews := Array.append(reviews, [review]);
    let id = nextId;
    nextId += 1;
    id
  };

  public query func getApprovedReviews() : async [Review] {
    Array.filter(reviews, func(r: Review) : Bool { r.approved })
  };

  public query func getAllReviews() : async [Review] {
    reviews
  };

  public func approveReview(id: Nat) : async Bool {
    var found = false;
    reviews := Array.map(reviews, func(r: Review) : Review {
      if (r.id == id) {
        found := true;
        { r with approved = true }
      } else r
    });
    found
  };
};
