import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useIsCallerAdmin, useGetAllBookings } from '../hooks/useAdminQueries';
import { useQueryClient } from '@tanstack/react-query';
import { Star, LogIn, LogOut, ShieldAlert, Loader2, RefreshCw, Bell, MessageCircle } from 'lucide-react';
import BookingsTable from '../components/admin/BookingsTable';
import { Link } from '@tanstack/react-router';
import { BookingStatus } from '../backend';

// Admin WhatsApp number in international format (country code + number, no + or spaces)
const ADMIN_WHATSAPP_NUMBER = '918689838590';

function buildPendingWhatsAppLink(pendingCount: number) {
  const text = `🔔 *Omm Vedic Numerology — Pending Bookings Alert*\n\nYou have *${pendingCount} pending booking${pendingCount !== 1 ? 's' : ''}* awaiting your review.\n\nPlease log in to the admin dashboard to confirm them.`;
  return `https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export default function AdminPage() {
  const { login, clear, loginStatus, identity, isInitializing } = useInternetIdentity();
  const queryClient = useQueryClient();

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  const {
    data: isAdmin,
    isLoading: adminCheckLoading,
  } = useIsCallerAdmin();

  const {
    data: bookings,
    isLoading: bookingsLoading,
    refetch: refetchBookings,
    isRefetching,
  } = useGetAllBookings(!!isAdmin);

  const handleLogin = async () => {
    try {
      await login();
    } catch (error: any) {
      if (error.message === 'User is already authenticated') {
        await clear();
        setTimeout(() => login(), 300);
      }
    }
  };

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
  };

  const pendingBookings = bookings?.filter(b => b.status === BookingStatus.pending) ?? [];
  const pendingCount = pendingBookings.length;

  return (
    <div className="min-h-screen bg-cosmic-deep flex flex-col">
      {/* Header */}
      <header className="bg-cosmic-deep/90 backdrop-blur-md border-b border-gold/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-gold animate-twinkle" fill="currentColor" />
                <Star className="w-5 h-5 text-gold animate-twinkle [animation-delay:0.5s]" fill="currentColor" />
                <Star className="w-4 h-4 text-gold animate-twinkle [animation-delay:1s]" fill="currentColor" />
              </div>
              <div className="ml-1">
                <span className="font-cinzel text-sm md:text-base font-bold text-gold-light tracking-widest uppercase leading-none block">
                  Omm Vedic
                </span>
                <span className="font-cinzel text-xs md:text-sm font-medium text-gold/80 tracking-[0.2em] uppercase leading-none block">
                  Admin Panel
                </span>
              </div>
            </Link>

            <div className="flex items-center gap-3">
              {isAuthenticated && (
                <span className="hidden sm:block font-inter text-xs text-foreground/40 truncate max-w-[160px]">
                  {identity?.getPrincipal().toString().slice(0, 12)}…
                </span>
              )}
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 font-cinzel text-xs tracking-wider text-foreground/70 hover:text-gold border border-gold/20 hover:border-gold/50 rounded transition-all"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Logout
                </button>
              ) : (
                <button
                  onClick={handleLogin}
                  disabled={isLoggingIn || isInitializing}
                  className="flex items-center gap-2 btn-gold px-4 py-2 text-xs rounded disabled:opacity-50"
                >
                  {isLoggingIn ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <LogIn className="w-3.5 h-3.5" />
                  )}
                  {isLoggingIn ? 'Logging in…' : 'Login'}
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Title */}
        <div className="text-center mb-10">
          <p className="font-cinzel text-xs tracking-[0.4em] text-gold/60 uppercase mb-3">
            ✦ Sacred Administration ✦
          </p>
          <h1 className="font-cinzel font-black text-3xl md:text-4xl text-foreground tracking-wide">
            Booking <span className="gold-text-gradient">Dashboard</span>
          </h1>
          <div className="divider-gold w-40 mx-auto mt-5" />
        </div>

        {/* States */}
        {isInitializing ? (
          <LoadingState message="Initializing…" />
        ) : !isAuthenticated ? (
          <NotAuthenticatedState onLogin={handleLogin} isLoggingIn={isLoggingIn} />
        ) : adminCheckLoading ? (
          <LoadingState message="Verifying admin access…" />
        ) : !isAdmin ? (
          <AccessDeniedState />
        ) : bookingsLoading ? (
          <LoadingState message="Loading bookings…" />
        ) : (
          <div>
            {/* Pending Bookings Banner */}
            {pendingCount > 0 && (
              <div className="mb-6 bg-gold/10 border border-gold/40 rounded-xl px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center flex-shrink-0">
                    <Bell className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="font-cinzel text-sm font-bold text-gold tracking-wide">
                      {pendingCount} Pending Booking{pendingCount !== 1 ? 's' : ''} Awaiting Review
                    </p>
                    <p className="font-inter text-xs text-foreground/55 mt-0.5">
                      {pendingCount === 1
                        ? 'A new booking is waiting for your confirmation.'
                        : `${pendingCount} new bookings are waiting for your confirmation.`}
                    </p>
                  </div>
                </div>
                <a
                  href={buildPendingWhatsAppLink(pendingCount)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 font-cinzel text-xs tracking-wider text-gold border border-gold/40 hover:border-gold hover:bg-gold/10 rounded transition-all whitespace-nowrap"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Send WhatsApp Reminder
                </a>
              </div>
            )}

            {pendingCount === 0 && bookings && bookings.length > 0 && (
              <div className="mb-6 bg-green-500/10 border border-green-500/30 rounded-xl px-5 py-3 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
                <p className="font-inter text-sm text-green-400/90">
                  All bookings have been confirmed. No pending items.
                </p>
              </div>
            )}

            <div className="flex items-center justify-between mb-6">
              <p className="font-cormorant text-lg text-foreground/60 italic">
                {bookings?.length ?? 0} booking{bookings?.length !== 1 ? 's' : ''} found
              </p>
              <button
                onClick={() => refetchBookings()}
                disabled={isRefetching}
                className="flex items-center gap-2 px-4 py-2 font-cinzel text-xs tracking-wider text-gold border border-gold/30 hover:border-gold/60 rounded transition-all disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRefetching ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
            <BookingsTable bookings={bookings ?? []} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gold/15 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-inter text-xs text-foreground/30">
            © {new Date().getFullYear()} Omm Vedic Numerology. All rights reserved.
          </p>
          <p className="font-inter text-xs text-foreground/30 flex items-center gap-1">
            Built with{' '}
            <Star className="w-3 h-3 text-gold inline" fill="currentColor" />{' '}
            using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'omm-vedic-numerology')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold/60 hover:text-gold transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

function LoadingState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <Loader2 className="w-8 h-8 text-gold animate-spin" />
      <p className="font-cormorant text-lg text-foreground/50 italic">{message}</p>
    </div>
  );
}

function NotAuthenticatedState({ onLogin, isLoggingIn }: { onLogin: () => void; isLoggingIn: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-6">
      <div className="card-cosmic rounded-xl p-10 max-w-md w-full text-center cosmic-glow">
        <div className="w-16 h-16 rounded-full border border-gold/30 flex items-center justify-center mx-auto mb-6 bg-gold/5">
          <LogIn className="w-7 h-7 text-gold" />
        </div>
        <h2 className="font-cinzel text-xl font-bold text-foreground mb-3 tracking-wide">
          Admin Access Required
        </h2>
        <p className="font-cormorant text-base text-foreground/60 italic mb-8">
          Please login with your identity to access the admin dashboard.
        </p>
        <button
          onClick={onLogin}
          disabled={isLoggingIn}
          className="btn-gold w-full py-3 rounded font-cinzel text-sm tracking-wider disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isLoggingIn ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <LogIn className="w-4 h-4" />
          )}
          {isLoggingIn ? 'Logging in…' : 'Login to Admin Panel'}
        </button>
      </div>
    </div>
  );
}

function AccessDeniedState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-6">
      <div className="card-cosmic rounded-xl p-10 max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-full border border-destructive/30 flex items-center justify-center mx-auto mb-6 bg-destructive/5">
          <ShieldAlert className="w-7 h-7 text-destructive" />
        </div>
        <h2 className="font-cinzel text-xl font-bold text-foreground mb-3 tracking-wide">
          Access Denied
        </h2>
        <p className="font-cormorant text-base text-foreground/60 italic">
          You do not have admin privileges to access this dashboard.
        </p>
      </div>
    </div>
  );
}
