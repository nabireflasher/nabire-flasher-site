// netlify/functions/submit.js

const { createClient } = require("@supabase/supabase-js");

exports.handler = async (event, context) => {
  // Hanya terima metode POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    // Parsing data dari body request
    const data = JSON.parse(event.body);
    // Pastikan data memiliki field yang dibutuhkan:
    // IdPelanggan, NamaPelanggag, NoHp, Brand, Type, Kerusakan, Perbaikan, Biaya, StatusPerbaikan

    // Inisialisasi Supabase Client menggunakan environment variables
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Masukkan data ke tabel "repairs"
    const { error } = await supabase
      .from("repairs") // Ubah "repairs" jika nama tabel kamu berbeda
      .insert([
        {
          Id_Pelanggan: data.customerId,
          Nama_Pelanggan: data.customerName,
          No_hp: data.customerPhone,
          Brand: data.brand,
          Type: data.gadgetType,
          Kerusakan: data.damage,
          Perbaikan: data.repair,
          Biaya: data.cost,
          Status_Perbaikan: data.repairStatus,
        },
      ]);

    if (error) {
      console.error("Error inserting data:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Gagal menyimpan data ke database." }),
      };
    }

    // Jika berhasil, kembalikan pesan sukses
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Permintaan perbaikan berhasil diajukan dengan Id Pelanggan: " + data.customerId,
      }),
    };
  } catch (err) {
    console.error("Error processing request:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Terjadi kesalahan saat memproses data." }),
    };
  }
};
