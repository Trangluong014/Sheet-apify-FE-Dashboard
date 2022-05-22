import React from "react";
import { useNavigate } from "react-router-dom";

import "../index.css";

function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="container">
      <section id="intro">
        <div className="content">
          <h1 className="title1"> sheets-apify</h1>
          <p className="details1">
            {" "}
            Real-time update, user-friendly and free with no coding
          </p>

          <button
            className="btn"
            onClick={() => {
              navigate("/register");
            }}
            style={{ marginTop: "1.5rem" }}
          >
            Start building for free
          </button>
        </div>
        <a href="about" className="what">
          What is sheets-apify
        </a>
      </section>
      <section id="about" className="style1">
        <header>
          <h2 className="title2">
            The No-Code website builder
            <br />
            for everyone
          </h2>
          <p className="details2">
            Turn your Google Spreadsheet into a website.
            <br />
            Break the code barrier and bring your business online.
            <br />
            Simple, easy-to-manage, and yup — totally free.
          </p>
        </header>
        <div className="carousel-active"></div>
      </section>
      <section id="highlight" className="style1">
        <section className="inner">
          <div className="content">
            <h2 className="title3"> Real-time Update</h2>
            <p className="details3">
              All information in your spreadsheet will be reflected in your
              website after just one click and vise versa
            </p>
          </div>
        </section>
        <section className="inner">
          <div className="content">
            <h2 className="title3"> User-friendly</h2>
            <p className="details3">
              Start with one of dozens of templates and make it your own. You
              can manage all of your data through google sheet and dashboard
            </p>
          </div>
        </section>
        <section className="inner">
          <div className="content">
            <h2 className="title3"> Free</h2>
            <p className="details3">
              Build up to three sites per account and use all of sheets-apify's
              core features – for free!
            </p>
          </div>
        </section>
      </section>
      <section id="pro" className="style1">
        <header>
          <h2 className="title2"> Optional: Go Pro</h2>
          <p className="details2">
            Upgrade your Carrd experience! Go Pro from just{" "}
            <strong>$19 / year</strong> (yup, per <em>year</em>)<br /> and get
            access to Pro-exclusive features like:
          </p>
        </header>
        <div className="content">
          <ul className="pro-features">
            <li className="pro-li">
              <h3 className="title3">Custom Domains</h3>
              <p className="details3">
                Publish sites to any custom domains you own
              </p>
            </li>
            <li className="pro-li">
              <h3 className="title3">More Sites</h3>
              <p className="details3">
                Build and publish more than three sites from a single
                sheets-apify account.
              </p>
            </li>
            <li className="pro-li">
              <h3 className="title3">Google Analytics</h3>
              <p className="details3">
                Add an optional Google Analytics tracking ID to each of your
                sites to track and report traffic
              </p>
            </li>
            <li className="pro-li">
              <h3 className="title3">No Branding</h3>
              <p className="details3">
                Publish sites without the "Copyright by sheets-apify" branding
                in the footer.
              </p>
            </li>
          </ul>
        </div>
      </section>
      <section id="cta" className="style2">
        <h2 className="title4">Sound good?</h2>
        <button
          className="btn"
          onClick={() => {
            navigate("/register");
          }}
        >
          Start building for free
        </button>
      </section>
      <footer id="footer">
        <ul className="menu">
          <li className="menuli">
            <a href="/">Home</a>
          </li>
          <li className="menuli">
            <a href="/terms">Terms</a>
          </li>
          <li className="menuli">
            <a href="/privacy">Privacy</a>
          </li>
          <li className="menuli">
            <a href="/contact">Contact</a>
          </li>
        </ul>
        <p className="copyright">© sheets-apify. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
