import Set "mo:core/Set";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Map "mo:core/Map";
import Text "mo:core/Text";

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

  module Booking {
    public func compare(b1 : Booking, b2 : Booking) : Order.Order {
      Nat.compare(b1.id, b2.id);
    };
  };

  var nextBookingId = 0;

  let bookings = Map.empty<Nat, Booking>();

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

  public query ({ caller }) func getAllBookings() : async [Booking] {
    bookings.values().toArray().sort();
  };
};
