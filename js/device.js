function generateDeviceId() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.textBaseline = 'top';
  ctx.font = '14px Arial';
  ctx.fillText('TAEHEE666_FINGERPRINT', 2, 2);
  const hash = canvas.toDataURL();
  return btoa(hash).substring(0, 24);
}