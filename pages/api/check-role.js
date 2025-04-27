   import axios from "axios";

export default async function handler(req, res) {
  const { userId } = req.query;

  const GUILD_ID = "1360057745147035940";
  const REQUIRED_ROLE = "1360059120551727346";
  const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;

  try {
    const response = await axios.get(
      `https://discord.com/api/guilds/${GUILD_ID}/members/${userId}`,
      {
        headers: {
          Authorization: `Bot ${BOT_TOKEN}`,
        },
      }
    );

    console.log("User ID:", userId);
    console.log("Roles on user:", response.data.roles);
    console.log("Expected Role:", REQUIRED_ROLE);

    const hasRole = response.data.roles.includes(REQUIRED_ROLE);
    res.status(200).json({ access: hasRole });

  } catch (error) {
    console.error("Error fetching member data:", error.response?.data || error.message);
    res.status(403).json({ access: false });
  }
}
