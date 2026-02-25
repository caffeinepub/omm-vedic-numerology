import { useState } from 'react';
import { ServiceType, BookingCategory } from '../../backend';
import { useCreateBooking } from '../../hooks/useQueries';
import { services } from '../../data/services';
import { CheckCircle, Loader2, AlertCircle } from 'lucide-react';

interface BookingFormProps {
  preselectedService?: string;
}

const serviceTypeMap: Record<string, ServiceType> = {
  tarotCardReading: ServiceType.tarotCardReading,
  numerology: ServiceType.numerology,
  vastu: ServiceType.vastu,
  pronology: ServiceType.pronology,
};

const categoryOptions = [
  { value: BookingCategory.appointment, label: 'Appointment (In-Person / Online)' },
  { value: BookingCategory.homeTour, label: 'Home Tour (Vastu Visit)' },
  { value: BookingCategory.nameChange, label: 'Name Change Consultation' },
];

export default function BookingForm({ preselectedService }: BookingFormProps) {
  const [serviceType, setServiceType] = useState(preselectedService || '');
  const [category, setCategory] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [bookingId, setBookingId] = useState<bigint | null>(null);

  const createBooking = useCreateBooking();

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!serviceType) newErrors.serviceType = 'Please select a service';
    if (!category) newErrors.category = 'Please select a booking type';
    if (!customerName.trim()) newErrors.customerName = 'Full name is required';
    if (!phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    else if (!/^[0-9+\-\s]{7,15}$/.test(phoneNumber.trim())) newErrors.phoneNumber = 'Enter a valid phone number';
    if (!preferredDate) newErrors.preferredDate = 'Preferred date is required';
    else {
      const selected = new Date(preferredDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) newErrors.preferredDate = 'Please select a future date';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const id = await createBooking.mutateAsync({
        serviceType: serviceTypeMap[serviceType],
        category: category as BookingCategory,
        customerName: customerName.trim(),
        phoneNumber: phoneNumber.trim(),
        preferredDate,
        message: message.trim() || null,
      });
      setBookingId(id);
    } catch (err) {
      console.error('Booking failed:', err);
    }
  };

  const handleReset = () => {
    setServiceType(preselectedService || '');
    setCategory('');
    setCustomerName('');
    setPhoneNumber('');
    setPreferredDate('');
    setMessage('');
    setErrors({});
    setBookingId(null);
    createBooking.reset();
  };

  // Success State
  if (bookingId !== null) {
    return (
      <div className="text-center py-12 px-6">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-gold" />
          </div>
        </div>
        <h3 className="font-cinzel font-bold text-2xl text-gold-light mb-3 tracking-wide">
          Booking Confirmed!
        </h3>
        <p className="font-cormorant text-lg text-foreground/70 italic mb-2">
          Your cosmic journey begins here
        </p>
        <p className="font-inter text-sm text-foreground/50 mb-2">
          Booking ID: <span className="text-gold font-semibold">#{bookingId.toString()}</span>
        </p>
        <p className="font-inter text-sm text-foreground/50 mb-8 max-w-sm mx-auto">
          We will contact you on your provided phone number to confirm your session details.
        </p>
        <div className="divider-gold w-32 mx-auto mb-8" />
        <button onClick={handleReset} className="btn-gold px-8 py-3 rounded text-sm">
          Book Another Session
        </button>
      </div>
    );
  }

  const inputClass = `input-cosmic w-full px-4 py-3 rounded text-sm font-inter placeholder:text-foreground/30 focus:outline-none`;
  const labelClass = `font-cinzel text-xs tracking-wider text-gold/80 uppercase mb-1.5 block`;
  const errorClass = `font-inter text-xs text-destructive mt-1 flex items-center gap-1`;

  const today = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Price Banner */}
      <div className="bg-gold/10 border border-gold/30 rounded-lg px-5 py-4 flex items-center justify-between">
        <div>
          <p className="font-cinzel text-xs tracking-widest text-gold/70 uppercase">Session Fee</p>
          <p className="font-cinzel text-2xl font-bold text-gold">₹400</p>
        </div>
        <div className="text-right">
          <p className="font-inter text-xs text-foreground/40">All services</p>
          <p className="font-inter text-xs text-foreground/40">One flat price</p>
        </div>
      </div>

      {/* Service Type */}
      <div>
        <label className={labelClass}>Service Type *</label>
        <select
          value={serviceType}
          onChange={(e) => { setServiceType(e.target.value); setErrors(p => ({ ...p, serviceType: '' })); }}
          className={`${inputClass} appearance-none cursor-pointer`}
        >
          <option value="" disabled>Select a service...</option>
          {services.map((s) => (
            <option key={s.id} value={s.id} className="bg-cosmic-mid">
              {s.name}
            </option>
          ))}
        </select>
        {errors.serviceType && (
          <p className={errorClass}>
            <AlertCircle className="w-3 h-3" /> {errors.serviceType}
          </p>
        )}
      </div>

      {/* Booking Category */}
      <div>
        <label className={labelClass}>Booking Type *</label>
        <select
          value={category}
          onChange={(e) => { setCategory(e.target.value); setErrors(p => ({ ...p, category: '' })); }}
          className={`${inputClass} appearance-none cursor-pointer`}
        >
          <option value="" disabled>Select booking type...</option>
          {categoryOptions.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-cosmic-mid">
              {opt.label}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className={errorClass}>
            <AlertCircle className="w-3 h-3" /> {errors.category}
          </p>
        )}
      </div>

      {/* Name & Phone Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Full Name *</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => { setCustomerName(e.target.value); setErrors(p => ({ ...p, customerName: '' })); }}
            placeholder="Your full name"
            className={inputClass}
          />
          {errors.customerName && (
            <p className={errorClass}>
              <AlertCircle className="w-3 h-3" /> {errors.customerName}
            </p>
          )}
        </div>
        <div>
          <label className={labelClass}>Phone Number *</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => { setPhoneNumber(e.target.value); setErrors(p => ({ ...p, phoneNumber: '' })); }}
            placeholder="+91 XXXXX XXXXX"
            className={inputClass}
          />
          {errors.phoneNumber && (
            <p className={errorClass}>
              <AlertCircle className="w-3 h-3" /> {errors.phoneNumber}
            </p>
          )}
        </div>
      </div>

      {/* Preferred Date */}
      <div>
        <label className={labelClass}>Preferred Date *</label>
        <input
          type="date"
          value={preferredDate}
          min={today}
          onChange={(e) => { setPreferredDate(e.target.value); setErrors(p => ({ ...p, preferredDate: '' })); }}
          className={`${inputClass} [color-scheme:dark]`}
        />
        {errors.preferredDate && (
          <p className={errorClass}>
            <AlertCircle className="w-3 h-3" /> {errors.preferredDate}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label className={labelClass}>Message (Optional)</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Share any specific questions or concerns you'd like to address in your session..."
          rows={4}
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Error from mutation */}
      {createBooking.isError && (
        <div className="bg-destructive/10 border border-destructive/30 rounded px-4 py-3 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0" />
          <p className="font-inter text-sm text-destructive">
            Something went wrong. Please try again.
          </p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={createBooking.isPending}
        className="btn-gold w-full py-3.5 rounded text-sm flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
      >
        {createBooking.isPending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Booking your session...
          </>
        ) : (
          'Confirm Booking — ₹400'
        )}
      </button>

      <p className="font-inter text-xs text-foreground/35 text-center">
        By booking, you agree to our consultation terms. Payment is collected at the time of session.
      </p>
    </form>
  );
}
