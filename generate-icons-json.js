const fs = require('fs');
const path = require('path');

const iconsDir = path.join(__dirname, 'src/assets/icons/ui-kit-icons');
const outputPath = path.join(__dirname, 'src/assets/icons/icons.json');

const icons = {};

fs.readdirSync(iconsDir).forEach(file => {
  if (file.endsWith('.svg')) {
    const iconName = path.basename(file, '.svg');
    const svgContent = fs.readFileSync(path.join(iconsDir, file), 'utf8');
    icons[iconName] = svgContent;
  }
});

fs.writeFileSync(outputPath, JSON.stringify(icons, null, 2));
console.log(`Icons JSON успешно создан в: ${outputPath}`);
