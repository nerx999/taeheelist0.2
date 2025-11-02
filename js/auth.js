function authenticate(username, password) {
  return ALLOWED_USERS.find(u => u.username === username && u.password === password);
}

function login(user) {
  const deviceId = generateDeviceId();
  if (!user.deviceId) {
    user.deviceId = deviceId;
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    return true;
  }
  if (user.deviceId === deviceId) {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    return true;
  }
  return false;
}

function checkAuth() {
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  if (!user) {
    window.location.href = 'login.html';
    return null;
  }
  const currentDeviceId = generateDeviceId();
  if (user.deviceId !== currentDeviceId) {
    localStorage.removeItem('loggedInUser');
    alert('⚠️ ตรวจพบการเข้าสู่ระบบจากอุปกรณ์อื่น!');
    window.location.href = 'login.html';
    return null;
  }
  return user;
}

function logout() {
  localStorage.removeItem('loggedInUser');
  window.location.href = 'login.html';
}