import { useState } from 'react';
import { ServiceType, BookingCategory } from '../../backend';
import { useCreateBooking, BookingSubmissionError } from '../../hooks/useQueries';
import { services } from '../../data/services';
import { CheckCircle, Loader2, AlertCircle, Clock, Mail } from 'lucide-react';

// Admin WhatsApp number in international format (country code + number, no + or spaces)
const ADMIN_WHATSAPP_NUMBER = '918689838590';
const ADMIN_EMAIL = 'ptripathy1989@gmail.com';

interface BookingFormProps {
  preselectedService?: string;
}

const serviceTypeMap: Record<string, ServiceType> = {
  tarotCardReading: ServiceType.tarotCardReading,
  numerology: ServiceType.numerology,
  vastu: ServiceType.vastu,
  pronology: ServiceType.pronology,
};

const serviceLabels: Record<string, string> = {
  tarotCardReading: 'Tarot Card Reading',
  numerology: 'Numerology',
  vastu: 'Vastu',
  pronology: 'Pronology',
};

const categoryLabels: Record<string, string> = {
  appointment: 'Appointment (In-Person / Online)',
  homeTour: 'Home Tour (Vastu Visit)',
  nameChange: 'Name Change Consultation',
};

const categoryOptions = [
  { value: BookingCategory.appointment, label: 'Appointment (In-Person / Online)' },
  { value: BookingCategory.homeTour, label: 'Home Tour (Vastu Visit)' },
  { value: BookingCategory.nameChange, label: 'Name Change Consultation' },
];

// Common time slots for consultation
const timeSlots = [
  '09:00 AM', '09:30 AM',
  '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM',
  '01:00 PM', '01:30 PM',
  '02:00 PM', '02:30 PM',
  '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM',
  '05:00 PM', '05:30 PM',
  '06:00 PM', '06:30 PM',
];

function buildWhatsAppLink(params: {
  bookingId: string;
  customerName: string;
  serviceType: string;
  category: string;
  preferredDate: string;
  preferredTime: string;
  phoneNumber: string;
  message: string;
}) {
  const { bookingId, customerName, serviceType, category, preferredDate, preferredTime, phoneNumber, message } = params;
  const lines = [
    `🌟 *New Booking from Website — Omm Vedic Numerloggy*`,
    ``,
    `📋 *Booking ID:* #${bookingId}`,
    `👤 *Name:* ${customerName}`,
    `🔮 *Service:* ${serviceLabels[serviceType] ?? serviceType}`,
    `📌 *Type:* ${categoryLabels[category] ?? category}`,
    `📅 *Preferred Date:* ${preferredDate}`,
    `⏰ *Preferred Time:* ${preferredTime || 'Not specified'}`,
    `📞 *Phone:* ${phoneNumber}`,
  ];
  if (message) {
    lines.push(`💬 *Message:* ${message}`);
  }
  lines.push(``);
  lines.push(`Please confirm this booking at your earliest convenience.`);

  const text = lines.join('\n');
  return `https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

function buildEmailLink(params: {
  bookingId: string;
  customerName: string;
  serviceType: string;
  category: string;
  preferredDate: string;
  preferredTime: string;
  phoneNumber: string;
  message: string;
}) {
  const { bookingId, customerName, serviceType, category, preferredDate, preferredTime, phoneNumber, message } = params;
  const subject = 'New Booking – Omm Vedic Numerloggy';
  const bodyLines = [
    `New Booking from Website — Omm Vedic Numerloggy`,
    ``,
    `Booking ID: #${bookingId}`,
    `Name: ${customerName}`,
    `Service: ${serviceLabels[serviceType] ?? serviceType}`,
    `Type: ${categoryLabels[category] ?? category}`,
    `Preferred Date: ${preferredDate}`,
    `Preferred Time: ${preferredTime || 'Not specified'}`,
    `Phone: ${phoneNumber}`,
    `Message: ${message || 'None'}`,
    ``,
    `Please log in to the admin dashboard to confirm this booking.`,
  ];
  const body = bodyLines.join('\n');
  return `mailto:${ADMIN_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function BookingForm({ preselectedService }: BookingFormProps) {
  const [serviceType, setServiceType] = useState(preselectedService || '');
  const [category, setCategory] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [bookingId, setBookingId] = useState<bigint | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Capture form values at submission time for the notification links
  const [submittedData, setSubmittedData] = useState<{
    customerName: string;
    serviceType: string;
    category: string;
    preferredDate: string;
    preferredTime: string;
    phoneNumber: string;
    message: string;
  } | null>(null);

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
    if (!preferredTime) newErrors.preferredTime = 'Preferred time is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!validate()) return;

    try {
      const booking = await createBooking.mutateAsync({
        serviceType: serviceTypeMap[serviceType],
        category: category as BookingCategory,
        customerName: customerName.trim(),
        phoneNumber: phoneNumber.trim(),
        preferredDate,
        preferredTime,
        message: message.trim() || null,
      });
      setSubmittedData({
        customerName: customerName.trim(),
        serviceType,
        category,
        preferredDate,
        preferredTime,
        phoneNumber: phoneNumber.trim(),
        message: message.trim(),
      });
      setBookingId(booking.id);
    } catch (err) {
      if (err instanceof BookingSubmissionError) {
        setSubmitError(
          err.errorKind === 'invalidInput'
            ? 'Booking failed: Please check your details and ensure all required fields are filled correctly.'
            : 'Booking failed due to an internal error. Please try again shortly.'
        );
      } else {
        setSubmitError('Booking failed. Please check your connection and try again.');
      }
    }
  };

  const handleReset = () => {
    setServiceType(preselectedService || '');
    setCategory('');
    setCustomerName('');
    setPhoneNumber('');
    setPreferredDate('');
    setPreferredTime('');
    setMessage('');
    setErrors({});
    setBookingId(null);
    setSubmittedData(null);
    setSubmitError(null);
    createBooking.reset();
  };

  // Success State
  if (bookingId !== null && submittedData) {
    const whatsappLink = buildWhatsAppLink({
      bookingId: bookingId.toString(),
      ...submittedData,
    });
    const emailLink = buildEmailLink({
      bookingId: bookingId.toString(),
      ...submittedData,
    });

    return (
      <div className="text-center py-12 px-6">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-gold" />
          </div>
        </div>
        <h3 className="font-cinzel font-bold text-2xl text-gold-light mb-3 tracking-wide">
          Booking Received!
        </h3>
        <p className="font-cormorant text-lg text-foreground/70 italic mb-3">
          Your cosmic journey begins here
        </p>

        {/* Prominent Booking ID */}
        <div className="inline-block bg-gold/10 border border-gold/40 rounded-lg px-6 py-3 mb-4">
          <p className="font-cinzel text-xs tracking-widest text-gold/60 uppercase mb-1">Your Booking ID</p>
          <p className="font-cinzel text-2xl font-bold text-gold">#{bookingId.toString()}</p>
        </div>

        <p className="font-inter text-sm text-foreground/60 mb-2 max-w-sm mx-auto">
          Booked via Website · {submittedData.preferredDate} at {submittedData.preferredTime}
        </p>
        <p className="font-inter text-sm text-foreground/60 mb-8 max-w-sm mx-auto leading-relaxed">
          Your booking has been submitted successfully! We will contact you shortly to confirm your appointment.
        </p>

        {/* Notification Buttons */}
        <div className="mb-8 max-w-sm mx-auto space-y-3">
          <p className="font-cinzel text-xs tracking-wider text-gold/70 uppercase mb-3">
            Notify the Consultant Instantly
          </p>

          {/* WhatsApp Button */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 w-full py-4 px-6 rounded-xl text-white font-cinzel text-sm tracking-wider transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            style={{ backgroundColor: '#25D366', boxShadow: '0 4px 20px rgba(37,211,102,0.4)' }}
          >
            {/* WhatsApp SVG icon */}
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Notify Admin via WhatsApp
          </a>

          {/* Email Button */}
          <a
            href={emailLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 w-full py-4 px-6 rounded-xl font-cinzel text-sm tracking-wider transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border border-gold/50 text-gold hover:bg-gold/10"
            style={{ boxShadow: '0 4px 20px rgba(212,175,55,0.15)' }}
          >
            <Mail className="w-5 h-5 flex-shrink-0" />
            Notify Admin via Email
          </a>

          <p className="font-inter text-xs text-foreground/40 mt-2">
            Tap either button to send your booking details directly to the consultant
          </p>
        </div>

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

      {/* Preferred Date & Time Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
        <div>
          <label className={labelClass}>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              Preferred Time *
            </span>
          </label>
          <select
            value={preferredTime}
            onChange={(e) => { setPreferredTime(e.target.value); setErrors(p => ({ ...p, preferredTime: '' })); }}
            className={`${inputClass} appearance-none cursor-pointer`}
          >
            <option value="" disabled>Select a time slot...</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot} className="bg-cosmic-mid">
                {slot}
              </option>
            ))}
          </select>
          {errors.preferredTime && (
            <p className={errorClass}>
              <AlertCircle className="w-3 h-3" /> {errors.preferredTime}
            </p>
          )}
        </div>
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

      {/* Error from mutation or submission */}
      {(createBooking.isError || submitError) && (
        <div className="bg-destructive/10 border border-destructive/30 rounded px-4 py-3 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
          <p className="font-inter text-sm text-destructive">
            {submitError || 'Something went wrong. Please try again.'}
          </p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={createBooking.isPending}
        className="btn-gold w-full py-4 rounded text-sm font-cinzel tracking-widest uppercase disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {createBooking.isPending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Submitting Booking...
          </>
        ) : (
          'Book Your Session'
        )}
      </button>

      <p className="font-inter text-xs text-foreground/40 text-center">
        By booking, you agree to be contacted by our consultant to confirm your appointment.
      </p>
    </form>
  );
}
