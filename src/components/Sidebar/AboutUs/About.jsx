import React from "react";
import "./About.css";
import {Link} from "react-router-dom";

import {IoMdArrowRoundBack} from "react-icons/io";

const About = () => {
  return (
    <div className='flex flex-col items-start w-full space-y-3'>
      <Link
        to='/homescreen'
        className='bit-btn w-fit self-start'>
        <IoMdArrowRoundBack fontSize={21} />
      </Link>
      <h1 className='text-5xl text-white font-semibold'>About Us</h1>
      <p className='text-xl font-semibold text-white'>
        About Beyond Imagination Technologies
      </p>
      <div className='about text-white overflow-y-scroll cursor-default'>
        Beyond Imagination Technologies (BIT) was founded as the first Indian start-up
        with the idea of nurturing the Blockchain/Web3 technology and building
        cost-effective, safe and secure solutions that fit the market needs and help
        address the major market problems in all possible classes and verticals of
        organisations, thereby creating a conducive environment for its fair growth and
        development in India. Within a short span, Beyond Imagination has grown in leaps
        and bounds. They have signed joint development programs with highly esteemed
        institutions in India within a few months of starting operations and are also
        increasingly engaging with large corporations, high-net-worth individuals, and big
        institutions. Enabling a cost-effective and easy transition for users from web 2.0
        to web 3.0 has been one of the major reasons for their success. They have
        successfully bridged the gap between market need and the use of blockchain-aided
        solutions for sustainable business growth by providing tailored solutions to
        start-ups, enterprises, and governments and helping them solve pain points in
        their ecosystems . Currently, BIT has many pilots and production-ready
        applications such as Smart Contracting, Credential Management, and Digital
        Certificate Issuing Platform, to name a few, tailored for different sectors and
        government bodies.
      </div>
    </div>
  );
};

export default About;
