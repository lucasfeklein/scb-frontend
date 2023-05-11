import { Feature } from "@/types/feature";
import { FaCodeBranch, FaCopy, FaRobot } from 'react-icons/fa';

const featuresData: Feature[] = [
  {
    id: 1,
    icon: <FaCopy className="text-4xl" />,
    title: "Copie a URL do seu site",
    paragraph:
      "Apenas copie a URL do seu site para começar. Nós iremos buscar e preparar automaticamente os dados para treinamento.",
  },
  {
    id: 2,
    icon: <FaRobot className="text-4xl" />,
    title: "Treine o chatbot",
    paragraph:
      "Treine seu chatbot com inteligência artificial baseado nas informações do seu site com apenas um clique.",
  },
  {
    id: 3,
    icon: <FaCodeBranch className="text-4xl" />,
    title: "Adicione o código no seu site",
    paragraph:
      "Para incorporar o chatbot ao seu site, basta adicionar um pequeno código.",
  },
];
export default featuresData;
