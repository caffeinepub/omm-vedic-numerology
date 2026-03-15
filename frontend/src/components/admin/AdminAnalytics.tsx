import React from 'react';
import { Booking, ServiceType, BookingStatus } from '../../backend';

interface AdminAnalyticsProps {
  bookings: Booking[];
}

const serviceLabels: Record<string, string> = {
  [ServiceType.tarotCardReading]: 'Tarot Reading',
  [ServiceType.numerology]: 'Numerology',
  [ServiceType.vastu]: 'Vastu Shastra',
  [ServiceType.pronology]: 'Pronology',
};

const serviceEmojis: Record<string, string> = {
  [ServiceType.tarotCardReading]: '🃏',
  [ServiceType.numerology]: '🔢',
  [ServiceType.vastu]: '🏠',
  [ServiceType.pronology]: '🔤',
};

export default function AdminAnalytics({ bookings }: AdminAnalyticsProps) {
  const total = bookings.length;

  // Per-service breakdown
  const serviceCounts: Record<string, number> = {};
  Object.values(ServiceType).forEach(s => { serviceCounts[s] = 0; });
  bookings.forEach(b => {
    const key = b.serviceType as unknown as string;
    serviceCounts[key] = (serviceCounts[key] || 0) + 1;
  });

  // Status counts
  const pendingCount = bookings.filter(b => (b.status as unknown as string) === BookingStatus.pending).length;
  const confirmedCount = bookings.filter(b => (b.status as unknown as string) === BookingStatus.confirmed).length;

  // Most recent booking date
  let mostRecentDate = '';
  if (bookings.length > 0) {
    const sorted = [...bookings].sort((a, b) => {
      const da = new Date(a.preferredDate).getTime();
      const db = new Date(b.preferredDate).getTime();
      return db - da;
    });
    mostRecentDate = sorted[0].preferredDate;
  }

  const maxServiceCount = Math.max(...Object.values(serviceCounts), 1);

  return (
    <div className="mb-8 rounded-2xl border border-gold-400/20 bg-cosmic-900/60 overflow-hidden">
      <div className="px-6 py-4 border-b border-gold-400/10 bg-gradient-to-r from-cosmic-900 to-cosmic-800">
        <h2 className="font-cinzel text-lg font-bold text-gold-400">📊 Booking Analytics</h2>
      </div>

      <div className="p-6">
        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="rounded-xl border border-gold-400/20 bg-cosmic-800/50 p-4 text-center">
            <div className="text-3xl font-cinzel font-bold text-gold-400">{total}</div>
            <div className="text-cosmic-400 text-xs font-cinzel mt-1 uppercase tracking-wide">Total Bookings</div>
          </div>
          <div className="rounded-xl border border-amber-500/20 bg-cosmic-800/50 p-4 text-center">
            <div className="text-3xl font-cinzel font-bold text-amber-400">{pendingCount}</div>
            <div className="text-cosmic-400 text-xs font-cinzel mt-1 uppercase tracking-wide">Pending</div>
          </div>
          <div className="rounded-xl border border-green-500/20 bg-cosmic-800/50 p-4 text-center">
            <div className="text-3xl font-cinzel font-bold text-green-400">{confirmedCount}</div>
            <div className="text-cosmic-400 text-xs font-cinzel mt-1 uppercase tracking-wide">Confirmed</div>
          </div>
          <div className="rounded-xl border border-cosmic-600/30 bg-cosmic-800/50 p-4 text-center">
            <div className="text-sm font-cinzel font-bold text-cosmic-200 mt-1">
              {mostRecentDate || '—'}
            </div>
            <div className="text-cosmic-400 text-xs font-cinzel mt-1 uppercase tracking-wide">Latest Date</div>
          </div>
        </div>

        {/* Per-service bar chart */}
        <div>
          <h3 className="font-cinzel text-sm text-cosmic-300 uppercase tracking-widest mb-4">Service Breakdown</h3>
          <div className="space-y-3">
            {Object.entries(serviceCounts).map(([service, count]) => (
              <div key={service} className="flex items-center gap-3">
                <span className="text-lg w-6 shrink-0">{serviceEmojis[service] || '•'}</span>
                <span className="text-cosmic-300 text-sm font-cinzel w-32 shrink-0">
                  {serviceLabels[service] || service}
                </span>
                <div className="flex-1 h-5 bg-cosmic-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${total > 0 ? (count / maxServiceCount) * 100 : 0}%`,
                      background: 'linear-gradient(90deg, #d97706, #fbbf24)',
                      minWidth: count > 0 ? '8px' : '0',
                    }}
                  />
                </div>
                <span className="text-gold-400 font-cinzel font-bold text-sm w-8 text-right shrink-0">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
