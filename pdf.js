var express = require('express');
const puppeteer = require('puppeteer');
var app = express();

app.listen(8080,function(){
   console.log("pdf generartor listening on port 8080");
  }
)

const generatePdf = async (req) => {
// Launch puppeteer
const browser = await puppeteer.launch({headless: true,
args: ['--no-sandbox', '--disable-setuid-sandbox']
});
// Open a new page with the headless browser
const page = await browser.newPage();

// Set content of page
const page1 = '<h1>HTML from page2</h1>';


await page.setContent(page1);
// await page.pdf({ path: './page2.pdf' });


// Print the page as pdf
const pdf = await page.pdf({ 
  printBackground: true, 
  format: 'Letter'
  //PreferCSSPageSize: true 
}); 

// Close the headless browser
browser.close();
return pdf;
}

app.post('/generatePdf', async function(req, res, next) {
   const pdf = await generatePdf(req);
   res.contentType("application/json");
   res.send(pdf);
  }
 ) 
