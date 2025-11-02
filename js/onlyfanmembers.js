// js/members.js
const members = [
  { name: "Latae Taehee", link: "facebook.com/latae.taehee", avatar: "L" },
  { name: "Billy NineKing", link: "facebook.com/billy.youngthug", avatar: "B" },
  { name: "Kruz Diff", link: "facebook.com/kruz.diff", avatar: "K" },
  { name: "Blumarine Blumarine", link: "facebook.com/Blumarinemyturn", avatar: "B" },
  { name: "Justxn", link: "www.facebook.com/SSD9TB", avatar: "J" },
  { name: "Trần Lệ Băng", link: "www.facebook.com/profile.php?id=100089887544924", avatar: "N" },
  { name: "ดอปดอป หิว", link: "facebook.com/dodge.victory", avatar: "ด" },
  // ... รายการอื่นๆ ตามเดิม
];

const itemsPerPage = 20;
let currentPage = 1;

function renderMembers() {
  const list = document.getElementById('memberList');
  const query = document.getElementById('searchInput').value.toLowerCase();
  const filtered = members.filter(m => m.name.toLowerCase().includes(query));
  const start = (currentPage - 1) * itemsPerPage;
  const paginated = filtered.slice(start, start + itemsPerPage);

  list.innerHTML = '';

  if (paginated.length === 0) {
    list.innerHTML = '<li class="no-results">ไม่พบสมาชิกที่ค้นหา</li>';
    renderPagination(filtered.length);
    return;
  }

  paginated.forEach((m, index) => {
    const li = document.createElement('li');
    li.className = 'member-card';
    li.innerHTML = `
      <div class="avatar">${m.avatar}</div>
      <div class="info">
        <div class="name">${m.name}</div>
        <div class="link">${m.link}</div>
      </div>
      <a href="https://${m.link}" target="_blank" class="fb-btn">f</a>
    `;
    list.appendChild(li);

    // Add delay for staggered animation
    setTimeout(() => {
      li.classList.add('show');
    }, index * 100);
  });

  renderPagination(filtered.length);
}

function renderPagination(totalItems) {
  const container = document.getElementById('pagination');
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  if (totalPages <= 1) {
    container.innerHTML = '';
    return;
  }

  let html = '';
  for (let i = 1; i <= totalPages; i++) {
    html += `<div class="page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</div>`;
  }
  container.innerHTML = html;

  container.querySelectorAll('.page-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      currentPage = parseInt(btn.dataset.page);
      renderMembers();
    });
  });
}

document.getElementById('searchInput').addEventListener('input', () => {
  currentPage = 1;
  renderMembers();
});

// Initial load
window.addEventListener('load', () => {
  renderMembers();
});