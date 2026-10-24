// Shared event logger. Later variants reuse it.
export const EVENT_TYPES = [
  'page_view',
  'inquiry_started',
  'inquiry_step_completed',
  'inquiry_submitted',
  'success_line_filled',
  'scoping_call_booked',
  'booking_confirmed',
  'followup_answered',
];

export function isEventType(type) {
  return EVENT_TYPES.includes(type);
}

// variant defaults to the ?variant= query parameter, else "baseline".
export function logEvent(type, props = {}, variant) {
  if (!isEventType(type)) throw new Error(`Unknown event type: ${type}`);
  if (typeof navigator === 'undefined' || typeof navigator.sendBeacon !== 'function') return false;
  // Variant pages embedded in an iframe (the /compare page) must not log into the live event file.
  if (globalThis.window && globalThis.window.self !== globalThis.window.top) return false;
  const v = variant || new URLSearchParams(globalThis.location?.search || '').get('variant') || 'baseline';
  const body = JSON.stringify({ type, ts: new Date().toISOString(), variant: v, props });
  return navigator.sendBeacon('/api/events', new Blob([body], { type: 'application/json' }));
}
