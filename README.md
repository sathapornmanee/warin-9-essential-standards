# Warin 9 Essential Standards

เว็บแอปสำหรับแนวปฏิบัติตามมาตรฐานสำคัญจำเป็นต่อความปลอดภัย 9 ข้อของโรงพยาบาลวารินชำราบ

## การเปิดใช้งานในเครื่อง

เปิดไฟล์ `index.html` ในเบราว์เซอร์ได้ทันที หรือเผยแพร่บน GitHub Pages โดยตั้งค่า Pages ให้เสิร์ฟจาก branch หลักและ root folder

## การ deploy บน GitHub Pages

1. สร้าง repository ใหม่บน GitHub เช่น `warin-9-essential-standards`
2. อัปโหลดไฟล์ทั้งหมดในโฟลเดอร์นี้ขึ้น branch `main`
3. ไปที่ `Settings > Pages`
4. เลือก `Build and deployment > Source: GitHub Actions`
5. เมื่อ push แล้ว workflow `Deploy to GitHub Pages` จะเผยแพร่เว็บให้อัตโนมัติ

## โครงสร้างไฟล์

- `index.html` จุดเริ่มต้นของเว็บ
- `src/App.jsx` โค้ด React ของแอป
- `styles.css` สไตล์เสริมเล็กน้อย
- `.nojekyll` ให้ GitHub Pages เสิร์ฟไฟล์ static ตามปกติ
- `.github/workflows/static.yml` workflow สำหรับ deploy GitHub Pages อัตโนมัติ
