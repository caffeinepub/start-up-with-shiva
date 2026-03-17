import Array "mo:core/Array";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";



actor {
  public type AccountType = {
    #seller;
    #buyer;
    #investor;
    #partner;
  };

  public type UserProfile = {
    name : Text;
    phone : Text;
    email : Text;
    city : Text;
    accountType : AccountType;
  };

  public type Listing = {
    id : Nat;
    title : Text;
    description : Text;
    price : Nat;
    category : Text;
    location : Text;
    contactPhone : Text;
    owner : Principal;
  };

  public type BuyerRequest = {
    id : Nat;
    title : Text;
    description : Text;
    budget : Nat;
    category : Text;
    location : Text;
    contactPhone : Text;
    owner : Principal;
  };

  public type InvestorProfile = {
    id : Nat;
    sector : Text;
    minBudget : Nat;
    maxBudget : Nat;
    location : Text;
    description : Text;
    contactPhone : Text;
    owner : Principal;
  };

  public type PartnerOpportunity = {
    id : Nat;
    title : Text;
    description : Text;
    businessType : Text;
    investmentNeeded : Nat;
    location : Text;
    contactPhone : Text;
    owner : Principal;
  };

  public type Problem = {
    id : Nat;
    title : Text;
    description : Text;
    location : Text;
    category : Text;
    upvotes : Nat;
    owner : Principal;
  };

  public type AdminStats = {
    sellerCount : Nat;
    buyerCount : Nat;
    investorCount : Nat;
    partnerCount : Nat;
    totalProblems : Nat;
    totalListings : Nat;
    totalBuyerRequests : Nat;
    totalInvestorProfiles : Nat;
    totalPartnerOpportunities : Nat;
  };

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  var nextId = 1;
  var sellerCount = 0;
  var buyerCount = 0;
  var investorCount = 0;
  var partnerCount = 0;

  let users = Map.empty<Principal, UserProfile>();
  let listings = Map.empty<Nat, Listing>();
  let buyerRequests = Map.empty<Nat, BuyerRequest>();
  let investorProfiles = Map.empty<Nat, InvestorProfile>();
  let partnerOpportunities = Map.empty<Nat, PartnerOpportunity>();
  let problems = Map.empty<Nat, Problem>();

  public shared ({ caller }) func registerUser(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can register");
    };
    users.add(caller, profile);
    switch (profile.accountType) {
      case (#seller) { sellerCount += 1 };
      case (#buyer) { buyerCount += 1 };
      case (#investor) { investorCount += 1 };
      case (#partner) { partnerCount += 1 };
    };
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can access profiles");
    };
    users.get(caller);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    users.add(caller, profile);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    users.get(user);
  };

  public shared ({ caller }) func postListing(title : Text, description : Text, price : Nat, category : Text, location : Text, contactPhone : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can post listings");
    };
    switch (users.get(caller)) {
      case (null) { Runtime.trap("User profile not found. Please register first.") };
      case (?profile) {
        switch (profile.accountType) {
          case (#seller) {};
          case (_) { Runtime.trap("Unauthorized: Only sellers can post listings") };
        };
      };
    };
    let listing : Listing = {
      id = nextId;
      title;
      description;
      price;
      category;
      location;
      contactPhone;
      owner = caller;
    };
    listings.add(nextId, listing);
    nextId += 1;
  };

  public query ({ caller }) func getAllListings() : async [Listing] {
    listings.values().toArray();
  };

  public shared ({ caller }) func postBuyerRequest(title : Text, description : Text, budget : Nat, category : Text, location : Text, contactPhone : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can post buyer requests");
    };
    switch (users.get(caller)) {
      case (null) { Runtime.trap("User profile not found. Please register first.") };
      case (?profile) {
        switch (profile.accountType) {
          case (#buyer) {};
          case (_) { Runtime.trap("Unauthorized: Only buyers can post requests") };
        };
      };
    };
    let request : BuyerRequest = {
      id = nextId;
      title;
      description;
      budget;
      category;
      location;
      contactPhone;
      owner = caller;
    };
    buyerRequests.add(nextId, request);
    nextId += 1;
  };

  public query ({ caller }) func getAllBuyerRequests() : async [BuyerRequest] {
    buyerRequests.values().toArray();
  };

  public shared ({ caller }) func postInvestorProfile(sector : Text, minBudget : Nat, maxBudget : Nat, location : Text, description : Text, contactPhone : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can post investor profiles");
    };
    switch (users.get(caller)) {
      case (null) { Runtime.trap("User profile not found. Please register first.") };
      case (?profile) {
        switch (profile.accountType) {
          case (#investor) {};
          case (_) { Runtime.trap("Unauthorized: Only investors can post profiles") };
        };
      };
    };
    let profile : InvestorProfile = {
      id = nextId;
      sector;
      minBudget;
      maxBudget;
      location;
      description;
      contactPhone;
      owner = caller;
    };
    investorProfiles.add(nextId, profile);
    nextId += 1;
  };

  public query ({ caller }) func getAllInvestorProfiles() : async [InvestorProfile] {
    investorProfiles.values().toArray();
  };

  public shared ({ caller }) func postPartnerOpportunity(title : Text, description : Text, businessType : Text, investmentNeeded : Nat, location : Text, contactPhone : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can post partner opportunities");
    };
    switch (users.get(caller)) {
      case (null) { Runtime.trap("User profile not found. Please register first.") };
      case (?profile) {
        switch (profile.accountType) {
          case (#partner) {};
          case (_) { Runtime.trap("Unauthorized: Only partners can post opportunities") };
        };
      };
    };
    let opportunity : PartnerOpportunity = {
      id = nextId;
      title;
      description;
      businessType;
      investmentNeeded;
      location;
      contactPhone;
      owner = caller;
    };
    partnerOpportunities.add(nextId, opportunity);
    nextId += 1;
  };

  public query ({ caller }) func getAllPartnerOpportunities() : async [PartnerOpportunity] {
    partnerOpportunities.values().toArray();
  };

  public shared ({ caller }) func postProblem(title : Text, description : Text, location : Text, category : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can post problems");
    };
    let problem : Problem = {
      id = nextId;
      title;
      description;
      location;
      category;
      upvotes = 0;
      owner = caller;
    };
    problems.add(nextId, problem);
    nextId += 1;
  };

  public query ({ caller }) func getAllProblems() : async [Problem] {
    problems.values().toArray();
  };

  public shared ({ caller }) func upvoteProblem(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can upvote problems");
    };
    switch (problems.get(id)) {
      case (null) { Runtime.trap("Problem not found") };
      case (?problem) {
        let updatedProblem = { problem with upvotes = problem.upvotes + 1 };
        problems.add(id, updatedProblem);
      };
    };
  };

  public query ({ caller }) func getAdminStats() : async AdminStats {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can access statistics");
    };
    let totalProblems = problems.size();
    let totalListings = listings.size();
    let totalBuyerRequests = buyerRequests.size();
    let totalInvestorProfiles = investorProfiles.size();
    let totalPartnerOpportunities = partnerOpportunities.size();

    {
      sellerCount;
      buyerCount;
      investorCount;
      partnerCount;
      totalProblems;
      totalListings;
      totalBuyerRequests;
      totalInvestorProfiles;
      totalPartnerOpportunities;
    };
  };

  public query ({ caller }) func getAllPosts() : async {
    listings : [Listing];
    buyerRequests : [BuyerRequest];
    investorProfiles : [InvestorProfile];
    partnerOpportunities : [PartnerOpportunity];
  } {
    {
      listings = listings.values().toArray();
      buyerRequests = buyerRequests.values().toArray();
      investorProfiles = investorProfiles.values().toArray();
      partnerOpportunities = partnerOpportunities.values().toArray();
    };
  };
};
