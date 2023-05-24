import Mail from "../lib/Mail";
import path from "path";
export default {
  key: "SendReportMail",
  async handle({ data }) {
    const {
      user: { name, email },
    } = data;
    await Mail.sendMail({
      from: "Meraki Consultoria <andresouza@meraki.dev.br>",
      to: `${name} <${email}>`,
      subject: "Lista de Produtos em Estoque",
      html: `Ola, ${name}, essa e a lista de produtos em estoque. <br> At, Andre Souza`,
      attachments: [
        {
          filename: "report.pdf",
          path: path.resolve(__dirname, "..", "..", "..", "relatorio.pdf"),
        },
      ],
    });
  },
};
