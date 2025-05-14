export default {
  async fetch(request, env, ctx) {
    try {
      const url = new URL(request.url);
      const key = decodeURIComponent(url.pathname.slice(1)); // remove leading slash

      console.log("Requested key:", key);

      const object = await env.MY_BUCKET.get(key);
      if (!object) {
        console.log("❌ Error fetching object: Not found");
        return new Response("Object not found", { status: 404 });
      }

      return new Response(object.body, {
        headers: {
          "Content-Type": object.httpMetadata?.contentType || "application/octet-stream",
          "Content-Disposition": `attachment; filename="${key}"`,
        },
      });

    } catch (err) {
      console.log("❌ Error fetching object:", err);
      return new Response("Error fetching object", { status: 500 });
    }
  }
}
