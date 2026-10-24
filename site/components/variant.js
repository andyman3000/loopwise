// Shared helper: the variant named in ?variant=, else "baseline".
export function currentVariant() {
  return new URLSearchParams(globalThis.location?.search || '').get('variant') || 'baseline';
}
