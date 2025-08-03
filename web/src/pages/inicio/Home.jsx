import "../../styles/global.css";
import React from "react";

export default function Home() {
  return (
    <main className="main-content">
      <h1>Comunhão Espírita Cristo Redentor</h1>

      <section>
        <h2>História</h2>
        <p>
          Fundada em 18 de julho de 1988, a Comunhão Espírita Cristo Redentor – CECRE tem como finalidade o estudo, a difusão e a prática do Espiritismo no seu tríplice aspecto, tendo como lema: Liberdade, Igualdade e Fraternidade.
        </p>
        <p>
          Em seus 35 anos de existência, o CECRE realizou diversas atividades para a difusão do Espiritismo e continua executando ações como palestras públicas, estudos da Doutrina Espírita (sistematizado, aprofundado e mediúnico), harmonização de trabalhadores, atendimento fraterno, Campanha de Fraternidade Auta de Souza, assistência a moradores de rua, Clube das Mães e evangelização infantojuvenil.
        </p>
      </section>


      <section>
        <h2>O Passe</h2>
        <p>
          O passe na casa espírita é uma prática espiritual que consiste na imposição das mãos com a intenção de transmitir energias positivas ao paciente. Trata-se de uma forma de cura espiritual que pode aliviar o sofrimento físico e emocional.
        </p>

        <h3>Como funciona?</h3>
        <p>
          O passe é aplicado por um médium passista — uma pessoa preparada para transmitir energias positivas. O passista impõe as mãos sobre o paciente e concentra-se em transmitir paz e harmonia.
        </p>

        <h3>Finalidade</h3>
        <p>
          O objetivo do passe é auxiliar na cura física e emocional, aliviar dores, melhorar o estado geral de saúde e promover o bem-estar.
        </p>
      </section>

      <section>
        <h2>Evangelho no Lar</h2>

        <img
          src="/evangelho.png"
          alt="Evangelho no Lar"
          style={{ width: "120px", height: "auto", marginBottom: "1rem" }}
        />

        <h3>Roteiro prático</h3>
        <p>
          O Evangelho no Lar é uma reunião semanal em família, com leitura e reflexão sobre os ensinamentos cristãos. Fortalece a espiritualidade e o equilíbrio no ambiente doméstico.
        </p>
        <p>
          Para implantá-lo: converse com a família, defina dia e horário, escolha uma mensagem inicial, abra o Evangelho Segundo o Espiritismo (aleatoriamente ou de forma sequencial), reflita sobre o conteúdo e finalize com uma prece. O encontro deve durar entre 15 e 20 minutos. Coloque uma jarra com água para fluidificação.
        </p>
      </section>

      <section>
        <h2>Livraria</h2>
        <p>
          A Livraria da Comunhão Espírita Cristo Redentor oferece uma ampla variedade de obras espíritas, incluindo os livros fundamentais de Allan Kardec:
        </p>
        <ul>
          <li><b>O Livro dos Espíritos</b> — base do Espiritismo;</li>
          <li><b>O Livro dos Médiuns</b> — sobre mediunidade;</li>
          <li><b>O Evangelho Segundo o Espiritismo</b> — interpretação cristã;</li>
          <li><b>O Céu e o Inferno</b> — vida após a morte;</li>
          <li><b>A Gênese</b> — sobre a origem do universo e humanidade.</li>
        </ul>
        <p>
          Além dessas, há diversas outras obras disponíveis. Visite também a Biblioteca Chico Xavier, onde é possível ler e devolver os livros após a leitura.
        </p>
      </section>
    </main>
  );
}
