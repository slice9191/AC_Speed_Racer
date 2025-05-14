export default async function handler(req, res) {
  const { file } = req.query;

  if (!file) {
    return res.status(400).json({ error: "Missing file name" });
  }

  const proxyUrl = `https://cloudflare-r2-proxy.slice919.workers.dev/${encodeURIComponent(file)}`;
  return res.status(200).json({ url: proxyUrl });
}
