Saya sedang membangun proyek bernama "Satu Data" — platform manajemen rekam medis
berbasis blockchain yang memberikan hak kontrol penuh kepada pasien atas data
kesehatan mereka. Rumah sakit/tenaga medis harus mendapat izin eksplisit dari
pasien sebelum bisa mengakses atau memperbarui data medis pasien tersebut.

## Core Objectives
- Data Ownership: pasien adalah pemilik tunggal data medisnya
- Granular Access Control: pasien bisa memberi, menolak, atau mencabut akses kapan saja
- Audit Trail: setiap permintaan & pemberian akses tercatat permanen di blockchain
- Cost Sharing: rumah sakit menanggung gas fee saat meminta akses data
- satu User sama dengan satu wallet

## User & Auth Model
- Pasien: bisa login atau daftar email/password (Web2) + hubungkan wallet MetaMask (1 user = 1 wallet)
  Aktivitas: lihat riwayat medis, terima notifikasi permintaan akses, approve/reject, revoke akses
- Rumah Sakit/Dokter: login akun institusi terverifikasi + wallet address institusi
  Aktivitas: request akses data pasien, upload rekam medis baru (setelah diizinkan), bayar gas fee

## Alur Kerja Utama
1. RS input ID Pasien/wallet address pasien → kirim request akses (transaksi blockchain, bayar gas fee)
2. Pasien menerima notifikasi → approve via MetaMask atau web (ubah status consent smart contract jadi true)
3. Backend Express.js cek status smart contract → jika true, ambil data dari MySQL, dekripsi, tampilkan ke dashboard RS
4. Pasien bisa klik "Tarik Data" kapan saja → transaksi ubah status consent jadi false → RS kehilangan akses
5. RS bisa lihat dan upload data rekap medis baru setelah diizinkan
6. Menggunakan sistem microservice Pertama 1 folder berisi blockchain dan node js untuk running, 1 folder berisi express js, dan 1 folder berisi next js
7. Alur penerapan Harus dari Blockchain  Express JS   Next Js

## Tech Stack
- Frontend: Next.js (App Router) + Tailwind CSS + Ethers.js / Wagmi (integrasi MetaMask)
- Backend API: Express.js + Node.js (jembatan off-chain, pengelola enkripsi)
- Blockchain: Hardhat + Solidity (smart contract)
- Database: MySQL (via XAMPP untuk lokal)

## Smart Contract Blueprint (Solidity)
Struktur dasar (silakan kembangkan lebih lanjut sesuai kebutuhan fitur):

pragma solidity ^0.8.20;

contract SatuData {
    struct AccessRequest {
        bool isApproved;
        uint256 expiryTime;
        string dataHash; // pointer ke data spesifik di off-chain
    }

    mapping(address => mapping(address => AccessRequest)) public permissions;

    event AccessRequested(address indexed patient, address indexed hospital);
    event AccessGranted(address indexed patient, address indexed hospital);
    event AccessRevoked(address indexed patient, address indexed hospital);

    function requestAccess(address _patient) public payable {
        emit AccessRequested(_patient, msg.sender);
    }

    function grantAccess(address _hospital, string memory _dataHash) public {
        permissions[msg.sender][_hospital] = AccessRequest(true, block.timestamp + 1 days, _dataHash);
        emit AccessGranted(msg.sender, _hospital);
    }

    function revokeAccess(address _hospital) public {
        permissions[msg.sender][_hospital].isApproved = false;
        emit AccessRevoked(msg.sender, _hospital);
    }
}

## Keamanan & Privasi
- Data medis di MySQL WAJIB dienkripsi (AES-256) di level Express.js sebelum disimpan,
  jangan simpan sebagai plain text
- Kunci dekripsi diturunkan dari signature MetaMask pasien
- Saat status di blockchain berubah jadi false, backend Express.js harus secara ketat
  menolak permintaan API dari RS terkait (double-check, jangan cuma andalkan smart contract)

## Fitur Utama
Modul Pasien:
- Register dan login
- Wallet Integration (hubungkan akun dengan MetaMask)
- Consent Manager Panel (daftar RS yang minta/punya akses + tombol Approve/Revoke dan read permintaan akses )
- Medical History Timeline (lihat rekam medis sendiri termasuk Riwayat penyakit, tersimpan off-chain)
- Pasien bisa klik Revoke kapanpun jika sudah tidak mau datanya diakses oleh RS tersebut
- Audit log

## Modul Rumah Sakit:
- Login dan Register
- Connect Wallet
- Request Access Form (input wallet address pasien + jenis data yang diminta: Umum/Lab/Radiologi)
- Upload Medical Record (setelah pasien beri izin tulis/write access)
- Melihat status request
- Patient Data Viewer (baca data pasien selama izin aktif)
- Riwayat upload
- Audit log

## Modul Admin ( Opsional )
-	Verifikasi rumah sakit 
-	Manajemen user 
-	Monitoring 
-	Dashboard

## Security Analisis keamanan: 
-	AES-256 
-	JWT 
-	Refresh Token 
-	Helmet 
-	Rate Limit 
-	SQL Injection 
-	XSS 
-	CSRF 
-	Input Validation 
-	Wallet Signature 
-	Replay Attack 
-	Private Key 
-	Signature Verification 
-	Environment Variable 
-	Role Based Access Control

## Audit Log Lengkap Catat setiap aktivitas: 
-	Siapa mengakses 
-	Kapan 
-	Dari rumah sakit mana 
-	Data apa yang dibuka 
-	Status berhasil atau gagal

Semua comment kode dan label UI menggunakan Bahasa Indonesia.

Tolong bantu saya membangun proyek ini secara bertahap mengikuti milestone berikut.
Jangan kerjakan semua sekaligus — konfirmasi tiap milestone selesai sebelum lanjut
ke milestone berikutnya, kecuali saya minta lanjut otomatis. 
