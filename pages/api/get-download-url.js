import { S3Client } from "@aws-sdk/client-s3";

const client = new S3Client({
  region: "auto",
  endpoint: "https://868e0c5879a74d939d52af6ebd8a8dcc.r2.cloudflarestorage.com",
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID,
secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY,

  },
});

export default async function handler(req, res) {
  const { file } = req.query;

  if (!file) return res.status(400).json({ error: "Missing file name" });

  try {
    const command = new GetObjectCommand({
      Bucket: "premium-access-files", // <- Replace with your actual bucket name
      Key: "Stormline Raceway 0.85.7z"
    });

    const url = await getSignedUrl(client, command, { expiresIn: 60 });
    return res.status(200).json({ url });

  } catch (error) {
  console.error("Error generating signed URL:", JSON.stringify(error, null, 2));
  return res.status(500).json({ error: "Could not generate URL" });
}

}
