# Homework 3: ระบบเก็บข้อมูลผู้ป่วยรายเดือน + Dashboard

## โครงสร้างระบบ
- **Google Sheets** — ฐานข้อมูลเก็บข้อมูลเดือน / จำนวนวัน / จำนวนผู้ป่วย
- **Google Apps Script** (`Code.gs`) — ทำหน้าที่เป็น API (backend) รับ-ส่งข้อมูลกับ Sheet
- **หน้าเว็บ (frontend)** — `index.html` (login), `form.html` (กรอกข้อมูล), `dashboard.html` (Dashboard) โฮสต์บน GitHub Pages

## ขั้นตอนที่ 1: สร้าง Google Sheets
1. สร้าง Google Sheet ใหม่ ตั้งชื่อ Sheet (แท็บด้านล่าง) ว่า `Data`
2. คัดลอก **Sheet ID** จาก URL เช่น
   `https://docs.google.com/spreadsheets/d/`**`SHEET_ID_ตรงนี้`**`/edit`

## ขั้นตอนที่ 2: ตั้งค่า Google Apps Script
1. ใน Google Sheet ไปที่ `Extensions > Apps Script`
2. วางโค้ดจากไฟล์ `Code.gs` ทับของเดิมทั้งหมด
3. แก้ค่าตัวแปร:
   - `SHEET_ID` = Sheet ID ที่คัดลอกมา
   - `LOGIN_PASSWORD` = รหัสผ่านที่ต้องการใช้ login
4. รันฟังก์ชัน `setupSheet` หนึ่งครั้ง (เพื่อสร้างหัวตาราง) — เลือกฟังก์ชันนี้จาก dropdown ด้านบน แล้วกด Run
   (ครั้งแรกจะขอ authorize สิทธิ์ ให้กด Allow)
5. กด **Deploy > New deployment**
   - Select type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - กด Deploy แล้วคัดลอก **Web app URL** ที่ได้

## ขั้นตอนที่ 3: ตั้งค่า Frontend
1. เปิดไฟล์ `app.js`
2. แก้บรรทัด `const API_URL = '...'` ให้เป็น Web app URL ที่ได้จากขั้นตอนที่ 2

## ขั้นตอนที่ 4: สมัคร GitHub และ Deploy เป็น GitHub Pages
1. สมัครบัญชีที่ https://github.com (ถ้ายังไม่มี)
2. สร้าง repository ใหม่ เช่นชื่อ `patient-dashboard` (ตั้งเป็น Public)
3. อัปโหลดไฟล์ทั้งหมดนี้เข้า repo:
   - `index.html`
   - `form.html`
   - `dashboard.html`
   - `style.css`
   - `app.js`
4. ไปที่ repo > **Settings > Pages**
   - Source: เลือก branch `main` และโฟลเดอร์ `/ (root)`
   - กด Save
5. รอสักครู่ จะได้ลิงก์สาธารณะ เช่น
   `https://ชื่อผู้ใช้.github.io/patient-dashboard/`
6. ส่งลิงก์นี้เป็นคำตอบการบ้าน

## หมายเหตุเรื่อง Honeypot
ฟอร์มกรอกข้อมูล (`form.html`) มีช่อง input ที่ชื่อ `website` ถูกซ่อนไว้ด้วย CSS
(class `hp-field`) ผู้ใช้จริงจะมองไม่เห็นและไม่กรอก แต่บอทสแปมที่กรอกทุกช่องอัตโนมัติ
จะกรอกช่องนี้ ทำให้ backend (`handleSubmit` ใน `Code.gs`) ตรวจพบและปฏิเสธข้อมูลนั้น
(อ้างอิงแนวคิดจาก https://www.maechada.com/articles/web-essentials-01-honeypot/)

## การทดสอบ
1. เปิดลิงก์ GitHub Pages
2. Login ด้วยรหัสผ่านที่ตั้งไว้ใน `Code.gs`
3. กรอกข้อมูลเดือน/จำนวนวัน/จำนวนผู้ป่วย แล้วกดบันทึก
4. ไปที่ Dashboard เพื่อดูกราฟเปรียบเทียบและตาราง (มี pagination)
   ตั้งค่าตัวเลข "แจ้งเตือนถ้าจำนวนผู้ป่วยเกิน" เพื่อทดสอบการไฮไลต์แถวที่เกินเกณฑ์

## ข้อควรระวัง
- รหัสผ่าน login ในตัวอย่างนี้เป็นการตรวจสอบแบบง่าย (เหมาะสำหรับงานการบ้าน/demo)
  ไม่ใช่ระบบ authentication ที่ปลอดภัยระดับ production
- CORS: การเรียก POST ไปยัง Apps Script ใช้ `Content-Type: text/plain` เพื่อเลี่ยงปัญหา
  preflight request (OPTIONS) ที่ Apps Script ไม่รองรับโดยตรง
