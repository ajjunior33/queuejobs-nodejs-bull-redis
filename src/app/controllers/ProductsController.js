import mockProducts from "../database/products.json";
import PdfPrinter from "pdfmake";
import { format, parseISO } from "date-fns";
import fs from "fs";
import Queue from "../lib/Queue";

export default {
  async index(request, response) {
    const products = mockProducts;
    return response.status(200).json({
      products,
      total: mockProducts.length,
    });
  },
  async report(request, response) {
    const { view } = request.query;
    const products = mockProducts;

    const body = [];

    for await (let product of products) {
      const rows = new Array();
      rows.push(product.id);
      rows.push(product.title);
      rows.push(product.description);
      rows.push(
        product.price.toLocaleString("en", {
          style: "currency",
          currency: "USD",
        })
      );
      body.push(rows);
    }

    const fonts = {
      Helvetica: {
        normal: "Helvetica",
        bold: "Helvetica-Bold",
        italics: "Helvetica-Oblique",
        bolditalics: "Helvetica-BoldOblique",
      },
    };
    const printer = new PdfPrinter(fonts);

    const now = new Date(Date.now());
    const nowBrazil = format(now, "dd/MM/yyyy HH:ii:ss");
    const docDefinations = {
      defaultStyle: { font: "Helvetica" },
      content: [
        {
          columns: [
            { text: "Relatorio de Produtos", style: "header" },
            { text: `${nowBrazil}\n\n`, style: "headerRight" },
          ],
        },
        {
          table: {
            body: [
              [
                { text: "ID", style: "columnsTitle" },
                { text: "TITULO", style: "columnsTitle" },
                { text: "DESCRICAO", style: "columnsTitle" },
                { text: "PRECO", style: "columnsTitle" },
              ],
              ...body,
            ],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 20,
          bold: true,
        },
        headerRight: {
          fontSize: 16,
          bold: true,
          alignment: "right",
        },
        columnsTitle: {
          fontSize: 15,
          bold: true,
          alignment: "center",
        },
      },
    };

    const pdfDoc = printer.createPdfKitDocument(docDefinations);

    if (!view || view === "false") {
      pdfDoc.pipe(fs.createWriteStream("relatorio.pdf"));
      const users = [
        {
          name: "Andre Souza",
          email: "andre@gmail.com",
        },
        {
          name: "Marcos Souza",
          email: "marcos@gmail.com",
        },
        {
          name: "Daniel Souza",
          email: "daniel@gmail.com",
        },
      ];

      Promise.all(users.map(async user => await Queue.add("SendReportMail", { user })));
      return response.status(200).json({
        message: "Realtorio gerado com sucesso.",
        status: true,
      });
    }

    const chunks = [];

    pdfDoc.on("data", (chunk) => {
      chunks.push(chunk);
    });
    pdfDoc.end();

    pdfDoc.on("end", () => {
      const result = Buffer.concat(chunks);
      return response.end(result);
    });
  },
};
