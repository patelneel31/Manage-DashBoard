import { NavLink } from "react-router-dom";
import { Analytics } from "../Components/Analytics";
import { useAuth } from "../Components/store/auth";

export const About = () => {
  const { user } = useAuth(); 

  return (
    <>
      <main>
        <section className="section-hero">
          <div className="container grid grid-two-cols">
            <div className="hero-content">
              <p>Hello , Welcome {user?.username || "Guest"}</p>

              <h1>Why Choose Us?</h1>

              <p>
                <strong>Expertise:</strong> Our team consists of experienced IT
                professionals who are passionate about staying up-to-date with
                the latest industry trends.
              </p>
              <p>
                <strong>Customization:</strong> We understand that every
                business is unique. That’s why we create solutions tailored to
                your specific needs and goals.
              </p>
              <p>
                <strong>Customer-Centric Approach:</strong> We prioritize your
                satisfaction and provide top-notch support to address your IT
                concerns.
              </p>
              <p>
                <strong>Affordability:</strong> We offer competitive pricing
                without compromising on the quality of our services.
              </p>
              <p>
                <strong>Reliability:</strong> Count on us to be there when you
                need us. We're committed to ensuring your IT environment is
                reliable and available 24/7.
              </p>

              <div className="btn-group">
                <NavLink to="/contact">
                  <button className="btn">Connect Now</button>
                </NavLink>
                <button className="btn secondary-btn">Learn More</button>
              </div>
            </div>

            <div className="hero-image">
              <img
                src="/images/about.png"
                alt="coding buddies"
                width="400"
                height="500"
              />
            </div>
          </div>
        </section>
      </main>

      <Analytics />
    </>
  );
};
