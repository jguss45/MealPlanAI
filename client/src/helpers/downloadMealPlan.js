import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

async function generatePDF(mealPlan) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  
  page.setFontSize(12);
  page.drawText(mealPlan, {
    x: 50,
    y: page.getHeight() - 50,
    size: 12,
    font: await pdfDoc.embedFont(StandardFonts.Helvetica),
    color: rgb(0, 0, 0),
  });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}

export default generatePDF;