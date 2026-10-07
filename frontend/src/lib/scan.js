// Capturing a gym check-in code (see views/CheckIn.jsx). Two ways besides typing:
//   1. import a photo — decode a picture the user already has
//   2. scan with camera — the view opens components/CameraScan.jsx
//
// Photo import goes through lib/scan-web.js (BarcodeDetector where the browser has one,
// jsQR otherwise).
import { normalizeFmt } from './qr.js'
import { importCodeFromImageWeb } from './scan-web.js'

export async function scanCode() {
  throw new Error('Scanning is only available in the camera sheet')
}

export async function importCodeFromImage(file) {
  if (!file) return null
  return importCodeFromImageWeb(file)
}

export { normalizeFmt }
