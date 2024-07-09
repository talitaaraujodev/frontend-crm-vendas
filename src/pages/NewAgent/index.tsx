import { ChangeEvent, useState } from "react";
import { agentService } from "../../services/agentService";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";

const NewAgentPage: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await agentService
      .createAgent(name, email)
      .then((response) => {
        const errors = response.errors;
        if (errors) {
          if (Array.isArray(errors)) {
            toast.error(errors[0]);
          } else if (typeof errors === "string") {
            toast.error(errors);
          }
          return;
        } else {
          toast.success("Agente criado com sucessso!");
          setName("");
          setEmail("");
        }
      })
      .catch((error) => {
        console.log("Error ao criar agente:", error);
        toast.error("Ocorreram erros internos ao enviar sua solicitação.");
      });
  };

  return (
    <div className="container mx-auto p-7">
      <div className="overflow-x-auto shadow-md rounded-md border-2 bg-white p-4">
        <h2 className="text-[#2d5bff] font-semibold text-xl">
          Criar Novo Agente
        </h2>
        <form action="" method="post" onSubmit={handleSubmit}>
          <div className="flex flex-col py-2">
            <label htmlFor="name" className="font-medium text-base pb-2">
              Nome
            </label>
            <input
              placeholder="Nome"
              type="text"
              name="name"
              id="name"
              className="outline-none border border-[#D7D7D7] rounded-md p-2 focus:border-[#2d5bff]"
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div className="flex flex-col py-2">
            <label htmlFor="email" className="font-medium text-base pb-2">
              E-mail
            </label>
            <input
              placeholder="E-mail"
              type="email"
              name="email"
              id="email"
              className="outline-none border border-[#D7D7D7] rounded-md p-2 focus:border-[#2d5bff]"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="flex items-center justify-end pt-4">
            <button
              className="bg-[#2d5bff] text-white font-normal rounded-md py-2 px-3 hover:opacity-80 transition-all cursor-pointer flex items-center space-x-1"
              type="submit"
            >
              <span> Enviar</span>

              <ArrowRight />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewAgentPage;
