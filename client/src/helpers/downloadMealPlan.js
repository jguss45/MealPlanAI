import { PDFDocument, rgb, StandardFonts, PageSizes } from 'pdf-lib';

export async function generatePDF(mealPlan) {
  const pdfDoc = await PDFDocument.create(); // Create a new PDF document
  //const { width, height } = PageSizes.A4; // Get the width and height of the A4 page
  //hardcoding width and height since dealing with bug related to PageSizes.A4 not functioning as expected
  const width = 595.28; 
  const height = 841.89;
  const pageMargin = 50; // Set the margin for the page
  const lineHeight = 27; // Set the line height for the text
  const maxLinesPerPage = Math.floor((height - 2 * pageMargin) / lineHeight); // Calculate the maximum lines that can fit on a page

  const pageContents = mealPlan.split('\n'); // Split the mealPlan into individual lines
  let linesRemaining = maxLinesPerPage; // Initialize the number of lines remaining on the current page
  let currentPage = pdfDoc.addPage([width, height]); // Add a new page to the PDF document
  let yOffset = height - pageMargin; // Set the initial y-coordinate for drawing text on the page

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica); // Embed the Helvetica font into the PDF document

  for (let i = 0; i < pageContents.length; i++) {
    const line = pageContents[i].trim(); // Get the current line and remove leading/trailing whitespace

    if (line === '') continue; // Skip empty lines

    const words = line.split(' '); // Split the line into individual words
    let lineChunks = ['']; // Initialize the line chunks array with an empty chunk
    let currentLine = 0; // Initialize the current line index

    for (let j = 0; j < words.length; j++) {
      const word = words[j];
      const currentChunk = lineChunks[currentLine];

      if (currentChunk === '') {
        lineChunks[currentLine] = word; // Add the word to the current chunk
      } else {
        const tempText = `${currentChunk} ${word}`;
        const textSize = font.widthOfTextAtSize(tempText, lineHeight); // Get the width of the current chunk with the new word

        if (textSize > width - 2 * pageMargin) {
          currentLine++; // Move to the next line
          lineChunks[currentLine] = word; // Start a new chunk with the word
        } else {
          lineChunks[currentLine] = tempText; // Add the word to the current chunk
        }
      }
    }

    if (linesRemaining - (currentLine + 1) < 0) {
      currentPage = pdfDoc.addPage([width, height]); // Add a new page if the current page is full
      yOffset = height - pageMargin; // Reset the y-coordinate for the new page
      linesRemaining = maxLinesPerPage; // Reset the number of lines remaining on the new page
    }

    const formattedLines = lineChunks.filter(Boolean); // Remove empty chunks
    const pageText = formattedLines.join('\n'); // Join the formatted lines with newline characters
    currentPage.drawText(pageText, {
      x: pageMargin,
      y: yOffset,
      size: lineHeight,
      font,
      color: rgb(0, 0, 0),
    }); // Draw the text on the current page

    yOffset -= lineHeight * (currentLine + 1); // Update the y-coordinate for the next line
    linesRemaining -= currentLine + 1; // Update the number of lines remaining on the current page
  }

  const pdfBytes = await pdfDoc.save(); // Save the PDF document as bytes
  return pdfBytes; // Return the generated PDF bytes
}

export default generatePDF;