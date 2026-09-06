// ================================================================
// ตั้งค่าตรงนี้: วาง Web app URL ที่ได้จากการ Deploy Google Apps Script
// ================================================================
const API_URL = 'https://script.google.com/macros/s/AKfycbynMx-418E9ZcUkuamNai5A8qH3XCFV0zAcjVv5IPqVE4fHs-zGL_5EcICRN6lGTlYK/exec';

// เช็คว่า login แล้วหรือยัง ถ้ายัง ให้เด้งกลับไปหน้า login
function requireLogin() {
  const token = sessionStorage.getItem('token');
  if (!token) {
    window.location.href = 'index.html';
  }
}

function logout() {
  sessionStorage.removeItem('token');
  window.location.href = 'index.html';
}

// เรียก Apps Script ด้วย POST
// หมายเหตุ: ใช้ Content-Type: text/plain เพื่อเลี่ยง CORS preflight (OPTIONS)
// ที่ Google Apps Script Web App ไม่รองรับ
function apiPost(payload) {
  return fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload)
  }).then(function (res) { return res.json(); });
}

function apiGet(action) {
  return fetch(API_URL + '?action=' + encodeURIComponent(action))
    .then(function (res) { return res.json(); });
}
