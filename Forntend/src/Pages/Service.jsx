import { useAuth } from "../Components/store/auth";

export const Service = () => {
  const { services, loading } = useAuth();

  return (
    <section className="section-services">
      <div className="container">
        <h1 className="main-heading text-center">Our Services</h1>
        {loading ? (
          <p className="text-center">Loading services...</p>
        ) : (
          <div className="grid grid-three-cols">
            {services.length > 0 ? (
              services.map((service, index) => (
                <div className="card" key={index}>
                  <h2>{service.service}</h2>
                  <p>{service.description}</p>
                  <p>
                    <strong>Price:</strong> ${service.price}
                  </p>
                  <p>
                    <strong>Provider:</strong> {service.provider}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center">No services available</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
