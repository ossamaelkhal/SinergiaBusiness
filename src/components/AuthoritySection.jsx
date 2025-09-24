import React from 'react';

const AuthoritySection = () => {
  return (
    <section className="bg-secondary-hover py-16 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/3 flex justify-center">
            <div className="w-48 h-48 rounded-full bg-secondary-border flex items-center justify-center shadow-lg">
              <span className="text-secondary-text-secondary">Foto Profissional</span>
            </div>
          </div>
          <div className="lg:w-2/3">
            <h2 
              className="text-3xl sm:text-4xl font-bold text-secondary-text-primary mb-4"
              style={{ fontFamily: 'var(--font-family-sans)' }}
            >
              Uma Mensagem do Fundador
            </h2>
            <p className="text-lg text-secondary-text-secondary mb-4">
              "Eu passei anos no campo de batalha do B2B, frustrado com a prospecção manual e o alto custo de anúncios. Vi dezenas de empresas incríveis estagnarem por não terem um canal de aquisição previsível."
            </p>
            <p className="text-lg text-secondary-text-secondary mb-4">
              "A SinergIA nasceu dessa dor. Minha missão não é apenas entregar um software, mas sim um método comprovado que transformou a realidade de <strong>+350 empresas</strong> e que pode ser a peça que falta para o seu crescimento exponencial. Estamos juntos nessa jornada."
            </p>
            <div>
              <p className="font-bold text-secondary-text-primary text-lg">Manus, Fundador da SinergIA</p>
              <p className="text-secondary-text-secondary">Ex-Head de Parcerias, Vencedor do Prêmio "Top Growth 2023"</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthoritySection;
