export const getDriveFileId = (url) => {
  const patterns = [
    /\/d\/([a-zA-Z0-9_-]+)/,     // /file/d/{id}
    /[?&]id=([a-zA-Z0-9_-]+)/   // ?id={id}
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  return null;
}