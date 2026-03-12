<?php
header('Content-Type: application/json');

// Pastikan request adalah POST (seperti yang nanti dikirim oleh AJAX)
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Karena kita akan menerima data berformat JSON dari fetch() JS, 
    // kita tangkap isinya menggunakan file_get_contents('php://input')
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    $name = isset($data['name']) ? htmlspecialchars(strip_tags($data['name'])) : '';
    $email = isset($data['email']) ? htmlspecialchars(strip_tags($data['email'])) : '';
    $message = isset($data['message']) ? htmlspecialchars(strip_tags($data['message'])) : '';

    // Validasi sederhana
    if (empty($name) || empty($email) || empty($message)) {
        echo json_encode(["status" => "error", "message" => "Semua field harus diisi!"]);
        exit;
    }

    // Simulasi sukses tersimpan / terkirim
    // Di dunia nyata, Anda bisa menyimpan ini ke MySQL menggunakan fungsi PDO/MySQLi
    // atau menggunakan mail() function untuk mengirim email.

    echo json_encode([
        "status" => "success", 
        "message" => "Terima kasih, $name! Pesan Anda telah berhasil dikirim."
    ]);
} else {
    echo json_encode(["status" => "error", "message" => "Metode request tidak diizinkan."]);
}
?>
