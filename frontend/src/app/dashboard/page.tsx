"use client";
import { useEffect, useState, useRef } from "react";

// Simple auth configurable por variables de entorno
const USER = process.env.NEXT_PUBLIC_DASHBOARD_USER || "admin";
const PASS = process.env.NEXT_PUBLIC_DASHBOARD_PASS || "admin123";
const MAX_ATTEMPTS = 5;
import io from "socket.io-client";

interface Message {
  id: number;
  from: string;
  to: string;
  body: string;
  timestamp: number;
}

interface Conversation {
  id: number;
  usuario: string;
  ultimoMensaje: string;
  timestamp: number;
}

export default function Dashboard() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [loading, setLoading] = useState(false);
  const socketRef = useRef<any>(null);

  // Mantener sesión con localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("dashboard_auth");
      if (stored === "true") setAuth(true);
    }
  }, []);

  useEffect(() => {
    if (!auth) return;
    localStorage.setItem("dashboard_auth", "true");
    fetch("/api/conversations")
      .then((res) => res.json())
      .then(setConversations);
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";
    socketRef.current = io(backendUrl);
    socketRef.current.on("new-message", (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
      setConversations((prev) => {
        const idx = prev.findIndex((c) => c.id === msg.id);
        if (idx !== -1) {
          const updated = [...prev];
          updated[idx] = {
            ...updated[idx],
            ultimoMensaje: msg.body,
            timestamp: msg.timestamp,
          };
          return updated;
        }
        return [
          {
            id: msg.id,
            usuario: msg.from,
            ultimoMensaje: msg.body,
            timestamp: msg.timestamp,
          },
          ...prev,
        ];
      });
    });
    return () => socketRef.current?.disconnect();
  }, [auth]);

  // Cargar historial real de mensajes al seleccionar conversación
  useEffect(() => {
    if (selected && auth) {
      fetch(`/api/messages/${selected}`)
        .then((res) => res.json())
        .then(setMessages);
    }
  }, [selected, auth]);

  const handleSend = async () => {
    if (!input.trim() || !selected) return;
    const msg: Message = {
      id: selected,
      from: "Agente",
      to: conversations.find((c) => c.id === selected)?.usuario || "",
      body: input,
      timestamp: Date.now(),
    };
    socketRef.current.emit("send-message", msg);
    setInput("");
  };

  if (!auth) {
    return (
      <div style={{ display: "flex", height: "100vh", alignItems: "center", justifyContent: "center", background: "#f4f7fa" }}>
        <form
          onSubmit={e => {
            e.preventDefault();
            setLoading(true);
            if (!user.trim() || !pass.trim()) {
              setError("Usuario y contraseña requeridos");
              setLoading(false);
              return;
            }
            if (attempts >= MAX_ATTEMPTS) {
              setError("Demasiados intentos. Intenta más tarde.");
              setLoading(false);
              return;
            }
            if (user === USER && pass === PASS) {
              setAuth(true);
              setError("");
              setAttempts(0);
              localStorage.setItem("dashboard_auth", "true");
            } else {
              setAttempts(a => a + 1);
              setError("Credenciales incorrectas");
            }
            setLoading(false);
          }}
          style={{ background: "#fff", padding: 32, borderRadius: 12, boxShadow: "0 2px 16px rgba(0,0,0,0.08)", minWidth: 320 }}
        >
          <h2 style={{ marginBottom: 24, textAlign: "center" }}>Iniciar sesión</h2>
          <input
            type="text"
            placeholder="Usuario"
            value={user}
            onChange={e => setUser(e.target.value)}
            style={{ width: "100%", marginBottom: 12, padding: 10, borderRadius: 6, border: error && !user ? "1px solid #d32f2f" : "1px solid #ccc", fontSize: 16 }}
            autoFocus
            disabled={loading || attempts >= MAX_ATTEMPTS}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={pass}
            onChange={e => setPass(e.target.value)}
            style={{ width: "100%", marginBottom: 12, padding: 10, borderRadius: 6, border: error && !pass ? "1px solid #d32f2f" : "1px solid #ccc", fontSize: 16 }}
            disabled={loading || attempts >= MAX_ATTEMPTS}
          />
          {error && <div style={{ color: "#d32f2f", marginBottom: 12 }}>{error}</div>}
          <button type="submit" style={{ width: "100%", background: "#25d366", color: "#fff", border: "none", borderRadius: 6, padding: 12, fontWeight: 600, fontSize: 16, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }} disabled={loading || attempts >= MAX_ATTEMPTS}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
          {attempts > 0 && attempts < MAX_ATTEMPTS && (
            <div style={{ color: "#aaa", marginTop: 8, fontSize: 13 }}>Intentos restantes: {MAX_ATTEMPTS - attempts}</div>
          )}
        </form>
      </div>
    );
  

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "sans-serif" }}>
      <aside style={{ width: 320, background: "#f7f7f7", borderRight: "1px solid #eee", overflowY: "auto" }}>
        <header style={{ padding: 16, fontWeight: 700, fontSize: 20, borderBottom: "1px solid #eee" }}>Conversaciones</header>
        <button
          onClick={() => {
            setAuth(false);
            setUser("");
            setPass("");
            setError("");
            setAttempts(0);
            localStorage.removeItem("dashboard_auth");
          }}
          style={{ margin: 16, background: "#eee", color: "#333", border: "none", borderRadius: 6, padding: 8, fontWeight: 600, fontSize: 15, cursor: "pointer", width: "90%" }}
        >
          Cerrar sesión
        </button>
        {conversations.map((c) => (
          <div
            key={c.id}
            onClick={() => setSelected(c.id)}
            style={{
              padding: 16,
              cursor: "pointer",
              background: selected === c.id ? "#e0e0e0" : undefined,
              borderBottom: "1px solid #eee",
            }}
          >
            <div style={{ fontWeight: 600 }}>{c.usuario}</div>
            <div style={{ color: "#555", fontSize: 14 }}>{c.ultimoMensaje}</div>
            <div style={{ color: "#aaa", fontSize: 12 }}>{new Date(c.timestamp).toLocaleString()}</div>
          </div>
        ))}
      </aside>
      <main style={{ flex: 1, background: "#fff", display: "flex", flexDirection: "column", height: "100vh" }}>
        {selected ? (
          <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <header style={{ padding: 16, borderBottom: "1px solid #eee", fontWeight: 600 }}>
              Chat con {conversations.find((c) => c.id === selected)?.usuario}
            </header>
            <div style={{ flex: 1, overflowY: "auto", padding: 24, background: "#f4f7fa" }}>
              {messages
                .filter((m) => m.id === selected)
                .map((m, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: m.from === "Agente" ? "flex-end" : "flex-start",
                      marginBottom: 12,
                    }}
                  >
                    <div
                      style={{
                        background: m.from === "Agente" ? "#d1f5d3" : "#fff",
                        borderRadius: 16,
                        padding: "10px 18px",
                        maxWidth: 360,
                        boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                        fontSize: 16,
                      }}
                    >
                      {m.body}
                      <div style={{ fontSize: 11, color: "#aaa", marginTop: 4, textAlign: "right" }}>
                        {new Date(m.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <footer style={{ padding: 16, borderTop: "1px solid #eee", display: "flex", gap: 8 }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe un mensaje..."
                style={{ flex: 1, borderRadius: 20, border: "1px solid #ccc", padding: "10px 16px", fontSize: 16 }}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                onClick={handleSend}
                style={{ background: "#25d366", color: "#fff", border: "none", borderRadius: 20, padding: "10px 24px", fontWeight: 600, fontSize: 16, cursor: "pointer" }}
              >
                Enviar
              </button>
            </footer>
          </div>
        ) : (
          <div style={{ color: "#aaa", margin: "auto" }}>Selecciona una conversación</div>
        )}
      </main>
    </div>
  );
}

  }
