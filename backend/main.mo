import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Nat "mo:core/Nat";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Map "mo:core/Map";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

// This backend uses the prefab authentication system. All calls to
// admin functions require an admin caller

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

  type Booking = {
    id : Nat;
    serviceType : ServiceType;
    category : BookingCategory;
    customerName : Text;
    phoneNumber : Text;
    preferredDate : Text;
    message : ?Text;
    status : BookingStatus;
  };

  type UserProfile = {
    name : Text;
  };

  var nextBookingId = 0;

  let bookings = Map.empty<Nat, Booking>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Include admin state and authenticate all calls. Remove include and
  // access control state if you want to open up some functions.
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Create a new booking - open to all callers
  public shared ({ caller }) func createBooking(
    serviceType : ServiceType,
    category : BookingCategory,
    customerName : Text,
    phoneNumber : Text,
    preferredDate : Text,
    message : ?Text
  ) : async Nat {
    let newBooking : Booking = {
      id = nextBookingId;
      serviceType;
      category;
      customerName;
      phoneNumber;
      preferredDate;
      message;
      status = #pending;
    };

    bookings.add(nextBookingId, newBooking);

    let currentId = nextBookingId;
    nextBookingId += 1;
    currentId;
  };

  // Admin-only: get all bookings
  public query ({ caller }) func getAllBookings() : async [Booking] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    let arr = bookings.values().toArray();
    arr.sort(func(b1 : Booking, b2 : Booking) : Order.Order {
      Nat.compare(b1.id, b2.id);
    });
  };
};
