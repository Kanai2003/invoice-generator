
import puppeteer from 'puppeteer';
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';

// generate pdf using HTML and data from request
async function generatePDF(invoiceData, total) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Invoice</title>
      <style>
        body {
          font-family: sans-serif;
          margin: 25px;
          padding: 5px;
          font-size: 14px;
        }
        table {
          width: 100%;
        }
        table, th, td {
          border: 1px solid black;
          border-collapse: collapse;
        }
        th, td {
          padding: 5px;
          text-align: left;
        }
        .text-right {
          text-align: right;
        }
        .table-div{
            margin-top: 30px;
        }
        .tc-div{
           position: absolute;
           bottom: 50px;
           padding: 5px;
        }
      </style>
    </head>
    <body>
        <div>
      <div>
        <h1>INVOICE GENERATOR</h1>
        <p>Levitation Infotech</p>
      </div>
      
      </div>
      <div class='table-div'>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Rate (INR)</th>
            <th>Total (INR)</th>
          </tr>
        </thead>
        <tbody>
          ${invoiceData.map((product) => `
            <tr>
              <td>${product.name}</td>
              <td>${product.quantity}</td>
              <td>${product.price}</td>
              <td class="text-right">${product.quantity * product.price}</td>
            </tr>
          `).join('')}
        </tbody>
        <tfoot>
          <tr>
            <th colspan="3">Total</th>
            <td class="text-right">${total}</td>
          </tr>
          <tr>
            <th colspan="3">GST (18%)</th>
            <td class="text-right">${total * 18 / 100}</td>
          </tr>
          <tr>
            <th colspan="3">Grand Total</th>
            <td class="text-right"><b>₹ ${total * 118 / 100}</b></td>
          </tr>
        </tfoot>
      </table>
      </div>
      <p>Valid Until: 31/03/2025</p>
      <div class='tc-div'>
        <h2>Terms and Conditions</h2>
        <p>We are happy to supply any further information you may need and trust that you call on us to fill your order, which will receive our prompt and careful attention.</p>
      </div>
    </body>
    </html>
  `;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(html);
  const buffer = await page.pdf({ format: 'A4' });

  await browser.close();

  return buffer;
}



export const createInvoicePDF = asyncHandler(async (req, res) => {
  const products = req.body.products;
  const userId = req.user._id;

  // console.log(products);
  if (!products || products.length === 0) {
    throw new ApiError(400, "Products are required");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "Invalid userId, login first");
  }
  // console.log(user)

  products.forEach((product)=>(
    // console.log(product),
    user.products.push(...products, {name:product.name, price:product.price, quantity:product.quantity })
  ))

  await user.save();

  const total = products.reduce((acc, product) => acc + (product.price * product.quantity), 0);

  const pdfBuffer = await generatePDF(products, total);

  return res.status(200).contentType('application/pdf').send(pdfBuffer)
});