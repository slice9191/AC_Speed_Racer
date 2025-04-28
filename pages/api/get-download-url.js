export default async function handler(req, res) {
    const { file } = req.query;
  
    if (!file) return res.status(400).json({ error: "Missing file name" });
  
    // ⚠️ Make sure your file is public in R2
    const publicUrl = `https://pub-868e0c5879a74d939d52af6ebd8a8dcc.r2.dev/StormLine%20Raceway%200.8.7z`;
  
    return res.status(200).json({ url: publicUrl });
  }
  