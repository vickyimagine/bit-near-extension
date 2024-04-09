import React from "react";
import {Link} from "react-router-dom";

import {PiArrowBendUpLeftBold} from "react-icons/pi";
const Terms = ({setTerms}) => {
  return (
    <div className='flex flex-col items-start w-full'>
      {setTerms !== (null || undefined) ? (
        <button
          className=' w-fit self-start'
          onClick={() => setTerms(false)}>
          <PiArrowBendUpLeftBold
            fontSize={28}
            color='white'
          />
        </button>
      ) : (
        <Link
          to='/homescreen'
          className=' w-fit self-start'>
          <PiArrowBendUpLeftBold
            fontSize={28}
            color='white'
          />
        </Link>
      )}

      <h1 className='text-5xl text-white font-semibold mt-3'>Terms & Conditions</h1>

      <div className='terms text-white overflow-y-scroll cursor-default space-y-3'>
        <p>
          Beyond Imagination Technologies Private Limited (hereinafter referred to as
          “BIT”, “us”, “we” or “our”) is committed to respecting your privacy and
          complying with applicable data protection and privacy laws of India. This Policy
          applies to the Sites, applications, products and services (collectively,
          “Services”) on or in which it is posted, linked, or referenced. We understand
          that confidentiality of information is important to the visitors to our website
          and are committed to ensuring that your privacy is protected. This Privacy
          Policy of Beyond Imagination Technologies Private Limited (“Privacy Policy”)
          provides detailed information on the reasoning and purpose behind collection of
          your personal information, and procedures that we have in place to safeguard
          your privacy as per the prevalent data protection guidelines. By accessing and
          using our website as well as the solutions provided by us, and submitting your
          information to us by email, through our website or otherwise, you shall be
          deemed to have consented to the collection and use of that information as set
          out in this Privacy Policy. This Privacy Policy and the Terms of Use will govern
          your use of the Website as well as all other applications being provided by us
          now, or in future. By accessing or using our Services and features, you are
          accepting the practices described in this Privacy Policy. In this Privacy
          Policy, meanings as ascribed to the terminologies in the Terms of Use shall be
          applicable. In general, you can visit Our Website without telling us who you are
          or revealing any personal information about yourself (such as your name,
          company, phone number, address or email address).
        </p>
        <span className='font-bold text-white text-xl'>Data Privacy Notice:</span>
        <p>
          Under the EU General Data Protection Regulation (GDPR) guidelines, individuals /
          organizations are given rights over the use of their personal data. When you
          provide us with your personal data, we are required to give you certain
          information including your rights.
        </p>
        <span className='font-bold text-white text-xl'>
          What are the purposes for which BIT uses cookies?
        </span>
        <p>
          Cookie is a small text file which saves your browsing information for better
          future preferences. Following are the purposes for which cookies are used:
          Traffic Monitoring of our website and the solutions provided by us IP address
          from which you access the Website Type of device and operating system used to
          access the Website Date and Time of your access to the Website Pages that you
          visit You may be asked to give us more specific information about yourself. For
          example, if you are seeking information about us or our products, we may ask you
          to share your name, company name, e-mail address, and phone number (“User
          Information”). Supplying such information to us is optional, but you may be
          unable to complete request/ enquiry submission without providing us with such
          information. Processing of your data is lawful and necessary for the performance
          of a contract as mentioned under Article 6(1)(b) of GDPR. It is hereby expressly
          clarified to you that we do not make any personal information available to third
          parties. We do not sell lists, accept advertising, or generate any third-party
          revenue from the data that is generated from this Website. We may, however,
          utilize third parties who we partner with to provide services on our behalf.
          Such third parties are required to maintain the confidentiality of all
          information and are prohibited from using any information for any purpose other
          than as authorized by us.
        </p>
        <span className='font-bold text-white text-xl'>Data collected by BIT</span>
        <p>
          Our web server collects IP addresses to obtain certain aggregate information
          concerning the use of Our Website. An IP address is a number that is
          automatically assigned to Your computer whenever You are surfing the web; In
          addition to the IP address we may collect non-personally identifiable
          information which is information, by itself, cannot be used to identify or
          contact you, including demographic information (such as age, profession, company
          industry, current location, or zip code), browser types, domain names, and
          statistical data involving the use of the Company’s Website; Information
          provided by you when creating an account; Information provided by you when
          contacting us for an enquiry such as your name, email address, phone number, the
          contents of the message and/or attachments you may send us, and any other
          information you may choose to provide. Information provided by you when
          scheduling a meeting or asking for a demo of our services; Information relating
          to any services purchased or for any transaction you entered into.
        </p>
        <span className='font-bold text-white text-xl'>Use of Information:</span>
        <p>
          We use the information collected for one or more of the following: To
          communicate with you regarding the interests you have shown on visiting site or
          for the services you have signed up for; Performing statistical and/or analysis
          on the information; Information provided by you when creating an account; Use
          the information collected in such other form and manner to maintain the quality,
          effectiveness and standard of Our Website, products and service; Analyse and
          measure User behaviour and trends To aid strategic development, data collection
          and analytics; Monitor, maintain, troubleshoot and/or improve Our products and
          services and any associated features, including evaluation or devising new
          features; Internal record keeping; To build user profiles and marketing
          profiles; To audit usage of our products and services. To audit usage of our
          products and services. Preventing any potentially illegal activity and
          preventing screening of any undesirable or abusive activity; Contact for market
          research purposes including transmission of marketing materials that may be of
          interest to you whether by soft-opt-in or by opt-in methods. Find and prevent
          fraud Please note that: soft opt-in consent is a specific type of consent which
          applies when You have previously engaged with Us (for example, You contact Us to
          ask Us for more details about a particular product/service, and We are marketing
          similar products/services). Under “soft opt-in” consent, We will take Your
          consent as given unless You opt-out. for other types of e-marketing, We are
          required to obtain Your explicit consent; that is, You need to take positive and
          affirmative action when consenting by, for example, checking a tick box that We
          will provide. Under Article 6(1)(a) of GDPR, you are giving your explicit
          consent to process your personal data. We want to ensure that the information we
          collect is accurate. If your contact information changes, or if you wish to
          delete certain contact information from our records, please let us know by
          sending an email to support@beimagine.tech while also copying the same mail to
          legal@beimagine.tech. If at any time you wish to “opt out” of receiving
          information from us, please let us know by sending us an email to
          support@beimagine.tech while also copying the mail to legal@beimagine.tech.
          Please note that due to lead times on certain contacts, you may continue to
          receive contacts for a short period following your “opt out” notification.
        </p>

        <span className='font-bold text-white text-xl'>Log Files</span>
        <p>
          BIT follows a standard procedure of using log files. These files log visitors
          when they visit websites. All hosting companies do this and a part of hosting
          services’ analytics. The information collected by log files include internet
          protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and
          time stamp, referring/exit pages, and possibly the number of clicks. These are
          not linked to any information that is personally identifiable. The purpose of
          the information is for analyzing trends, administering the site, tracking users’
          movement on the website, and gathering demographic information.
        </p>
        <span className='font-bold text-white text-xl'>
          Protection of your Personal Information:
        </span>
        <p>
          While we take all reasonable precautions as applicable under the GDPR, the
          Sensitive Personal Data and Information Rules 2021, we also ensure that we apply
          necessary technical and organizational measures to protect personally
          identifiable information from loss, misuse, alteration or destruction, data
          transmission over the internet may not be adequately secured by the sender. As a
          result, we cannot ensure the secure receipt of any information that is sent to
          us by this medium and any such information is sent at your own risk.
        </p>
        <span className='font-bold text-white text-xl'>Third Party Web Sites:</span>
        <p>
          We are not responsible for the privacy practices of third parties whose websites
          may be referenced or linked in the Website. BIT’s Privacy Policy does not apply
          to other advertisers or websites. Thus, we are advising you to consult the
          respective Privacy Policies of these third-party ad servers for more detailed
          information. It may include their practices and instructions about how to
          opt-out of certain options. You can choose to disable cookies through your
          individual browser options. To know more detailed information about cookie
          management with specific web browsers, it can be found at the browsers’
          respective websites.
        </p>

        <span className='font-bold text-white text-xl'>Data Retention:</span>
        <p>
          Unless a longer retention period is required or permitted by law, the Company
          will only hold information on our systems for the period necessary to fulfill
          the purposes outlined in this Privacy Policy.
        </p>
        <span className='font-bold text-white text-xl'>Your Rights under GDPR</span>
        <p>
          If you are in EEA (European Economic Area) you have the following rights with
          respect to information BIT holds: Under Article 15 of GDPR , you have the right
          of access to information from us including the purpose of processing and
          categories of personal data concerned and right to obtain the copy; Under
          Article 16 of GDPR you have the right to get your personal data rectified in the
          event of it’s inaccuracy or incompletion; Under Article 17 of GDPR you have the
          right to request to delete your personal information in certain circumstances
          subject to our Retention Policy; Under Article 18 of GDPR you have the right to
          request to restrict the processing of your data in cases such as when you have
          objected the accuracy of the data which needs verification in certain
          circumstances; Under Article 20 of GDPR You have the right to transfer your
          information to a third party in a structured, commonly used and machine-readable
          format, in circumstances where the information is processed with your consent or
          by automated means; Under Article 21 of GDPR, you have the right to object on
          grounds relating to particular situation such as direct marketing purposes; In
          all cases, we will need to satisfy ourselves of your identity before we can take
          action on a subject access request under the GDPR. We will usually require proof
          of identity such as a passport or driver’s licence. Change of Business Ownership
          and Control: The Company may, from time to time, expand or reduce our business
          and this may involve the sale and/or the transfer of control of all or part of
          the Company. Information provided will, where it is relevant to any part of our
          business so transferred, be transferred along with that part and the new owner
          or newly controlling party will, under the terms of this Privacy Policy, be
          permitted to use the Information for the purposes for which it was originally
          given to Us. We may also disclose Information to a prospective purchaser of our
          business or any part of it. In the above instances, we will take steps to ensure
          that your privacy is protected.
        </p>

        <span className='font-bold text-white text-xl'>Revisions to Privacy Policy:</span>
        <p>
          We reserve the right to update and revise this Privacy Policy at any time. You
          can determine if this Privacy Policy has been revised since the last visit by
          referring to the Last updated date at the top of this page. You should therefore
          review this Privacy Policy regularly to ensure that you are aware of its terms
          and amendments. Use of the Website constitutes acceptance of the terms of the
          Privacy Policy as amended or revised by us.
        </p>
        <span className='font-bold text-white text-xl'>Resources:</span>
        <p>
          We provide publicly accessible resources on our websites. Please be aware with
          providing any personal information on blogs and other resources which might lead
          to contact you with unsolicited messages. BIT will not be liable if you choose
          to disclose your personal information on such resources. If you want to remove
          your personal information from such resources, contact support@beimagine.tech
          while also copying legal@beimagine.tech in the mail.
        </p>
        <span className='font-bold text-white text-xl'>
          GRIEVANCE REDRESSAL MECHANISM:
        </span>
        <p>
          Any complaints or request or concerns with regards to use, processing or
          disclosure of information provided by you or breach of these terms may be taken
          up with the designated grievance redressal officer as mentioned below via post
          or by sending an email to hello@beimagine.tech and copying the same to
          legal@beimagine.tech.
        </p>
        <span className='font-bold text-white text-xl'>Grievance Redressal Officer:</span>
        <p>
          and or comment or breach of these terms shall be immediately informed to the
          designated Grievance Officer as mentioned below via in writing or through email
          signed with the electronic signature to. Grievance Redressal Officer Name:
          Email: https://www.beimagine.tech Beyond Imagination Technologies Private
          Limited Suite 205 – 206, Bakshi House, Nehru Place, New Delhi – 110019. We
          request you to please provide the following information in your complaint:-
          Identification of the information provided by you. Clear statement as to whether
          the information is personal information or sensitive personal information. Your
          address, telephone number or e-mail address. A statement that you have a
          good-faith belief that use of the information has been processed incorrectly or
          disclosed without authorization, as the case may be. A statement, under penalty
          of perjury, that the information in the notice is accurate, and that you are
          authorized to act on behalf of the owner of the right that is allegedly
          infringed. The Company may reach out to you to confirm or discuss certain
          details about your complaint and issues raised. The Company shall not be
          responsible for any communication, if addressed, to any non-designated person in
          this regard. You may also contact us in case you have any questions /
          suggestions about the Policy using the contact information mentioned above.
        </p>
        <span className='font-bold text-white text-xl'>
          Disclosure in compliance to legal obligations:
        </span>
        <p>
          We may disclose personal information if we believe in good faith that such
          disclosure is necessary in order to comply with law or legal process (for
          example, in response to a warrant or subpoena or other court order), to protect
          against misuse or unauthorized use of Our Website, or to protect the rights,
          property or personal safety of Us, our customers or the public or the national
          security requirements. WE, OUR OFFICERS, DIRECTORS, EMPLOYEES, AFFILIATES AND
          AGENTS WILL NOT BE LIABLE FOR ANY ACTS OR OMISSIONS OF A THIRD PARTY, OR FOR ANY
          UNAUTHORIZED INTERCEPTION OF DATA OR BREACHES ATTRIBUTABLE IN FULL OR IN PART TO
          THE ACTS OR OMISSIONS OF THIRD PARTIES, OR FOR DAMAGES ASSOCIATED THAT RESULT
          FROM THE OPERATIONS SYSTEMS, EQUIPMENT, FACILITIES OR SERVICE PROVIDED BY THIRD
          PARTIES THAT ARE INTERCONNECTED WITH THE SERVERS. Permission to use your company
          logo and name By registering with BIT, you grant permission to BIT to use your
          company logo and name as our client in our marketing collaterals website and
          social media posts
        </p>
      </div>
    </div>
  );
};

export default Terms;
