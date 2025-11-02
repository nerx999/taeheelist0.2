document.getElementById('loginForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const alertBox = document.getElementById('alertBox');
  alertBox.style.display = 'none';

  if (!username || !password) {
    showAlert('⚠️ กรุณากรอกข้อมูลให้ครบ', 'error');
    return;
  }

  const user = authenticate(username, password);
  if (!user) {
    showAlert('❌ ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง', 'error');
    return;
  }

  const success = login(user);
  if (success) {
    showAlert('✅ เข้าสู่ระบบสำเร็จ!', 'success');
    setTimeout(() => {
      if (user.role === 'admin') window.location.href = 'dashboard/admin.html';
      else if (user.role === 'member') window.location.href = 'dashboard/member.html';
      else window.location.href = 'dashboard/guest.html';
    }, 1000);
  } else {
    showAlert('🔒 รหัสนี้ถูกใช้บนอุปกรณ์อื่นแล้ว!', 'error');
  }
});

function showAlert(message, type) {
  const alertBox = document.getElementById('alertBox');
  alertBox.textContent = message;
  alertBox.className = `alert alert-${type}`;
  alertBox.style.display = 'block';
}