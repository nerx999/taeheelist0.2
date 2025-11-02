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

function saveMembers() {
  localStorage.setItem('members', JSON.stringify(members));
}

function addMember(name, link, avatar) {
  if (name && link && avatar) {
    members.push({ name, link, avatar });
    saveMembers();
    currentPage = 1;
    renderMembers();
    return true;
  }
  return false;
}

function deleteMember(index) {
  members.splice(index, 1);
  saveMembers();
  currentPage = 1;
  renderMembers();
}

function renderMembers() {
  const list = document.getElementById('memberList');
  if (!list) return;

  const query = document.getElementById('searchInput')?.value.toLowerCase() || '';
  const filtered = members.filter(m => m.name.toLowerCase().includes(query));
  const start = (currentPage - 1) * itemsPerPage;
  const paginated = filtered.slice(start, start + itemsPerPage);

  list.innerHTML = '';
  if (paginated.length === 0) {
    list.innerHTML = '<li class="no-results">ไม่พบสมาชิกที่ค้นหา</li>';
    renderPagination(filtered.length);
    return;
  }

  paginated.forEach((m, idx) => {
    const realIndex = members.findIndex(x => x.name === m.name && x.link === m.link);
    const li = document.createElement('li');
    li.className = 'member-card';

    let url = m.link;
    if (!url.startsWith('http')) url = 'https://' + (url.startsWith('www.') ? url : 'www.' + url);

    li.innerHTML = `
      <div class="avatar">${m.avatar}</div>
      <div class="info">
        <div class="name">${m.name}</div>
        <div class="link">${m.link}</div>
      </div>
      <a href="${url}" target="_blank" class="fb-btn">f</a>
    `;

    // ปุ่มลบเฉพาะในหน้าแอดมิน
    if (window.location.pathname.includes('admin.html')) {
      const delBtn = document.createElement('button');
      delBtn.className = 'delete-btn';
      delBtn.textContent = 'ลบ';
      delBtn.onclick = () => {
        if (confirm(`ลบ "${m.name}" จริงหรือ?`)) deleteMember(realIndex);
      };
      li.appendChild(delBtn);
    }

    setTimeout(() => li.classList.add('show'), idx * 80);
    list.appendChild(li);
  });

  renderPagination(filtered.length);
}

function renderPagination(total) {
  const container = document.getElementById('pagination');
  if (!container) return;
  const pages = Math.ceil(total / itemsPerPage);
  container.innerHTML = '';
  if (pages <= 1) return;
  for (let i = 1; i <= pages; i++) {
    const btn = document.createElement('button');
    btn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
    btn.textContent = i;
    btn.onclick = () => { currentPage = i; renderMembers(); };
    container.appendChild(btn);
  }
}

document.getElementById('searchInput')?.addEventListener('input', () => {
  currentPage = 1;
  renderMembers();
});

window.addEventListener('load', renderMembers);