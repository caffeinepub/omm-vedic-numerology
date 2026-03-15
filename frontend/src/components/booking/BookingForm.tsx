import React, { useState, useEffect } from 'react';
import { useCreateBooking } from '../../hooks/useQueries';
import { BookingCategory, ServiceType } from '../../backend';

interface BookingFormProps {
  preSelectedService?: ServiceType | null;
}

const serviceOptions = [
  { value: ServiceType.tarotCardReading, label: '🃏 Tarot Card Reading' },
  { value: ServiceType.numerology, label: '🔢 Numerology' },
  { value: ServiceType.vastu, label: '🏠 Vastu Shastra' },
  { value: ServiceType.pronology, label: '🔤 Pronology' },
];

const categoryOptions = [
  { value: BookingCategory.appointment, label: '📅 Appointment' },
  { value: BookingCategory.homeTour, label: '🏠 Home Tour' },
  { value: BookingCategory.nameChange, label: '✍️ Name Change Consultation' },
];

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM',
];

const stepLabels = ['Service Selection', 'Personal Details', 'Schedule & Confirm'];

export default function BookingForm({ preSelectedService }: BookingFormProps) {
  const [step, setStep] = useState(1);
  const [serviceType, setServiceType] = useState<ServiceType>(ServiceType.numerology);
  const [category, setCategory] = useState<BookingCategory>(BookingCategory.appointment);
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [message, setMessage] = useState('');
  const [stepErrors, setStepErrors] = useState<string>('');
  const [notificationStatus, setNotificationStatus] = useState<'idle' | 'notified' | 'blocked'>('idle');

  const createBooking = useCreateBooking();

  useEffect(() => {
    if (preSelectedService != null) {
      setServiceType(preSelectedService);
    }
  }, [preSelectedService]);

  const validateStep = (): boolean => {
    setStepErrors('');
    if (step === 1) {
      if (!serviceType || !category) {
        setStepErrors('Please select a service and category.');
        return false;
      }
    } else if (step === 2) {
      if (!customerName.trim()) {
        setStepErrors('Please enter your name.');
        return false;
      }
      if (!phoneNumber.trim() || phoneNumber.trim().length < 10) {
        setStepErrors('Please enter a valid phone number.');
        return false;
      }
    } else if (step === 3) {
      if (!preferredDate) {
        setStepErrors('Please select a preferred date.');
        return false;
      }
      if (!preferredTime) {
        setStepErrors('Please select a preferred time slot.');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(s => s + 1);
    }
  };

  const handleBack = () => {
    setStepErrors('');
    setStep(s => s - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;
    try {
      await createBooking.mutateAsync({
        serviceType,
        category,
        customerName: customerName.trim(),
        phoneNumber: phoneNumber.trim(),
        preferredDate,
        preferredTime,
        message: message.trim() || undefined,
      });

      // Auto WhatsApp notification
      const adminMsg = encodeURIComponent(
        `🔔 New Booking!\nService: ${serviceType}\nName: ${customerName}\nPhone: ${phoneNumber}\nDate: ${preferredDate}\nTime: ${preferredTime}`
      );
      const popup = window.open(`https://wa.me/918689838590?text=${adminMsg}`, '_blank');
      if (!popup || popup.closed) {
        setNotificationStatus('blocked');
      } else {
        setNotificationStatus('notified');
      }
    } catch {
      // error handled by mutation state
    }
  };

  if (createBooking.isSuccess) {
    return (
      <div className="text-center py-12 px-6">
        <div className="text-6xl mb-4">✨</div>
        <h3 className="font-cinzel text-2xl font-bold text-gold-400 mb-3">Booking Confirmed!</h3>
        <p className="text-cosmic-200 font-cormorant text-lg mb-2">
          Thank you, <strong className="text-white">{customerName}</strong>!
        </p>
        <p className="text-cosmic-300 text-sm mb-6">
          We&apos;ll contact you at <strong className="text-gold-300">{phoneNumber}</strong> to confirm your appointment.
        </p>

        {notificationStatus === 'notified' && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 border border-green-500/40 text-green-400 text-sm mb-4">
            ✓ Admin Notified via WhatsApp
          </div>
        )}
        {notificationStatus === 'blocked' && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-sm mb-4">
            ⚠ Auto-Notification Blocked — Please notify manually
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
          <a
            href={`https://wa.me/918689838590?text=${encodeURIComponent(`Hi, I just booked a ${serviceType} session for ${preferredDate} at ${preferredTime}. My name is ${customerName}.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-full transition-colors text-sm"
          >
            📱 WhatsApp Us
          </a>
          <a
            href="mailto:ommvedicnumerology@gmail.com"
            className="px-6 py-2.5 border border-gold-400/40 hover:border-gold-400 text-gold-400 font-semibold rounded-full transition-colors text-sm"
          >
            ✉ Email Us
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      {/* Step Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-4 left-0 right-0 h-0.5 bg-cosmic-700 z-0" />
          <div
            className="absolute top-4 left-0 h-0.5 bg-gradient-to-r from-gold-500 to-gold-400 z-0 transition-all duration-500"
            style={{ width: `${((step - 1) / (stepLabels.length - 1)) * 100}%` }}
          />
          {stepLabels.map((label, i) => {
            const stepNum = i + 1;
            const isActive = stepNum === step;
            const isDone = stepNum < step;
            return (
              <div key={i} className="relative z-10 flex flex-col items-center gap-1.5">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-cinzel font-bold transition-all duration-300 ${
                    isDone
                      ? 'bg-gold-500 text-cosmic-950'
                      : isActive
                      ? 'bg-gold-400 text-cosmic-950 ring-2 ring-gold-300 ring-offset-2 ring-offset-cosmic-900'
                      : 'bg-cosmic-700 text-cosmic-400'
                  }`}
                >
                  {isDone ? '✓' : stepNum}
                </div>
                <span className={`text-xs font-cinzel hidden sm:block ${isActive ? 'text-gold-400' : 'text-cosmic-500'}`}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step 1: Service Selection */}
      {step === 1 && (
        <div className="space-y-5">
          <h3 className="font-cinzel text-lg text-gold-400 mb-4">Choose Your Service</h3>
          <div>
            <label className="block text-cosmic-300 text-sm font-cinzel mb-2 uppercase tracking-wide">
              Service Type *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {serviceOptions.map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setServiceType(opt.value)}
                  className={`p-3.5 rounded-xl border text-left font-cormorant text-base transition-all duration-200 ${
                    serviceType === opt.value
                      ? 'border-gold-400 bg-gold-400/15 text-gold-200'
                      : 'border-cosmic-600/40 hover:border-gold-400/40 text-cosmic-300 hover:text-cosmic-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-cosmic-300 text-sm font-cinzel mb-2 uppercase tracking-wide">
              Booking Category *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {categoryOptions.map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setCategory(opt.value)}
                  className={`p-3.5 rounded-xl border text-left font-cormorant text-base transition-all duration-200 ${
                    category === opt.value
                      ? 'border-gold-400 bg-gold-400/15 text-gold-200'
                      : 'border-cosmic-600/40 hover:border-gold-400/40 text-cosmic-300 hover:text-cosmic-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Personal Details */}
      {step === 2 && (
        <div className="space-y-5">
          <h3 className="font-cinzel text-lg text-gold-400 mb-4">Your Details</h3>
          <div>
            <label className="block text-cosmic-300 text-sm font-cinzel mb-2 uppercase tracking-wide">
              Full Name *
            </label>
            <input
              type="text"
              value={customerName}
              onChange={e => setCustomerName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 rounded-xl bg-cosmic-800/60 border border-cosmic-600/40 focus:border-gold-400/60 text-white placeholder-cosmic-500 outline-none transition-colors font-cormorant text-base"
            />
          </div>
          <div>
            <label className="block text-cosmic-300 text-sm font-cinzel mb-2 uppercase tracking-wide">
              Phone Number *
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={e => setPhoneNumber(e.target.value)}
              placeholder="+91 XXXXX XXXXX"
              className="w-full px-4 py-3 rounded-xl bg-cosmic-800/60 border border-cosmic-600/40 focus:border-gold-400/60 text-white placeholder-cosmic-500 outline-none transition-colors font-cormorant text-base"
            />
          </div>
        </div>
      )}

      {/* Step 3: Schedule & Confirm */}
      {step === 3 && (
        <div className="space-y-5">
          <h3 className="font-cinzel text-lg text-gold-400 mb-4">Schedule Your Session</h3>
          <div>
            <label className="block text-cosmic-300 text-sm font-cinzel mb-2 uppercase tracking-wide">
              Preferred Date *
            </label>
            <input
              type="date"
              value={preferredDate}
              onChange={e => setPreferredDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 rounded-xl bg-cosmic-800/60 border border-cosmic-600/40 focus:border-gold-400/60 text-white outline-none transition-colors font-cormorant text-base"
            />
          </div>
          <div>
            <label className="block text-cosmic-300 text-sm font-cinzel mb-2 uppercase tracking-wide">
              Preferred Time *
            </label>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map(slot => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setPreferredTime(slot)}
                  className={`py-2 px-3 rounded-lg border text-sm font-cinzel transition-all duration-200 ${
                    preferredTime === slot
                      ? 'border-gold-400 bg-gold-400/15 text-gold-200'
                      : 'border-cosmic-600/40 hover:border-gold-400/40 text-cosmic-400 hover:text-cosmic-200'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-cosmic-300 text-sm font-cinzel mb-2 uppercase tracking-wide">
              Message (Optional)
            </label>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Any specific questions or concerns..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-cosmic-800/60 border border-cosmic-600/40 focus:border-gold-400/60 text-white placeholder-cosmic-500 outline-none transition-colors font-cormorant text-base resize-none"
            />
          </div>

          {/* Price confirmation */}
          <div className="rounded-xl border border-gold-400/30 bg-gold-400/5 p-4 flex items-center justify-between">
            <div>
              <p className="text-cosmic-300 text-sm font-cinzel">Session Fee</p>
              <p className="text-white font-cormorant text-sm mt-0.5">
                {serviceOptions.find(s => s.value === serviceType)?.label} · {categoryOptions.find(c => c.value === category)?.label}
              </p>
            </div>
            <div className="text-right">
              <p className="text-gold-400 font-cinzel font-bold text-2xl">₹400</p>
              <p className="text-cosmic-500 text-xs">per session</p>
            </div>
          </div>
        </div>
      )}

      {/* Error message */}
      {stepErrors && (
        <div className="mt-4 px-4 py-2.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-cinzel">
          {stepErrors}
        </div>
      )}

      {createBooking.isError && (
        <div className="mt-4 px-4 py-2.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-cinzel">
          Booking failed. Please try again or contact us via WhatsApp.
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex gap-3 mt-8">
        {step > 1 && (
          <button
            type="button"
            onClick={handleBack}
            className="flex-1 py-3 border border-cosmic-600/40 hover:border-gold-400/40 text-cosmic-300 hover:text-gold-400 font-cinzel font-semibold rounded-xl transition-all duration-200"
          >
            ← Back
          </button>
        )}
        {step < 3 ? (
          <button
            type="button"
            onClick={handleNext}
            className="flex-1 py-3 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-cosmic-950 font-cinzel font-bold rounded-xl transition-all duration-300 shadow-gold"
          >
            Next →
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={createBooking.isPending}
            className="flex-1 py-3 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-cosmic-950 font-cinzel font-bold rounded-xl transition-all duration-300 shadow-gold disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {createBooking.isPending ? (
              <>
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Confirming...
              </>
            ) : (
              '✨ Confirm Booking · ₹400'
            )}
          </button>
        )}
      </div>
    </div>
  );
}
