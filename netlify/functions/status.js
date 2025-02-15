// netlify/functions/status.js

const { createClient } = require("@supabase/supabase-js");

exports.handler = async (event, context) => {
  // Ambil query parameter "trackingId"
  const { trackingId } = event.queryStringParameters;
  if (!trackingId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "trackingId dibutuhkan" }),
    };
  }

  try {
    // Inisialisasi Supabase Client menggunakan environment variables
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Query tabel "repairs" untuk mengambil kolom repair_status berdasarkan customer_id
    // Ganti "repairs" dengan nama tabel kamu jika berbeda
    const { data, error } = await supabase
      .from("repairs")
      .select("Status_Perbaikan")
      .eq("Id_Pelanggan", trackingId)
      .single();

    if (error) {
      console.error("Error querying Supabase:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Terjadi kesalahan saat mengambil data dari database." }),
      };
    }

    if (!data) {
      return {
        statusCode: 200,
        body: JSON.stringify({ status: "ID tidak ditemukan atau belum terdaftar" }),
      };
    }

    // Kembalikan status perbaikan dari data yang diambil
    return {
      statusCode: 200,
      body: JSON.stringify({ status: data.Status_Perbaikan }),
    };
  } catch (err) {
    console.error("Unexpected error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Terjadi kesalahan tak terduga." }),
    };
  }
};
