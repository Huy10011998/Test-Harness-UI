import React from "react";

const RenderMember = () => {
  return (
    <React.Fragment>
      <div _ngcontent-lny-c44="" className="section testimonial__container">
        <div _ngcontent-lny-c44="" className="testimonial">
          <div _ngcontent-lny-c44="" className="testimonial__image">
            <img
              alt=""
              _ngcontent-lny-c44=""
              src="https://test-harness.io/assets/janos.jpg"
            />
          </div>
          <div _ngcontent-lny-c44="" className="testimonial__title">
            <h3 _ngcontent-lny-c44="">Janos Csikos</h3>
            <h4 _ngcontent-lny-c44="">Sharp Digital</h4>
            <span _ngcontent-lny-c44="" className="testimonial__subtitle">
              Premium Member
            </span>
          </div>
          <div _ngcontent-lny-c44="" className="testimonial__content">
            Test Harness has been an excellent partner in testing for Sharp
            Digital to extend our services with a dimension that is invisible
            but still vital for our clients. They helped us to deliver
            outstanding products with their testing services. Our teams have
            more confidence in the quality that we can offer to our clients.
          </div>
        </div>
        <div _ngcontent-lny-c44="" className="testimonial">
          <div _ngcontent-lny-c44="" className="testimonial__image">
            <img
              alt=""
              _ngcontent-lny-c44=""
              src="https://test-harness.io/assets/wojciech.jpg"
            />
          </div>
          <div _ngcontent-lny-c44="" className="testimonial__title">
            <h3 _ngcontent-lny-c44="">Wojciech Szymański</h3>
            <h4 _ngcontent-lny-c44="">Wojciech Szymański Ltd</h4>
            <span _ngcontent-lny-c44="" className="testimonial__subtitle">
              Lite Member
            </span>
          </div>
          <div _ngcontent-lny-c44="" className="testimonial__content">
            The test-harness team was very prompt in responding to our
            requirements, in the most efficient way, and helped us meet the
            deadlines on time, and of course in quality. We are very pleased
            with the quality of the testing they have done for us. I would
            recommend them to anyone looking for assistance in software testing.
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const Services = () => {
  return <React.Fragment>{<RenderMember />}</React.Fragment>;
};

export { Services };
