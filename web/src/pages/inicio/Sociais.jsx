import "../../styles/global.css";
import autadesouza from "../../assets/autadesouza.png";

export default function Sociais() {
  return (
    <div className="main-content">
      <h1>Campanha de Fraternidade Auta de Souza</h1>

      <section>
        <p>
          A Campanha de Fraternidade Auta de Souza é uma iniciativa do movimento
          espírita, realizada também pela Comunhão Espírita Cristo Redentor, que visa
          promover a fraternidade e a solidariedade entre os seres humanos. A campanha
          ocorre mensalmente, no segundo e no último domingo do mês às 07:30h, e é
          aberta a todos.
        </p>

        <p>
          O objetivo da campanha é sensibilizar as pessoas para a importância da
          fraternidade, da solidariedade e da paz. Para isso, a campanha realiza uma
          série de atividades, iniciando com a leitura do regulamento, o canto do Hino
          da Alegria Cristã e a ida ao bairro planejado.
        </p>

        <p>
          Essa é uma iniciativa significativa que convida todos à reflexão sobre o
          valor dessas virtudes e ao compromisso com a construção de um mundo melhor.
          Além disso, é essencial para a manutenção de alguns trabalhos realizados pela
          casa.
        </p>

         
        <img
                      src={autadesouza}
                      alt="Segundo passo da solicitação"
                      className="mb-2  max-w-[50px]"
                    />
        
      </section>
    </div>
  );
}
