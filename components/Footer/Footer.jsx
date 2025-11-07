"use client";

import React from "react";
import "./Footer.scss";
import Image from "next/image";

import AppStore from "../../assets/images/App-Store.png";
import GooglePlay from "../../assets/images/Google-Play.png";

import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";

const Footer = () => {
  const countries = [
    "India", "Australia", "London", "America", "France", "Brazil",
    "England", "South Africa", "Russia",
  ];

  const languages = ["English", "Hindi", "Polish"];

  const footerSections = [
    {
      title: "ABOUT ZOMATO",
      links: ["Who We Are", "Blog", "Work With Us", "Investor Relations", "Report Fraud", "Contact Us"],
    },
    {
      title: "ZOMAVERSE",
      links: ["Zomato", "Blinkit", "Feeding India", "HyperPure", "Zomaland"],
    },
    {
      title: "FOR RESTAURANTS",
      links: ["Partner With Us", "Apps For You"],
    },
    {
      title: "FOR ENTERPRISES",
      links: ["Zomato For Work"],
    },
    {
      title: "LEARN MORE",
      links: ["Privacy", "Security", "Terms", "Sitemap"],
    },
  ];

  const socialLinks = [
    { icon: <LinkedInIcon />, url: "https://www.linkedin.com/company/zomato" },
    { icon: <TwitterIcon />, url: "https://twitter.com/ZomatoIN" },
    { icon: <InstagramIcon />, url: "https://www.instagram.com/zomato/" },
    { icon: <YouTubeIcon />, url: "https://www.youtube.com/user/Zomato" },
    { icon: <FacebookIcon />, url: "https://www.facebook.com/Zomato" },
  ];

  return (
    <footer className="footer">
      {/* Top Section */}
      <div className="top">
        {/* Brand and Selects */}
        <div className="top1">
          <h2>Zomato</h2>
          <div className="lang">
            <select>
              {countries.map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
            <select>
              {languages.map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Footer Links Section */}
        <div className="bottom1">
          {footerSections.map((section, idx) => (
            <div className="bottomContent" key={idx}>
              <h4>{section.title}</h4>
              {section.links.map((link, id) => (
                <p key={id}>{link}</p>
              ))}
            </div>
          ))}

          {/* Social Links & Store */}
          <div className="bottomContent">
            <h4>SOCIAL LINKS</h4>
            <div className="links">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="socialIcon"
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <div className="store-icons">
              <a href="https://apps.apple.com/" target="_blank" rel="noopener noreferrer">
                <Image src={AppStore} alt="Download on App Store" width={120} height={40} />
              </a>
              <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
                <Image src={GooglePlay} alt="Get it on Google Play" width={120} height={40} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <hr />

      {/* Bottom Section */}
      <div className="bottom">
        <p>
          By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy and Content Policies. All trademarks are properties of their respective owners. 2008–2025 © Zomato™ Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
