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
    // customerId, customerName, customerPhone, brand, gadgetType, damage, repair, cost, repairStatus

    // Inisialisasi Supabase Client menggunakan environment variables
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Masukkan data ke tabel "repairs"
    const { error } = await supabase
      .from("repairs") // Ubah "repairs" jika nama tabel kamu berbeda
      .insert([
        {
          customer_id: data.customerId,
          customer_name: data.customerName,
          customer_phone: data.customerPhone,
          brand: data.brand,
          gadget_type: data.gadgetType,
          damage: data.damage,
          repair: data.repair,
          cost: data.cost,
          repair_status: data.repairStatus,
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
