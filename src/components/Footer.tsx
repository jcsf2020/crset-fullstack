
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <span className="logo-crset">CRSET</span>
            <span className="logo-solutions"> Solutions</span>
          </div>
          
          <div className="footer-text">
            <p>&copy; {currentYear} CRSET Solutions. Todos os direitos reservados.</p>
            <p className="footer-tagline">Inovação • Automação • Inteligência Artificial</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
