import React, { useEffect, useState } from 'react';

interface Message {
  id: string;
  role: 'user' | 'system' | 'agent'| 'assistant';
  content: string;
}

interface QrCodeScannerProps {
  messages: Message[];
}

export default function QrCodeScanner({ messages }: QrCodeScannerProps) {
  const [qrImage, setQrImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQr = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3001/qr');
        if (!response.ok) {
          throw new Error('QR Code ainda não disponível');
        }
        const data = await response.json();
        setQrImage(data.qrImage);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        setQrImage(null);
      } finally {
        setLoading(false);
      }
    };

    fetchQr();
  }, []);

  if (loading) return <p>Carregando QR Code...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div className="space-y-4 py-2">
      <div className="flex flex-col space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                msg.role === 'user'
                  ? 'bg-luxfy-purple text-white'
                  : 'bg-gray-100 text-gray-800'
              } flex flex-col items-center`}
            >
              {msg.role === 'system' && msg.content === '__qr_code__' && qrImage ? (
                <>
                  <p className="text-center text-sm text-gray-700 mb-2">
                    Escaneie o QR Code para conectar seu WhatsApp:
                  </p>
                  <img src={qrImage} alt="QR Code WhatsApp" width={180} height={180} />
                </>
              ) : (
                msg.content
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
