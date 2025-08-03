import "../../styles/global.css";

export default function Publicas() {
  return (
    <div className="main-content">
      <h1>Atividades desenvolvidas pela Comunhão Espírita Cristo Redentor</h1>

      <section>
        <table>
          <thead>
            <tr>
              <th>Dia da Semana</th>
              <th>Horário</th>
              <th>Atividade</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Segunda-feira</td><td>13:00h</td><td>AAMOR</td></tr>
            <tr><td>Segunda-feira</td><td>19:30h</td><td>Palestra</td></tr>
            <tr><td>Terça-feira</td><td>18:00h</td><td>Atividade mediúnica</td></tr>
            <tr><td>Terça-feira</td><td>19:00h</td><td>Estudo mediúnico</td></tr>
            <tr><td>Quarta-feira</td><td>19:00h</td><td>Estudo trabalhadores</td></tr>
            <tr><td>Quinta-feira</td><td>19:30h</td><td>Palestra</td></tr>
            <tr><td>Quinta-feira</td><td>19:30h</td><td>EADE</td></tr>
            <tr><td>Sexta-feira</td><td>19:00h</td><td>ESDE</td></tr>
            <tr><td>Sábado</td><td>15:00h</td><td>Evangelização infantojuvenil</td></tr>
            <tr><td>Domingo</td><td>07:30h</td><td>Campanha Auta de Souza (2º e último domingo)</td></tr>
          </tbody>
        </table>
      </section>

      <section>
        <h1>Palestras</h1>
        <p>A Comunhão Espírita Cristo Redentor realiza palestras públicas todas as segundas e quintas-feiras, às 19h30min. O atendimento fraterno inicia às 19h, e o passe acontece ao final das palestras.</p>

        <p>As palestras são realizadas por expositores experientes e abordam diversos temas da doutrina espírita, como:</p>

        <ul>
          <li><strong>A vida no plano espiritual:</strong> O que acontece depois da morte?</li>
          <li><strong>A reencarnação:</strong> Qual é o seu objetivo?</li>
          <li><strong>A mediunidade:</strong> Como se desenvolver?</li>
          <li><strong>O amor fraternal:</strong> Como praticar?</li>
          <li><strong>A caridade:</strong> O que é e como aplicar?</li>
        </ul>

        <p>A entrada é gratuita e aberta a todos.</p>
      </section>
    </div>
  );
}
