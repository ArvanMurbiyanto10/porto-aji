<?php
// Endpoint ini hanya bertugas mengembalikan data JSON. Simulasi Database.
header('Content-Type: application/json');

$portfolio_data = [
    [
        "id" => 1,
        "title" => "Aplikasi Kasir",
        "description" => "Aplikasi kasir berbasis web untuk UMKM lokal.",
        "image" => "img/foto-aji2.jpeg"
    ],
    [
        "id" => 2,
        "title" => "Desain UI E-Commerce",
        "description" => "Desain antarmuka untuk toko online modern.",
        "image" => "https://via.placeholder.com/300x200?text=UI+E-Commerce"
    ],
    [
        "id" => 3,
        "title" => "Sistem Inventori",
        "description" => "Manajemen stok barang perpustakaan mini.",
        "image" => "https://via.placeholder.com/300x200?text=Sistem+Inventori"
    ]
];

// Ubah array PHP ke format JSON
echo json_encode($portfolio_data);
?>
