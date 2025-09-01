import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import QRCode from "react-qr-code";
import axios from "axios";

const socket = io("http://localhost:3001", { transports: ["websocket"] });

interface Message {
  id: string;
  fromMe: boolean;
  remoteJid: string;
  body: string;
  createdAt: string;
}

export default function App() {
  const [qr, setQr] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("connecting");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    function onQr(payload: { qr: string }) {
      setQr(payload.qr);
      setStatus("scan_qr");
    }
    function onStatus(payload: { status: string }) {
      setStatus(payload.status || "unknown");
      if (payload.status === "ready") {
        setQr(null);
        loadMessages();
      }
    }

    socket.on("wa:qr", onQr);
    socket.on("wa:status", onStatus);

    return () => {
      socket.off("wa:qr", onQr);
      socket.off("wa:status", onStatus);
    };
  }, []);

  async function loadMessages() {
    const { data } = await axios.get<Message[]>("http://localhost:3001/api/messages");
    setMessages(data);
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 font-sans">
      <h1 className="text-2xl font-bold">Integração WhatsApp + IA</h1>

      <div className="p-4 rounded-xl shadow">
        <p className="mb-2">
          Status do WhatsApp Web:{" "}
          <b>{status === "scan_qr" ? "Aguardando leitura do QR" : status}</b>
        </p>

        {qr && (
          <div className="flex items-center gap-4">
            <QRCode value={qr} size={180} />
            <ol className="list-decimal">
              <li>Abra o WhatsApp no celular.</li>
              <li>Configurações &gt; Aparelhos conectados.</li>
              <li>Toque em “Conectar um aparelho” e escaneie o QR.</li>
            </ol>
          </div>
        )}
      </div>

      <div className="p-4 rounded-xl shadow">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold">Mensagens recentes</h2>
          <button
            onClick={loadMessages}
            className="px-3 py-1 rounded-lg shadow"
            title="Recarregar mensagens"
          >
            Atualizar
          </button>
        </div>

        {!messages.length && <p>Nenhuma mensagem ainda.</p>}

        <ul className="space-y-2">
          {messages.map((m) => (
            <li key={m.id} className="text-sm">
              <span className="opacity-60">
                {new Date(m.createdAt).toLocaleString()} —{" "}
              </span>
              <b>{m.fromMe ? "Você" : m.remoteJid}:</b> {m.body}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
