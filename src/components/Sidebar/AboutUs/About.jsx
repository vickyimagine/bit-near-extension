import React from "react";
import "./About.css";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import engJs from "../../../Constants/en";
import spainJs from "../../../Constants/es";

import {PiArrowBendUpLeftBold} from "react-icons/pi";

const About = () => {
  const {lang} = useSelector(state => state.wallet);

  const aboutTxt = lang === "en" ? engJs.aboutUs : spainJs.aboutUs;
  return (
    <div className='flex flex-col items-start w-full space-y-3'>
      <Link
        to='/homescreen'
        className=' w-fit self-start'>
        <PiArrowBendUpLeftBold
          fontSize={28}
          color='white'
        />
      </Link>
      <h1 className='text-5xl text-white font-semibold'>{aboutTxt}</h1>
      <p className='text-xl font-semibold text-white'>
        {lang === "en" ? "About" : "Sobre"} Beyond Imagination Technologies
      </p>
      <div className='about text-white overflow-y-scroll cursor-default'>
        {lang === "en"
          ? "Beyond Imagination Technologies (BIT) was founded as the first Indian start-up with the idea of nurturing the Blockchain/Web3 technology and building cost-effective, safe and secure solutions that fit the market needs and help address the major market problems in all possible classes and verticals of organisations, thereby creating a conducive environment for its fair growth and development in India. Within a short span, Beyond Imagination has grown in leaps and bounds. They have signed joint development programs with highly esteemed institutions in India within a few months of starting operations and are also increasingly engaging with large corporations, high-net-worth individuals, and big institutions. Enabling a cost-effective and easy transition for users from web 2.0 to web 3.0 has been one of the major reasons for their success. They have successfully bridged the gap between market need and the use of blockchain-aided solutions for sustainable business growth by providing tailored solutions to start-ups, enterprises, and governments and helping them solve pain points in their ecosystems . Currently, BIT has many pilots and production-ready applications such as Smart Contracting, Credential Management, and Digital Certificate Issuing Platform, to name a few, tailored for different sectors and government bodies."
          : "Beyond Imagination Technologies (BIT) fue fundada como la primera start-up india con la idea de nutrir la tecnología Blockchain/Web3 y construir soluciones rentables, seguras y protegidas que se ajusten a las necesidades del mercado y ayuden a abordar los principales problemas del mercado en todas las clases y verticales posibles de organizaciones, creando así un entorno propicio para su crecimiento y desarrollo justos en la India. En poco tiempo, Beyond Imagination ha crecido a pasos agigantados. Han firmado programas de desarrollo conjuntos con instituciones de gran prestigio en la India a los pocos meses de iniciar sus operaciones y también se están comprometiendo cada vez más con las grandes empresas, individuos de alto patrimonio neto, y las grandes instituciones. Una de las principales razones de su éxito ha sido facilitar a los usuarios una transición rentable y sencilla de la web 2.0 a la 3.0. Han conseguido salvar la brecha entre las necesidades del mercado y el uso de soluciones basadas en blockchain para el crecimiento sostenible de las empresas, proporcionando soluciones a medida a start-ups, empresas y gobiernos, y ayudándoles a resolver los puntos débiles de sus ecosistemas. En la actualidad, BIT cuenta con numerosos proyectos piloto y aplicaciones listas para la producción, como Smart Contracting, Credential Management y Digital Certificate Issuing Platform, por nombrar algunas, adaptadas a diferentes sectores y organismos gubernamentales."}
      </div>
    </div>
  );
};

export default About;
