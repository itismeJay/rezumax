// lib/pdf/simple-generator.ts

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export async function generatePDFFromElement(
  elementId: string,
  filename: string
): Promise<void> {
  // 1. Find the element
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Resume element not found');
  }

  // 2. Convert HTML to image
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
    onclone: (doc: Document) => {
      const style = doc.createElement('style');
      style.textContent = `
        *, *::before, *::after {
          color: #000000 !important;
          background-color: transparent !important;
          border-color: #000000 !important;
          outline-color: #000000 !important;
          text-decoration-color: #000000 !important;
          caret-color: #000000 !important;
          column-rule-color: #000000 !important;
          fill: #000000 !important;
          stroke: #000000 !important;
        }
        body, html {
          background-color: #ffffff !important;
        }
      `;
      doc.head.appendChild(style);
    },
  });

  // 3. Get dimensions
  const imgWidth = 816;
  const imgHeight = 1056;
  const imgData = canvas.toDataURL('image/jpeg', 0.95);

  // 4. Create PDF
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'px',
    format: [imgWidth, imgHeight],
  });

  // 5. Add image to PDF
  pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);

  // 6. Download
  pdf.save(filename);
}