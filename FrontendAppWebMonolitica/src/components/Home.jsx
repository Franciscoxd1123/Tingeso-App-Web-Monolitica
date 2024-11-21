const Home = () => {
    const containerStyle = {
      maxWidth: '100%',
      maxHeight: '100%',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '200px',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    };
  
    const headingStyle = {
      fontSize: '2.5em',
      color: '#333',
      marginBottom: '20px',
    };
  
    const paragraphStyle = {
      fontSize: '1.2em',
      lineHeight: '1.6',
      color: '#555',
      marginBottom: '20px',
      textAlign: 'center', 
    };
  
    const linkStyle = {
      color: '#007bff',
      textDecoration: 'none',
    };
  
    return (
      <div style={containerStyle}>
        <h1 style={headingStyle}>MonoPB: Sistema de Gestión de préstamos hipotecarios</h1>
        <p style={paragraphStyle}>
          Bienvenido a la plataforma de gestión de préstamos hipotecarios. Aquí podrás registrarte como cliente, simular tus préstamos y 
          poder ver todo lo relacionado a estos. 
          Esta aplicación ha sido desarrollada utilizando tecnologías como{" "}
          <a href="https://spring.io/projects/spring-boot" style={linkStyle}>Spring Boot</a> para el backend,{" "}
          <a href="https://reactjs.org/" style={linkStyle}>React</a> para el frontend y{" "}
          <a href="https://www.postgresql.org/" style={linkStyle}>PostgreSQL</a> para la base de datos.
        </p>
      </div>
    );
  };
  
  export default Home;  