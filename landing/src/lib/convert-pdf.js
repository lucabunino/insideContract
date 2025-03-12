// src/routes/api/convert-pdf.js
import fs from 'fs';
import path from 'path';
import { pdfjs } from 'pdfjs-dist';

// Configura il worker di pdf.js
pdfjs.GlobalWorkerOptions.workerSrc = 
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.8.69/pdf.worker.min.js';

export async function GET() {
  const filePath = path.resolve('path/to/your/file.pdf');
  const pdfData = fs.readFileSync(filePath);

  const pdf = await pdfjs.getDocument({ data: pdfData }).promise;
  const images = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const scale = 2;
    const viewport = page.getViewport({ scale });

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({ canvasContext: context, viewport }).promise;
    images.push(canvas.toDataURL('image/png'));
  }

  return {
    body: { images },
  };
}