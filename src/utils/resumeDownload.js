import resumePdf from '../assets/Yash_Gaikwad_Developer_Resume.pdf';

/**
 * Direct Resume Download Handler for Yash Gaikwad
 * Fetches the resume as a blob to guarantee the browser saves it as
 * 'Yash_Gaikwad_Developer_Resume.pdf' across all browsers.
 */
export async function downloadResume() {
  const fileName = 'Yash_Gaikwad_Developer_Resume.pdf';
  const fileUrl = resumePdf || '/Yash_Gaikwad_Developer_Resume.pdf';

  try {
    const response = await fetch(fileUrl);
    if (!response.ok) throw new Error('Network response was not ok');
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  } catch {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
