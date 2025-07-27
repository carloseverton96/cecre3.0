import "../../styles/global.css";
import React from "react";

export default function Mediunicas() {
  return (
    <main className="main-content">
      <h1>Comunhão Espírita Cristo Redentor</h1>

      <section>
        <h2>História</h2>
        <p>
          Fundada em 18 de julho de 1988, a Comunhão Espírita Cristo Redentor – CECRE tem como finalidade o estudo, a difusão e a prática do Espiritismo no seu tríplice aspecto, tendo como lema: Liberdade, Igualdade e Fraternidade.
        </p>
        <p>
          Em seus 35 anos de existência, o CECRE realizou diversas atividades para a difusão do Espiritismo e ainda executa: palestras públicas, estudo sistematizado da Doutrina Espírita, estudo aprofundado, estudo mediúnico, harmonização dos trabalhadores, atendimento fraterno, Campanha de Fraternidade Auta de Souza, assistência a moradores de rua, Clube das Mães e evangelização infantojuvenil.
        </p>
      </section>

      <section>
        <h2>O Passe</h2>
        <p>
          O passe na casa espírita é uma prática espiritual que consiste na imposição das mãos com a intenção de transmitir energias positivas ao paciente. É uma forma de cura espiritual que pode aliviar sofrimentos físicos e emocionais.
        </p>
        <h3>Como funciona?</h3>
        <p>
          Realizado por um médium passista, treinado para essa tarefa, o passe envolve a colocação das mãos sobre o paciente, em diferentes partes do corpo, com concentração em transmitir paz e harmonia.
        </p>
        <h3>Finalidade</h3>
        <p>
          O objetivo do passe é promover cura física e emocional, aliviar dores e proporcionar bem-estar.
        </p>
      </section>

      <section>
        <h2>Evangelho no Lar</h2>

        <img
          src="/evangelho.png"
          alt="Evangelho no Lar"
          style={{ width: "120px", height: "auto", marginBottom: "1rem" }}
        />

        <h3>Roteiro Prático</h3>
        <p>
          O Evangelho no Lar é uma reunião familiar semanal para leitura e reflexão sobre os ensinamentos cristãos. Promove crescimento espiritual e equilíbrio no ambiente doméstico.
        </p>
        <p>
          Para implantá-lo: converse com a família, defina dia e horário, escolha uma mensagem inicial, leia o Evangelho Segundo o Espiritismo (aleatória ou sequencialmente), reflita sobre o texto e finalize com uma prece. Deixe uma jarra com água para fluidificação. A prática dura cerca de 15 a 20 minutos.
        </p>
      </section>

      <section>
        <h2>Livraria</h2>
        <p>
          A Livraria da Comunhão Espírita Cristo Redentor oferece diversas obras espíritas, incluindo os clássicos de Allan Kardec:
        </p>
        <ul>
          <li><b>O Livro dos Espíritos</b> – obra fundamental do espiritismo;</li>
          <li><b>O Livro dos Médiuns</b> – trata da mediunidade;</li>
          <li><b>O Evangelho Segundo o Espiritismo</b> – estudo moral cristão à luz da doutrina;</li>
          <li><b>O Céu e o Inferno</b> – reflexões sobre a vida após a morte;</li>
          <li><b>A Gênese</b> – aborda a origem do universo e da humanidade.</li>
        </ul>
        <p>
          Também há diversas outras obras disponíveis. Visite a Biblioteca Chico Xavier, onde você pode pegar livros emprestados para leitura e devolução.
        </p>
      </section>
    </main>
  );
}
