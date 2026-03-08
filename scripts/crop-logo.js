/**
 * One-off script: crops the standalone icon (leftmost, no text, no phone)
 * from the full logo mockup image.
 *
 * Usage (after copying your mockup into assets and installing sharp):
 *   npx sharp-cli crop 0 0 25% 100% assets/shrimp-talk-logo.png -o assets/shrimp-icon-cropped.png
 *
 * Or with Node and sharp:
 *   node scripts/crop-logo.js
 *
 * Expects: assets/shrimp-talk-logo.png (the 4-panel mockup)
 * Outputs: assets/shrimp-icon-only.png (just the left icon)
 */

const sharp = require('sharp');
const path = require('path');

const inputPath = path.join(__dirname, '..', 'assets', 'shrimp-talk-logo.png');
const outputPath = path.join(__dirname, '..', 'assets', 'shrimp-icon-cropped.png');

sharp(inputPath)
  .metadata()
  .then(({ width, height }) => {
    // Leftmost icon is roughly in the first 20–25% of the image
    const cropWidth = Math.round(width * 0.22);
    return sharp(inputPath)
      .extract({ left: 0, top: 0, width: cropWidth, height })
      .extend({
        right: Math.max(0, cropWidth - height),
        bottom: 0,
        background: { r: 255, g: 255, b: 255, alpha: 1 },
      })
      .toFile(outputPath);
  })
  .then(() => console.log('Cropped icon saved to assets/shrimp-icon-cropped.png'))
  .catch((err) => {
    console.error('Error:', err.message);
    process.exit(1);
  });
