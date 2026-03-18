import { useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  Bell,
  Loader2,
  LogIn,
  LogOut,
  MessageCircle,
  RefreshCw,
  ShieldAlert,
  Star,
  Trash2,
} from "lucide-react";
import React, { useState } from "react";
import { BookingStatus } from "../backend";
import AdminAnalytics from "../components/admin/AdminAnalytics";
import BookingsTable from "../components/admin/BookingsTable";
import FloatingWhatsAppButton from "../components/layout/FloatingWhatsAppButton";
import {
  useDeleteAllBookings,
  useGetAllBookings,
  useIsCallerAdmin,
} from "../hooks/useAdminQueries";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

const ADMIN_WHATSAPP_NUMBER = "918689838590";

function buildPendingWhatsAppLink(pendingCount: number) {
  const text = `🔔 *Omm Vedic Numerloggy — Pending Bookings Alert*\n\nYou have *${pendingCount} pending booking${pendingCount !== 1 ? "s" : ""}* awaiting your review.\n\nPlease log in to the admin dashboard to confirm them.`;
  return `https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export default function AdminPage() {
  const { login, clear, loginStatus, identity, isInitializing } =
    useInternetIdentity();
  const queryClient = useQueryClient();
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === "logging-in";

  const { data: isAdmin, isLoading: adminCheckLoading } = useIsCallerAdmin();

  const {
    data: bookings,
    isLoading: bookingsLoading,
    refetch: refetchBookings,
    isRefetching,
  } = useGetAllBookings(!!isAdmin);

  const deleteAllBookings = useDeleteAllBookings();

  const handleLogin = async () => {
    try {
      await login();
    } catch (error: unknown) {
      if (
        error instanceof Error &&
        error.message === "User is already authenticated"
      ) {
        await clear();
        setTimeout(() => login(), 300);
      }
    }
  };

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
  };

  const handleDeleteAll = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete ALL bookings? This cannot be undone.",
    );
    if (!confirmed) return;

    try {
      setDeleteSuccess(false);
      await deleteAllBookings.mutateAsync();
      setDeleteSuccess(true);
      setTimeout(() => setDeleteSuccess(false), 5000);
    } catch {
      // Error handled via deleteAllBookings.isError
    }
  };

  const pendingBookings =
    bookings?.filter(
      (b) => (b.status as unknown as string) === BookingStatus.pending,
    ) ?? [];
  const pendingCount = pendingBookings.length;

  return (
    <div className="min-h-screen bg-cosmic-950 flex flex-col">
      <header className="bg-cosmic-950/90 backdrop-blur-md border-b border-gold-400/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="flex items-center gap-1">
                <Star
                  className="w-4 h-4 text-gold-400 animate-twinkle"
                  fill="currentColor"
                />
                <Star
                  className="w-5 h-5 text-gold-400 animate-twinkle"
                  fill="currentColor"
                  style={{ animationDelay: "0.5s" }}
                />
                <Star
                  className="w-4 h-4 text-gold-400 animate-twinkle"
                  fill="currentColor"
                  style={{ animationDelay: "1s" }}
                />
              </div>
              <div className="ml-1">
                <span className="font-cinzel text-sm md:text-base font-bold text-gold-300 tracking-widest uppercase leading-none block">
                  Omm Vedic
                </span>
                <span className="font-cinzel text-xs md:text-sm font-medium text-gold-500 tracking-[0.2em] uppercase leading-none block">
                  Admin Panel
                </span>
              </div>
            </Link>

            <div className="flex items-center gap-3">
              {isAuthenticated && (
                <span className="hidden sm:block font-inter text-xs text-cosmic-400 truncate max-w-[160px]">
                  {identity?.getPrincipal().toString().slice(0, 12)}…
                </span>
              )}
              {isAuthenticated ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 font-cinzel text-xs tracking-wider text-cosmic-300 hover:text-gold-400 border border-gold-400/20 hover:border-gold-400/50 rounded transition-all"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Logout
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleLogin}
                  disabled={isLoggingIn || isInitializing}
                  className="flex items-center gap-2 px-4 py-2 text-xs rounded disabled:opacity-50 bg-gradient-to-r from-gold-500 to-gold-600 text-cosmic-950 font-cinzel font-bold"
                >
                  {isLoggingIn ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <LogIn className="w-3.5 h-3.5" />
                  )}
                  {isLoggingIn ? "Logging in…" : "Login"}
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <p className="font-cinzel text-xs tracking-[0.4em] text-gold-500 uppercase mb-3">
            ✦ Sacred Administration ✦
          </p>
          <h1 className="font-cinzel font-black text-3xl md:text-4xl text-white tracking-wide">
            Booking <span className="text-gold-400">Dashboard</span>
          </h1>
          <div className="w-40 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mt-5" />
        </div>

        {isInitializing ? (
          <LoadingState message="Initializing…" />
        ) : !isAuthenticated ? (
          <NotAuthenticatedState
            onLogin={handleLogin}
            isLoggingIn={isLoggingIn}
          />
        ) : adminCheckLoading ? (
          <LoadingState message="Verifying admin access…" />
        ) : !isAdmin ? (
          <AccessDeniedState />
        ) : bookingsLoading ? (
          <LoadingState message="Loading bookings…" />
        ) : (
          <div>
            <AdminAnalytics bookings={bookings ?? []} />

            {pendingCount > 0 && (
              <div className="mb-6 bg-gold-400/10 border border-gold-400/40 rounded-xl px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold-400/15 border border-gold-400/40 flex items-center justify-center shrink-0">
                    <Bell className="w-5 h-5 text-gold-400" />
                  </div>
                  <div>
                    <p className="font-cinzel text-sm font-bold text-gold-400 tracking-wide">
                      {pendingCount} Pending Booking
                      {pendingCount !== 1 ? "s" : ""} Awaiting Review
                    </p>
                    <p className="font-inter text-xs text-cosmic-400 mt-0.5">
                      {pendingCount === 1
                        ? "A new booking is waiting for your confirmation."
                        : `${pendingCount} new bookings are waiting for your confirmation.`}
                    </p>
                  </div>
                </div>
                <a
                  href={buildPendingWhatsAppLink(pendingCount)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 font-cinzel text-xs tracking-wider text-gold-400 border border-gold-400/40 hover:border-gold-400 hover:bg-gold-400/10 rounded transition-all whitespace-nowrap"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Send WhatsApp Reminder
                </a>
              </div>
            )}

            {pendingCount === 0 && bookings && bookings.length > 0 && (
              <div className="mb-6 bg-green-500/10 border border-green-500/30 rounded-xl px-5 py-3 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-400 shrink-0" />
                <p className="font-inter text-sm text-green-400/90">
                  All bookings have been confirmed. No pending items.
                </p>
              </div>
            )}

            {deleteSuccess && (
              <div className="mb-6 bg-emerald-500/10 border border-emerald-500/30 rounded-xl px-5 py-3 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                <p className="font-inter text-sm text-emerald-400/90">
                  All bookings have been deleted.
                </p>
              </div>
            )}

            {deleteAllBookings.isError && (
              <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-xl px-5 py-3 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-red-400 shrink-0" />
                <p className="font-inter text-sm text-red-400/90">
                  Failed to delete bookings. Please try again.
                </p>
              </div>
            )}

            <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
              <p className="font-cormorant text-lg text-cosmic-300 italic">
                {bookings?.length ?? 0} booking
                {bookings?.length !== 1 ? "s" : ""} found
              </p>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => refetchBookings()}
                  disabled={isRefetching}
                  className="flex items-center gap-2 px-4 py-2 font-cinzel text-xs tracking-wider text-gold-400 border border-gold-400/30 hover:border-gold-400/60 rounded transition-all disabled:opacity-50"
                >
                  <RefreshCw
                    className={`w-3.5 h-3.5 ${isRefetching ? "animate-spin" : ""}`}
                  />
                  Refresh
                </button>
                {bookings && bookings.length > 0 && (
                  <button
                    type="button"
                    onClick={handleDeleteAll}
                    disabled={deleteAllBookings.isPending}
                    className="flex items-center gap-2 px-4 py-2 font-cinzel text-xs tracking-wider text-red-400 border border-red-400/30 hover:border-red-400/60 hover:bg-red-400/10 rounded transition-all disabled:opacity-50"
                  >
                    {deleteAllBookings.isPending ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="w-3.5 h-3.5" />
                    )}
                    {deleteAllBookings.isPending
                      ? "Deleting…"
                      : "Delete All Bookings"}
                  </button>
                )}
              </div>
            </div>

            <BookingsTable bookings={bookings ?? []} />
          </div>
        )}
      </main>

      <footer className="border-t border-gold-400/10 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-inter text-xs text-cosmic-600">
            © {new Date().getFullYear()} Omm Vedic Numerloggy. All rights
            reserved.
          </p>
          <p className="font-inter text-xs text-cosmic-600 flex items-center gap-1">
            Built with <span className="text-gold-600">♥</span> using{" "}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "omm-vedic-numerology")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-500 hover:text-gold-400 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>

      <FloatingWhatsAppButton />
    </div>
  );
}

function LoadingState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <Loader2 className="w-8 h-8 text-gold-400 animate-spin" />
      <p className="font-cormorant text-lg text-cosmic-400 italic">{message}</p>
    </div>
  );
}

function NotAuthenticatedState({
  onLogin,
  isLoggingIn,
}: { onLogin: () => void; isLoggingIn: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-6">
      <div className="rounded-xl p-10 max-w-md w-full text-center border border-gold-400/20 bg-cosmic-900/60 shadow-gold">
        <div className="w-16 h-16 rounded-full border border-gold-400/30 flex items-center justify-center mx-auto mb-6 bg-gold-400/5">
          <LogIn className="w-7 h-7 text-gold-400" />
        </div>
        <h2 className="font-cinzel text-xl font-bold text-white mb-3 tracking-wide">
          Admin Access Required
        </h2>
        <p className="font-cormorant text-base text-cosmic-300 italic mb-8">
          Please login with your identity to access the admin dashboard.
        </p>
        <button
          type="button"
          onClick={onLogin}
          disabled={isLoggingIn}
          className="w-full py-3 rounded font-cinzel text-sm tracking-wider disabled:opacity-50 flex items-center justify-center gap-2 bg-gradient-to-r from-gold-500 to-gold-600 text-cosmic-950 font-bold"
        >
          {isLoggingIn ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <LogIn className="w-4 h-4" />
          )}
          {isLoggingIn ? "Logging in…" : "Login to Admin Panel"}
        </button>
      </div>
    </div>
  );
}

function AccessDeniedState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-6">
      <div className="rounded-xl p-10 max-w-md w-full text-center border border-cosmic-700/30 bg-cosmic-900/60">
        <div className="w-16 h-16 rounded-full border border-red-400/30 flex items-center justify-center mx-auto mb-6 bg-red-400/5">
          <ShieldAlert className="w-7 h-7 text-red-400" />
        </div>
        <h2 className="font-cinzel text-xl font-bold text-white mb-3 tracking-wide">
          Access Denied
        </h2>
        <p className="font-cormorant text-base text-cosmic-300 italic mb-6">
          Your identity does not have admin privileges.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-cinzel text-sm text-gold-500 hover:text-gold-400 transition-colors"
        >
          ← Return to Homepage
        </Link>
      </div>
    </div>
  );
}
