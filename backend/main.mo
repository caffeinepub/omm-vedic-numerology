import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Nat "mo:core/Nat";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Map "mo:core/Map";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  type ServiceType = {
    #tarotCardReading;
    #numerology;
    #vastu;
    #pronology;
  };

  type BookingCategory = {
    #appointment;
    #homeTour;
    #nameChange;
  };

  type BookingStatus = {
    #pending;
    #confirmed;
  };

  type BookingRequest = {
    serviceType : ServiceType;
    category : BookingCategory;
    customerName : Text;
    phoneNumber : Text;
    preferredDate : Text;
    preferredTime : Text;
    message : ?Text;
  };

  type Booking = {
    id : Nat;
    serviceType : ServiceType;
    category : BookingCategory;
    customerName : Text;
    phoneNumber : Text;
    preferredDate : Text;
    preferredTime : Text;
    message : ?Text;
    status : BookingStatus;
  };

  type BookingError = {
    #invalidInput;
    #internalError;
  };

  type UserProfile = {
    name : Text;
  };

  var nextBookingId = 0;
  let bookings = Map.empty<Nat, Booking>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public shared ({ caller }) func createBooking(request : BookingRequest) : async {
    #ok : Booking;
    #err : BookingError;
  } {
    if (request.customerName.size() == 0 or request.phoneNumber.size() == 0 or request.preferredDate.size() == 0 or request.preferredTime.size() == 0) {
      return #err(#invalidInput);
    };

    let newBooking : Booking = {
      id = nextBookingId;
      serviceType = request.serviceType;
      category = request.category;
      customerName = request.customerName;
      phoneNumber = request.phoneNumber;
      preferredDate = request.preferredDate;
      preferredTime = request.preferredTime;
      message = request.message;
      status = #pending;
    };

    bookings.add(nextBookingId, newBooking);

    let bookedRecord = newBooking;
    nextBookingId += 1;
    #ok(bookedRecord);
  };

  public query ({ caller }) func getAllBookings() : async [Booking] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    let arr = bookings.values().toArray();
    arr.sort(func(b1 : Booking, b2 : Booking) : Order.Order {
      Nat.compare(b1.id, b2.id);
    });
  };

  public shared ({ caller }) func deleteAllBookings() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    bookings.clear();
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public query ({ caller }) func getTotalBookingCount() : async Nat {
    bookings.size();
  };
};
