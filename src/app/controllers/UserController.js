import Queue from "../lib/Queue";
export default {
  async store(request, response) {
    const { name, email, password } = request.body;
    const user = {
      name,
      email,
      password,
    };

    //Adicionar job RegistrationMail na fila

    await Queue.add("RegistrationMail", { user });

    return response.json(user);
  },
};
