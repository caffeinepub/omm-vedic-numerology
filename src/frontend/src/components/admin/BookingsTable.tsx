import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CalendarDays, Clock, MessageSquare, Phone, User } from "lucide-react";
import type { Booking } from "../../backend";
import { BookingCategory, BookingStatus, ServiceType } from "../../backend";

interface BookingsTableProps {
  bookings: Booking[];
}

function formatServiceType(type: ServiceType): string {
  const map: Record<ServiceType, string> = {
    [ServiceType.tarotCardReading]: "Tarot Card Reading",
    [ServiceType.numerology]: "Numerology",
    [ServiceType.vastu]: "Vastu Shastra",
    [ServiceType.pronology]: "Pronology",
  };
  return map[type] ?? String(type);
}

function formatCategory(cat: BookingCategory): string {
  const map: Record<BookingCategory, string> = {
    [BookingCategory.appointment]: "Appointment",
    [BookingCategory.homeTour]: "Home Tour",
    [BookingCategory.nameChange]: "Name Change",
  };
  return map[cat] ?? String(cat);
}

export default function BookingsTable({ bookings }: BookingsTableProps) {
  if (bookings.length === 0) {
    return (
      <div className="card-cosmic rounded-xl p-16 text-center">
        <p className="font-cinzel text-sm tracking-widest text-gold/40 uppercase mb-2">
          No Bookings Yet
        </p>
        <p className="font-cormorant text-base text-foreground/40 italic">
          When visitors submit bookings, they will appear here.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block card-cosmic rounded-xl overflow-hidden">
        <ScrollArea className="w-full">
          <Table>
            <TableHeader>
              <TableRow className="border-gold/20 hover:bg-transparent">
                <TableHead className="font-cinzel text-xs tracking-widest text-gold/70 uppercase w-20">
                  Booking ID
                </TableHead>
                <TableHead className="font-cinzel text-xs tracking-widest text-gold/70 uppercase">
                  Name
                </TableHead>
                <TableHead className="font-cinzel text-xs tracking-widest text-gold/70 uppercase">
                  Phone
                </TableHead>
                <TableHead className="font-cinzel text-xs tracking-widest text-gold/70 uppercase">
                  Service
                </TableHead>
                <TableHead className="font-cinzel text-xs tracking-widest text-gold/70 uppercase">
                  Category
                </TableHead>
                <TableHead className="font-cinzel text-xs tracking-widest text-gold/70 uppercase">
                  Date
                </TableHead>
                <TableHead className="font-cinzel text-xs tracking-widest text-gold/70 uppercase">
                  Time
                </TableHead>
                <TableHead className="font-cinzel text-xs tracking-widest text-gold/70 uppercase">
                  Message
                </TableHead>
                <TableHead className="font-cinzel text-xs tracking-widest text-gold/70 uppercase">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow
                  key={String(booking.id)}
                  className="border-gold/10 hover:bg-gold/5 transition-colors"
                >
                  <TableCell className="font-cinzel text-xs text-gold font-bold">
                    #{String(booking.id)}
                  </TableCell>
                  <TableCell className="font-inter text-sm text-foreground/80 font-medium">
                    {booking.customerName}
                  </TableCell>
                  <TableCell className="font-inter text-sm text-foreground/70">
                    {booking.phoneNumber}
                  </TableCell>
                  <TableCell className="font-inter text-sm text-foreground/80">
                    {formatServiceType(booking.serviceType)}
                  </TableCell>
                  <TableCell className="font-inter text-sm text-foreground/70">
                    {formatCategory(booking.category)}
                  </TableCell>
                  <TableCell className="font-inter text-sm text-foreground/70">
                    {booking.preferredDate}
                  </TableCell>
                  <TableCell className="font-inter text-sm text-foreground/70">
                    {booking.preferredTime || (
                      <span className="text-foreground/30 italic">
                        Not specified
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="font-inter text-sm text-foreground/60 max-w-[180px] truncate">
                    {booking.message ?? (
                      <span className="text-foreground/30 italic">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={booking.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {bookings.map((booking) => (
          <div
            key={String(booking.id)}
            className="card-cosmic rounded-xl p-5 space-y-3"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="font-cinzel text-sm text-gold font-bold tracking-wider">
                  Booking #{String(booking.id)}
                </span>
                <p className="font-inter text-xs text-foreground/40 mt-0.5">
                  via Website
                </p>
              </div>
              <StatusBadge status={booking.status} />
            </div>
            <div className="divider-gold" />
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <User className="w-3.5 h-3.5 text-gold/50 mt-0.5 shrink-0" />
                <div>
                  <p className="font-inter text-sm text-foreground/80 font-medium">
                    {booking.customerName}
                  </p>
                  <p className="font-inter text-xs text-foreground/50">
                    {formatServiceType(booking.serviceType)} ·{" "}
                    {formatCategory(booking.category)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gold/50 shrink-0" />
                <p className="font-inter text-sm text-foreground/70">
                  {booking.phoneNumber}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays className="w-3.5 h-3.5 text-gold/50 shrink-0" />
                <p className="font-inter text-sm text-foreground/70">
                  {booking.preferredDate}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-gold/50 shrink-0" />
                <p className="font-inter text-sm text-foreground/70">
                  {booking.preferredTime || (
                    <span className="text-foreground/30 italic">
                      Time not specified
                    </span>
                  )}
                </p>
              </div>
              {booking.message && (
                <div className="flex items-start gap-2">
                  <MessageSquare className="w-3.5 h-3.5 text-gold/50 mt-0.5 shrink-0" />
                  <p className="font-inter text-sm text-foreground/60 italic">
                    {booking.message}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function StatusBadge({ status }: { status: BookingStatus }) {
  if (status === BookingStatus.confirmed) {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-cinzel tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
        ✦ Confirmed
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-cinzel tracking-wider bg-gold/10 text-gold border border-gold/20">
      ◌ Pending
    </span>
  );
}
