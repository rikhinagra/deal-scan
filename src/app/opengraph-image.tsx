import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import path from 'path'

export const alt = 'DealScan Smart Car Buying App'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const carBuffer = readFileSync(path.join(process.cwd(), 'public/porsche-og.jpg'))
  const carSrc = `data:image/jpeg;base64,${carBuffer.toString('base64')}`

  const badgeBuffer = readFileSync(path.join(process.cwd(), 'public/google-play-badge.png'))
  const badgeSrc = `data:image/png;base64,${badgeBuffer.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a0a0a',
          width: '1200px',
          height: '630px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Red left accent bar */}
        <div style={{ width: '8px', height: '630px', background: '#E8341C', display: 'flex', flexShrink: 0 }} />

        {/* Left: text branding */}
        <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '70px', gap: '18px', width: '520px' }}>
          <div style={{ fontSize: '86px', fontWeight: 900, color: '#ffffff', lineHeight: 1, display: 'flex' }}>
            DealScan
          </div>
          <div style={{ fontSize: '24px', color: '#999999', lineHeight: 1.4, display: 'flex' }}>
            Understand every number on your dealer offer sheet, instantly.
          </div>
          <img
            src={badgeSrc}
            width={240}
            height={71}
            alt="Get it on Google Play"
          />
        </div>

        {/* Right: Porsche 911 */}
        <img
          src={carSrc}
          width={650}
          height={250}
          alt=""
          style={{ marginLeft: '-20px', marginTop: '120px' }}
        />
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
