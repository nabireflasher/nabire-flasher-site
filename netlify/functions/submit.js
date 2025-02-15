exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" })
    };
  }
  
  const body = JSON.parse(event.body);
  // Lakukan logika untuk menyimpan data ke database
  // Untuk contoh, kita kembalikan pesan sukses:
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Permintaan perbaikan berhasil diajukan dengan Id Pelanggan: " + body.customerId })
  };
};
