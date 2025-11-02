// โหลดข้อมูลจาก localStorage หรือใช้ค่าเริ่มต้น
let members = JSON.parse(localStorage.getItem('members')) || [
  { name: "Latae Taehee", link: "facebook.com/latae.taehee", avatar: "L" },
  { name: "Billy NineKing", link: "facebook.com/billy.youngthug", avatar: "B" },
  { name: "Kruz Diff", link: "facebook.com/kruz.diff", avatar: "K" },
  { name: "Blumarine Blumarine", link: "facebook.com/Blumarinemyturn", avatar: "B" },
  { name: "Justxn", link: "www.facebook.com/SSD9TB", avatar: "J" },
  { name: "Trần Lệ Băng", link: "www.facebook.com/profile.php?id=100089887544924", avatar: "N" },
  { name: "ดอปดอป หิว", link: "facebook.com/dodge.victory", avatar: "ด" }
];

const itemsPerPage = 20;
let currentPage = 1;

// ฟังก์ชันบันทึก (เพื่อให้แอดมินใช้เพิ่มข้อมูล)
function saveMembers() {
  localStorage.setItem('members', JSON.stringify(members));
}

// ฟังก์ชันแสดงผล
function renderMembers() {
  const list = document.getElementById('memberList');
  const searchInput = document.getElementById('searchInput');
  if (!list) return;

  const query = searchInput ? searchInput.value.toLowerCase() : '';
  const filtered = members.filter(m => m.name.toLowerCase().includes(query));
  const start = (currentPage - 1) * itemsPerPage;
  const paginated = filtered.slice(start, start + itemsPerPage);

  // ล้างรายการเก่า
  list.innerHTML = '';

  if (paginated.length === 0) {
    list.innerHTML = '<li class="no-results">ไม่พบสมาชิกที่ค้นหา</li>';
    renderPagination(filtered.length);
    return;
  }

  // สร้างรายการใหม่
  paginated.forEach((m, index) => {
    const li = document.createElement('li');
    li.className = 'member-card';

    // ตรวจสอบลิงก์ให้ปลอดภัย
    let url = m.link;
    if (!url.startsWith('http')) {
      url = 'https://' + (url.startsWith('www.') ? url : 'www.' + url);
    }

    li.innerHTML = `
      <div class="avatar">${m.avatar}</div>
      <div class="info">
        <div class="name">${m.name}</div>
        <div class="link">${m.link}</div>
      </div>
      <a href="${url}" target="_blank" class="fb-btn">f</a>
    `;

    // เพิ่มแอนิเมชันแบบ staggered
    setTimeout(() => {
      li.classList.add('show');
    }, index * 80);

    list.appendChild(li);
  });

  renderPagination(filtered.length);
}

// ฟังก์ชันแสดง pagination
function renderPagination(totalItems) {
  const container = document.getElementById('pagination');
  if (!container) return;

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  container.innerHTML = '';

  if (totalPages <= 1) return;

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
    btn.textContent = i;
    btn.onclick = () => {
      currentPage = i;
      renderMembers();
    };
    container.appendChild(btn);
  }
}

// ผูกเหตุการณ์ค้นหา
const searchInput = document.getElementById('searchInput');
if (searchInput) {
  searchInput.addEventListener('input', () => {
    currentPage = 1;
    renderMembers();
  });
}

// เริ่มต้นแสดงผลเมื่อโหลดหน้า
window.addEventListener('load', () => {
  renderMembers();
});

// ส่งออกฟังก์ชัน (ถ้าแอดมินต้องการเรียกใช้จากภายนอก)
window.addMember = function(name, link, avatar) {
  if (name && link && avatar) {
    members.push({ name, link, avatar });
    saveMembers();
    currentPage = 1;
    renderMembers();
  }
};

