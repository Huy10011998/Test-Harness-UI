import React from "react";
import { Footer } from "../home/footer";
import { Navigation } from "../home/navigation";
import "./styles.css";

const AboutUS = () => {
  return (
    <React.Fragment>
      <Navigation />
      <div className="section_container_about_us">
        <div className="section__container_about_us-wrapper">
          <div className="section__container_about_us">
            <div className="section_banner_about_us">
              <h1>ABOUT US</h1>
            </div>
            <div className="section_item_about_us">
              <p>
                {" "}
                Are you a startup or SME owner looking for software testing and
                quality assurance services? At Test Harness, we have you
                covered.{" "}
              </p>
              <p>
                {" "}
                Test Harness is a leading cloud-based software QA platform that
                is managed by a team of highly skilled IT specialists. We cater
                to online SMEs across the world. We offer highly reliable and
                independent quality verification tools for companies that do not
                have their in-house software testing department.{" "}
              </p>
              <div className="section_banner_about_us_item">
                <h4>Mission Statement</h4>
              </div>
              <p>
                {" "}
                Test Harness was founded to bridge the gap that is faced by many
                small and medium companies, particu-larly those that are in the
                business of making software and technology: testing their
                software on an ad-hoc basis to ensure it does not have any bugs
                or glitches and can operate without a hitch. We offer functional
                testing of your website’s new features, smoke testing for live
                web products, and be-spoke automated smoke test suites on a
                daily basis, and more. Hence, Test Harness aims to ensure that
                businesses that create their own in-house software can optimize
                the functionalities of their tools while maintaining their brand
                credibility.{" "}
              </p>
              <div className="section_banner_about_us_item">
                <h4>How We Started</h4>
              </div>
              <p>
                {" "}
                Test Harness is a cloud-based project started by the software
                company Spoolers Solutions Ltd. that was founded in 2014. We
                recognise the need for small and medium businesses to have their
                software tested without investing in an expensive software
                testing team, which can be very cost-prohibitive for companies
                that are in the process of making their mark in the industry.
                Test Harness offers software testing to businesses on a
                day-to-day basis by automating the testing process to achieve
                the best results for clients at an affordable cost. We have a
                team of highly talented and skilled IT consultants who have
                years of experience in the software testing industry. We have
                worked with big-name clients like Unilever, BBC, Thomson
                Reuters, Audi, Net-a-porter, and more.{" "}
              </p>
              <div className="section_banner_about_us_item">
                <h4>Why Should You Work With Us?</h4>
              </div>
              <p>
                {" "}
                We understand that small and medium-sized businesses are at
                their growing stages and any small obstacles on the operations
                side can retard their growth and can jeopardize the future of
                the business. We aim to make sure that your business gets the
                chance of growth it deserves by ensuring the integrity of its
                soft-ware.{" "}
              </p>
              <p> To that end, we offer you the following benefits: </p>

              <ul>
                <li>
                  All our software testers are ISEC-Certified and have at least
                  a Master’s degree.
                </li>
                <li>
                  {" "}
                  We work with a test-to-break attitude; this means we aim to
                  find the root causes of all the defects in your software and
                  fix them before you launch your product.{" "}
                </li>
                <li>
                  We ensure that you have complete confidence in the viability
                  and integrity of your software.
                </li>
                <li>
                  {" "}
                  We do not demand thousands of dollars for testing your
                  software; instead, we offer affordable and
                  industry-competitive rates without compromising the quality of
                  the software. You can select our package as per your needs,
                  and we will take charge of your software testing from there.{" "}
                </li>
                <li>
                  {" "}
                  You will have a dedicated dashboard where you will get live
                  reports and can track the progress of your software testing.{" "}
                </li>
                <li _ngcontent-wof-c48="">
                  {" "}
                  You will be assigned a dedicated team of software testers whom
                  you can communicate your soft-ware testing needs with a few
                  clicks.{" "}
                </li>
              </ul>
              <p>
                {" "}
                Interested in working with us? Visit us at test-harness.io and
                contact us through our online form today!{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export { AboutUS };
