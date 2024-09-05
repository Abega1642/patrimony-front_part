import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebookF, FaLinkedinIn, FaGithub } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-4 footer">
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={4}>
            <p className="mb-3">
              &copy; {new Date().getFullYear()} Abegà Razafindratelo. All Rights Reserved.
            </p>
            <div className="d-flex justify-content-center">
              <a href="https://web.facebook.com/a.razafindratelo/" target="_blank" rel="noopener noreferrer" className="text-white me-3">
                <FaFacebookF size={24} />
              </a>
              <a href="https://www.linkedin.com/in/abegà-razafindratelo" target="_blank" rel="noopener noreferrer" className="text-white me-3">
                <FaLinkedinIn size={24} />
              </a>
              <a href="https://github.com/Abega1642" target="_blank" rel="noopener noreferrer" className="text-white">
                <FaGithub size={24} />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
