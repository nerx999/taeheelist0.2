// js/auth.js

function generateDeviceId() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.textBaseline = 'top';
  ctx.font = '14px Arial';
  ctx.fillText('TAEHEE666_FINGERPRINT', 2, 2);
  const hash = canvas.toDataURL();
  return btoa(hash).substring(0, 24);
}

function authenticate(username, password) {
  return ALLOWED_USERS.find(u => u.username === username && u.password === password);
}

function login(user) {
  const deviceId = generateDeviceId();
  
  // ถ้ายังไม่มี deviceId → ผูกกับอุปกรณ์นี้
  if (!user.deviceId) {
    user.deviceId = deviceId;
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    return true;
  }

  // ถ้ามีแล้ว → ตรวจสอบว่าตรงกับอุปกรณ์นี้หรือไม่
  if (user.deviceId === deviceId) {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    return true;
  } else {
    return false; // ไม่ใช่อุปกรณ์เดียวกัน
  }
}

function checkAuth() {
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  if (!user) {
    window.location.href = '../login.html';
    return null;
  }

  // ตรวจสอบอีกครั้งว่าอุปกรณ์ยังตรงกันหรือไม่
  const currentDeviceId = generateDeviceId();
  if (user.deviceId !== currentDeviceId) {
    localStorage.removeItem('loggedInUser');
    alert('⚠️ ตรวจพบการเข้าสู่ระบบจากอุปกรณ์อื่น! กรุณาล็อกอินใหม่');
    window.location.href = '../login.html';
    return null;
  }

  return user;
}

function logout() {
  localStorage.removeItem('loggedInUser');
  window.location.href = '../login.html';
}