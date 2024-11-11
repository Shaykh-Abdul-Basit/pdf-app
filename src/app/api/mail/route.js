import nodemailer from "nodemailer";
import puppeteer from "puppeteer";
import { promises as fs } from "fs";
import { NextResponse } from "next/server";
import handlebars from "handlebars";
import path from "path";
import { PassThrough } from "stream";

export async function POST(request) {
  const body = await request.json();
  console.log("Contact us Api Request", body);

  const bodys = {
    customer: {
      name: "John Doe",
      email: "john.doe@example.com"
    },
    order: {
      id: "12345",
      date: "2024-08-27",
      items: [
        { name: "Widget", price: "19.99" },
        { name: "Gadget", price: "29.99" }
      ],
      shipping: {
        address: "123 Elm Street",
        city: "Springfield"
      }
    }
  };

  const htmlFilePath = path.resolve(process.cwd(), 'src/app/pdf/pdf.html');
  const htmlContent = await fs.readFile(htmlFilePath, "utf8");

 // Compile the HTML template with Handlebars
 const templatess = handlebars.compile(htmlContent);
 const htmlToSend = templatess(bodys);

  let pdfBytes;
  try {
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.setContent(htmlToSend);
    pdfBytes = await page.pdf({ format: "A4" });
    await browser.close();
  } catch (error) {
    console.error("Error generating PDF:", error);
    return NextResponse.json({ error: "Error generating PDF" }, { status: 500 });
  }

  const templatePath = path.resolve(process.cwd(), 'src/app/templates/emailtemplate.hbs');
  const templateSource = await fs.readFile(templatePath, "utf8");

  const template = handlebars.compile(templateSource);
  const templateData = {
    name: "John Doe",
    productName: "Amazing Product",
  };
  const htmlTemplate = template(templateData);

  const transporter = nodemailer.createTransport({
    host: "mail.safdarebay.com",
    port: 465,
    secure: true,
    auth: {
      user: "test@safdarebay.com",
      pass: "rT5pYiN0){Pc",
    },
  });

  try {
    const info = await transporter.sendMail({
      from: "test@safdarebay.com",
      to: "basitsheikh53@gmail.com",
      subject: "Order Notification Confirmation Message -- Website",
      html: htmlTemplate,
      attachments: [
        {
          filename: "invoice.pdf",
          content: pdfBytes,
          contentType: "application/pdf",
        },
      ],
    });

    console.log("Message sent: %s", info.messageId);
    return NextResponse.json({ msg: "Send Success" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Error sending email" }, { status: 500 });
  }
}
