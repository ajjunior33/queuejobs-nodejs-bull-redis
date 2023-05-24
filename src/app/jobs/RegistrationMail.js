import Mail from "../lib/Mail";

export default {
  key: "RegistrationMail",
  async handle({ data }) {
    const {
      user: { name, email },
    } = data;
    await Mail.sendMail({
      from: "Queue Test <queuetest@meraki.dev.br>",
      to: `${name} <${email}>`,
      subject: "Cadastro de usuario",
      html: `Ola, ${name}, bem-vindo ao sistema de filas.`,
    });
  },
};
