import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 56,
          background: '#0A0F1F',
          color: '#F5F7FA',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '80px',
          backgroundImage:
            'radial-gradient(circle at top left, rgba(0,194,255,0.4), transparent 55%), radial-gradient(circle at bottom right, rgba(142,162,198,0.35), transparent 45%)'
        }}
      >
        <span style={{ fontSize: 24, letterSpacing: 6, color: '#8EA2C6', textTransform: 'uppercase' }}>
          ForgeIA Studio
        </span>
        <h1 style={{ marginTop: 24, maxWidth: '70%', lineHeight: 1.1 }}>
          Inteligência aplicada. Design que pensa. Código que resolve.
        </h1>
      </div>
    ),
    {
      width: 1200,
      height: 630
    }
  );
}
