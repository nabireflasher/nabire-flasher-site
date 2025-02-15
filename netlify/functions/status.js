exports.handler = async (event, context) => {
  const { trackingId } = event.queryStringParameters;
  if (!trackingId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "trackingId dibutuhkan" })
    };
  }
  
  // Di sini, lakukan logika untuk mendapatkan status perbaikan dari database
  // Untuk contoh, kita gunakan data dummy:
  const data = {
    status: "Sedang dalam perbaikan"
  };
  
  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
};
