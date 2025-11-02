// js/members.js

let members = JSON.parse(localStorage.getItem('members')) || [];

function saveMembers() {
  localStorage.setItem('members', JSON.stringify(members));
}

function loadMembers() {
  const saved = localStorage.getItem('members');
  if (saved) members = JSON.parse(saved);
}

function addMember(name, link, avatar) {
  if (!name || !link || !avatar) return false;
  members.push({ name, link, avatar });
  saveMembers();
  renderMembers();
  return true;
}

function deleteMember(index) {
  members.splice(index, 1);
  saveMembers();
  renderMembers();
}

function renderMembers() {
  const container = document.getElementById('memberList');
  if (!container) return;

  container.innerHTML = '';

  members.forEach((m, idx) => {
    let url = m.link;
    if (!url.startsWith('http')) {
      url = 'https://' + (url.startsWith('www.') ? url : 'www.' + url);
    }

    const card = document.createElement('div');
    card.className = 'member-card';
    card.innerHTML = `
      <div class="avatar">${m.avatar}</div>
      <div class="info">
        <div class="name">${m.name}</div>
        <div class="link">${m.link}</div>
      </div>
      <a href="${url}" target="_blank" class="fb-btn">f</a>
      <button class="delete-btn" onclick="deleteMember(${idx})">ลบ</button>
    `;
    container.appendChild(card);
  });
}

// 🔑 จำเป็นมาก! เพื่อให้ onclick="deleteMember()" ใน HTML ใช้งานได้
window.deleteMember = deleteMember;
