import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css'; // Includes your updated black theme CSS

function Home() {
  return (
    <div className="bg-black text-white min-vh-100">
      
      {/* Header */}
      <header className="bg-opacity-75 py-3 border-bottom border-secondary">
        <div className="container d-flex justify-content-between align-items-center">
          <h1 className="h3 mb-0 fw-bold d-flex align-items-center">
            <i className="bi bi-book text-success me-2"></i>
            Book<span className="text-success">Exchange</span>
          </h1>
          <div>
            <Link to="/login" className="btn btn-outline-light me-2">Login</Link>
            <Link to="/register" className="btn btn-success">Register</Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-5 bg-gradient text-center section-padding">
        <div className="container">
          <h2 className="display-4 fw-bold">
            Exchange Books <span className="text-success d-block mt-2">With Ease</span>
          </h2>
          <p className="lead mt-3">
            Connect with fellow book lovers. Buy, sell, and discover your next favorite read through our seamless exchange platform.
          </p>
          <div className="mt-4 d-flex flex-column flex-sm-row justify-content-center gap-3">
            <Link to="/register" className="btn btn-success btn-lg px-4 py-2">Start Trading</Link>
            <Link to="/login" className="btn btn-outline-light btn-lg px-4 py-2">Browse Books</Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-5 bg-black bg-opacity-75 text-center">
        <div className="container">
          <div className="row gy-4">
            <div className="col-md-4">
              <h3 className="stats-green">10,000+</h3>
              <p className="text-muted fw-semibold">Books Available</p>
            </div>
            <div className="col-md-4">
              <h3 className="stats-green">5,000+</h3>
              <p className="text-muted fw-semibold">Active Users</p>
            </div>
            <div className="col-md-4">
              <h3 className="stats-green">25,000+</h3>
              <p className="text-muted fw-semibold">Books Exchanged</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-black">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold text-white">Why Choose BookExchange?</h2>
            <p className="text-muted">Join thousands of book enthusiasts who love hassle-free trading</p>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 text-center">
                <div className="card-body">
                  <div className="display-5 text-success mb-3">🔍</div>
                  <h5 className="card-title fw-bold text-white">Easy Discovery</h5>
                  <p className="text-muted">Find your next favorite book with our powerful search and recommendations.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 text-center">
                <div className="card-body">
                  <div className="display-5 text-success mb-3">👥</div>
                  <h5 className="card-title fw-bold text-white">Trusted Community</h5>
                  <p className="text-muted">Connect with verified readers in a secure and active environment.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 text-center">
                <div className="card-body">
                  <div className="display-5 text-success mb-3">💵</div>
                  <h5 className="card-title fw-bold text-white">Smart Pricing</h5>
                  <p className="text-muted">Get fair deals with intelligent pricing suggestions based on trends.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient text-center">
        <div className="container">
          <h2 className="fw-bold text-white mb-3">Ready to Start Trading?</h2>
          <p className="text-muted mb-4">Join our community and experience the easiest way to buy and sell books online.</p>
          <Link to="/register" className="btn btn-success btn-lg px-5 py-3">Get Started Now</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-4 border-top border-secondary bg-black">
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
          <div className="d-flex align-items-center mb-2 mb-md-0">
            <i className="bi bi-book text-success me-2"></i>
            <span className="fw-semibold text-white">BookExchange</span>
          </div>
          <small className="text-muted">© 2025 BookExchange. All rights reserved.</small>
        </div>
      </footer>
    </div>
  );
}

export default Home;
