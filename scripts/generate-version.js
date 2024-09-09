import fs from 'fs';

const generateVersionInfo = () => {
  const now = new Date();
  const dateString = now.toISOString().split('T')[0];
  const timeString = now.toTimeString().split(' ')[0];

  const versionInfo = {
    version: `${dateString} ${timeString}`,
  };

  fs.writeFileSync('./public/api/version.json', JSON.stringify(versionInfo, null, 2));
};

generateVersionInfo();