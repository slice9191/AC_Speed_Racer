import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";

export default function DownloadPage() {
  const { data: session, status } = useSession();
  const [hasAccess, setHasAccess] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAccessAndGetLink = async () => {
      if (status === "authenticated" && session?.user?.id) {
        try {
          const roleCheck = await fetch(`/api/check-role?userId=${session.user.id}`);
          const { access } = await roleCheck.json();

          if (access) {
            setHasAccess(true);
            const res = await fetch("/api/get-download-url?file=Thunderhead-2.0.zip");
            const data = await res.json();
            setDownloadUrl(data.url);
          }
        } catch (err) {
          console.error("Error verifying access or fetching URL:", err);
        } finally {
          setLoading(false);
        }
      } else if (status !== "loading") {
        setLoading(false);
      }
    };

    checkAccessAndGetLink();
  }, [session, status]);

  const containerStyle = {
    backgroundImage: `url('/bg.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '2rem',
    color: 'white'
  };

  const boxStyle = {
    backgroundColor: 'rgba(0,0,0,0.75)',
    padding: '2rem',
    borderRadius: '16px',
    maxWidth: '500px',
    width: '100%',
  };

  if (loading) {
    return (
      <div style={containerStyle}>
        <div style={boxStyle}>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div style={containerStyle}>
        <div style={boxStyle}>
          <h2>🔐 Subscribers Only</h2>
          <p>Please log in with Discord to access your download.</p>
          <button
            onClick={() => signIn("discord")}
            style={{
              background: "#5865F2",
              color: "#fff",
              border: "none",
              padding: "0.75rem 1.5rem",
              borderRadius: "8px",
              fontSize: "16px",
              cursor: "pointer",
              marginTop: "1rem"
            }}
          >
            Log in with Discord
          </button>
        </div>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div style={containerStyle}>
        <div style={boxStyle}>
          <h2>🚫 Access Denied</h2>
          <p>You must be a subscriber to download this content.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={boxStyle}>
        <h1>🎉 Welcome, Subscriber!</h1>
        <p>Here’s your exclusive download:</p>
        <a
          href={downloadUrl}
          download
          style={{
            background: "#00b894",
            color: "#fff",
            padding: "0.75rem 1.25rem",
            borderRadius: "8px",
            textDecoration: "none",
            display: "inline-block",
            marginTop: "1.5rem",
            fontSize: "16px"
          }}
        >
          📦 Download Thunderhead v2.0
        </a>
      </div>
    </div>
  );
}
