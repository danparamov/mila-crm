import React, { Component } from 'react';
import { createGlobalStyle } from 'styled-components';
import { Link } from 'react-router-dom';
import MilaLogo from '../assets/mila-logo-m.jpg';
import TopLogo from '../assets/Absurd-Illustrations/Absurd-Illustrations/PNG/07.png';
import MiddleLogo from '../assets/Absurd-Illustrations/Absurd-Illustrations/PNG/01.png';
import OpportunitiesLogo from '../assets/Absurd-Illustrations/Absurd-Illustrations/PNG/08.png';
import TasksLogo from '../assets/Absurd-Illustrations/Absurd-Illustrations/PNG/09.png';
import ContactsLogo from '../assets/Absurd-Illustrations/Absurd-Illustrations/PNG/04.png';
import AccountLogo from '../assets/Absurd-Illustrations/Absurd-Illustrations/PNG/11.png';
import Favicon from '../assets/Logos/logo_transparent.png';
import Favicon2 from '../assets/Logos/logo_transparent.png';
import BlockstackLogo from '../assets/blockstack-logo-landscape@2x.png';
import DefaultButton from './styles/DefaultButton';
import LearnMore from './LearnMore';

export default class SignIn extends Component {
  render() {
    const { handleSignIn } = this.props;
    return (
      <html >
      <body>

      <header class="header_area">
              <nav class="navbar navbar-expand-lg menu_one menu_four">
                  <div class="container custom_container p0">
                      <a class="navbar-brand b-img w-10" href="/"><img src={Favicon} alt="logo"/></a>
                      <button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                          <span class="menu_toggle">
                              <span class="hamburger">
                                  <span></span>
                                  <span></span>
                                  <span></span>
                              </span>
                              <span class="hamburger-cross">
                                  <span></span>
                                  <span></span>
                              </span>
                          </span>
                      </button>
                      <div class="collapse navbar-collapse" id="navbarSupportedContent">
                          <ul class="navbar-nav menu pl_120">
                              <li class="nav-item submenu active">
                                  <a class="nav-link" href="/">Home</a>
                              </li>
                              <li class="nav-item submenu mega_menu">
                                  <a class="nav-link" href="/#start">About</a>
                              </li>
                              <li class="nav-item submenu mega_menu">
                                  <a class="nav-link" href="/#contact">Contact</a>
                              </li>
                              <li class="nav-item submenu mega_menu">
                                  <a class="nav-link" href="https://medium.com/@danielparamo">Blog</a>
                              </li>
                          </ul>
                      </div>
                      <p>
                        <DefaultButton
                          className="f6 ph3 pv2 mb2 dib white bg-green b--black pointer"
                          id="signin-button"
                          onClick={handleSignIn.bind(this)}
                          primary
                        >
                          Start Now
                        </DefaultButton>
                      </p>
                  </div>
              </nav>
      </header>

      <section class="agency_banner_area bg_color">
         <img class="banner_shap" src="https://res.cloudinary.com/phlab/image/upload/v1557198497/echo/img/banner_bg_zvm11m.png" alt="" />
         <div class="container custom_container">
         <div class="row">
            <div class="col-lg-5 d-flex align-items-center">
               <div class="agency_content">
                  <h2 class="f_700 t_color3 mb_40 wow fadeInLeft" data-wow-delay="0.3s">CRM. Privacy. Decentralized. Sales. Win.</h2>
                  <div class="action_btn d-flex align-items-center mt_60">
                  <a href="#start" class="btn_hover agency_banner_btn">Learn More</a>
                  </div>
               </div>
            </div>
            <div class="col-lg-7 text-right">
               <img class="protype_img wow fadeInRight" data-wow-delay="0.3s" src={TopLogo} alt="a man in an open field viewing from his video camers"/>
            </div>
         </div>
         </div>
      </section>

      <section id="start" class="app_service_area app_service_area_two align-center">
         <div class="container">
            <div class="sec_title text-center align-center mb_70">
               <h2 class="f_size_30 f_600 t_color3 l_height40 text-center mb_60">Create your sales funnel to achieve your mission-critical priorities knowing your data is protected by the use of blockchain</h2>
            </div>
            <div class="row app_service_info">
               <div class="col-lg-4 col-sm-6">
                  <div class="app_service_item">
                     <i class="ti-money app_icon one"></i>
                     <h5 class="f_p f_size_18 f_600 t_color3 mt_40 mb-30">360 View</h5>
                     <p class="f_300 f_size_15 mb-30">360-degree view is the foundation that makes an organization's relationship with customers experiential rather than transactional—the key to long-standing customer relationships and positive endorsements. It is the comprehensive view from various touchpoints in a customer’s journey.</p>
                  </div>
               </div>
               <div class="col-lg-4 col-sm-6">
                  <div class="app_service_item">
                     <i class="ti-desktop app_icon two"></i>
                     <h5 class="f_p f_size_18 f_600 t_color3 mt_40 mb-30">Universal ID</h5>
                     <p class="f_300 f_size_15 mb-30">With the old internet, big companies own your data. With Blockstack, relax knowing your data is 100% private, and only you can grant access to apps or other users. Never worry about privacy breaches again.</p>
                  </div>
               </div>
               <div class="col-lg-4 col-sm-6">
                  <div class="app_service_item">
                     <i class="ti-settings app_icon two"></i>
                     <h5 class="f_p f_size_18 f_600 t_color3 mt_40 mb-30">Blockchain</h5>
                     <p class="f_300 f_size_15 mb-30">With the old internet, big companies control your login.
                     With Blockstack, you own your login. Under the hood, Blockstack uses blockchain to keep everything secure and private. We lock and encrypt your data with a secret key—you, and only you, have this key.</p>
                  </div>
               </div>
            </div>
         </div>
      </section>
      <section class="agency_about_area d-flex bg_color">
         <div class="col-lg-6 about_img">
            <img class="img-fluid" src={MiddleLogo} alt="a mobile screen illustration with a man touching a globe"/>
         </div>
         <div class="col-lg-6 about_content_left ">
            <div class="about_content mb_90">
               <h2 class="f_size_30 f_500 l_height45 mb_20">Why MILA-CRM? Why Blockchain?</h2>
               <p class="f_size_15 f_300 mb_40">Most CRM companies are providing you with an account so that they can sell your information to the highest bidder.
               By the use of Blockchain through Blockstack MILA CRM is different. With Blockstack, YOU control your identity. With the right apps, like MILA-CRM, you control your data. Neither Blockstack nor the makers of MILA-CRM have access to your id, your data, or what you do with them.

               What is Blockstack?
               Blockstack is a new internet for decentralized apps that you access through the Blockstack Browser. With Blockstack, there is a new world of apps that let you own your data and maintain your privacy, security and freedom. <br /><br />
               Find out more at https://blockstack.org/about
               </p>
            </div>
         </div>
      </section>
      <section class="agency_featured_area bg_color">
         <div class="container">
            <h2 class="f_size_30 f_600 t_color3 l_height40 text-center wow fadeInUp" data-wow-delay="0.3s">Learn more about how MILA-CRM can help you win that opportunity.</h2>
            <div class="features_info">
               <img class="dot_img" src="https://res.cloudinary.com/phlab/image/upload/v1557198499/echo/img/dot_b1egwq.png" alt=""/>
               <div class="row agency_featured_item flex-row-reverse">
                  <div class="col-lg-6">
                     <div class="agency_featured_img text-right wow fadeInRight" data-wow-delay="0.4s">
                        <img src={ContactsLogo} alt="research illustration"/>
                     </div>
                  </div>
                  <div class="col-lg-6">
                     <div class="agency_featured_content pr_70 pl_70 wow fadeInLeft" data-wow-delay="0.6s">
                        <div class="dot"><span class="dot1"></span><span class="dot2"></span></div>
                        <img class="number" src="https://res.cloudinary.com/phlab/image/upload/v1557198500/echo/img/icon01_devqbf.png" alt=""/>
                        <h3>Get to know your Prospects </h3>
                        <p>Make sure you’re keeping on top of your customer relationships. Organize your workload and make sure you never miss another sale, meeting or event. The objective is to have a “360 degree view” of the customer, with all the information about them in one place.</p>
                        <a href="#d2" class="btn_hover agency_banner_btn mt_30">Next ↓</a>
                     </div>
                  </div>
               </div>
               <div id="d2" class="row agency_featured_item agency_featured_item_two">
                  <div class="col-lg-6">
                     <div class="agency_featured_img text-right wow fadeInLeft" data-wow-delay="0.3s">
                        <img src={AccountLogo} alt="consulting illustration"/>
                     </div>
                  </div>
                  <div class="col-lg-6">
                     <div class="agency_featured_content pl_100 wow fadeInRight" data-wow-delay="0.5s">
                        <div class="dot"><span class="dot1"></span><span class="dot2"></span></div>
                        <img class="number" src="https://res.cloudinary.com/phlab/image/upload/v1557198500/echo/img/icon02_txriwn.png" alt=""/>
                        <h3>Create Accounts with Ease</h3>
                        <p>Manage a customer's account information inside your CRM. Account management makes it easy for sales reps to close more deals by giving the complete overview of the contacts, deals, and tasks of a company in one place.</p>
                        <a href="#d3" class="btn_hover agency_banner_btn mt_30">Next ↓</a>
                     </div>
                  </div>
               </div>
               <div id="d3" class="row agency_featured_item flex-row-reverse">
                  <div class="col-lg-6">
                     <div class="agency_featured_img text-right wow fadeInRight" data-wow-delay="0.4s">
                        <img src={TasksLogo} alt="trusted insights illustration"/>
                     </div>
                  </div>
                  <div class="col-lg-6">
                     <div class="agency_featured_content pr_70 pl_70 wow fadeInLeft" data-wow-delay="0.6s">
                        <div class="dot"><span class="dot1"></span><span class="dot2"></span></div>
                        <img class="number" src={"https://res.cloudinary.com/phlab/image/upload/v1557198500/echo/img/icon03_ldw08y.png"} alt=""/>
                        <h3>Never Miss a Task</h3>
                        <p>Make sure you’re keeping on top of your customer relationships. Organize your workload and make sure you never miss another sale, meeting or event. The objective is to have a “360 degree view” of the customer, with all the information about them in one place.</p>
                        <a href="#d4   " class="btn_hover agency_banner_btn mt_30">Next ↓</a>
                     </div>
                  </div>
               </div>
               <div id="d4" class="row agency_featured_item agency_featured_item_two">
                  <div class="col-lg-6">
                     <div class="agency_featured_img text-right wow fadeInLeft" data-wow-delay="0.3s">
                        <img src={OpportunitiesLogo} alt="strategic advice illustration"/>
                     </div>
                  </div>
                  <div class="col-lg-6">
                     <div class="agency_featured_content pl_100 wow fadeInRight" data-wow-delay="0.5s">
                        <div class="dot"><span class="dot1"></span><span class="dot2"></span></div>
                        <img class="number" src="https://res.cloudinary.com/phlab/image/upload/v1557198500/echo/img/icon04_picstv.png" alt=""/>
                        <h3>Grow Your Opportunities</h3>
                        <p>You can create sales opportunities showing the value of the deal, set and update the probability of the sale and also add weighted values. As a result, our intuitive CRM system will help you create more accurate forecasts and predict what is likely to close. </p>
                        <a href="/#contact" class="btn_hover agency_banner_btn mt_30">Get in Touch →</a>
                     </div>
                  </div>
               </div>
               <div class="dot middle_dot"><span class="dot1"></span><span class="dot2"></span></div>
            </div>
         </div>
      </section>
      <section class="app_service_area app_service_area_two align-center">
         <div class="container">
            <div class="sec_title text-center align-center mb_70">
               <h2 class="f_size_30 f_600 t_color3 l_height40 text-center mb_60">We will help you Grow!</h2>
               <p class="f_size_20">Get our latest insights on the topics that matter most to you with webinars, podcasts, articles, e-books and more.</p>
            </div>
            <div class="row app_service_info">
               <div class="col-lg-3 col-sm-6">
                  <div class="app_service_item">
                     <i class="ti-settings app_icon one"></i>
                     <h5 class="f_p f_size_18 f_600 t_color3 mt_40 mb-30">Problems with other CRMs</h5>
                     <p class="f_300 f_size_17 mb-30">
                     <ul>
                     <li><a href="https://www.notion.so/milacrm/Why-did-we-start-building-Mila-Labs-and-our-first-product-Mila-CRM-3ba943d7927d4f188b4cbafd9cc37b85" target="_blank">
                     CRM Data Breaches</a></li>
                     </ul>
                     </p>
                  </div>
               </div>
               <div class="col-lg-3 col-sm-6">
                  <div class="app_service_item">
                     <i class="ti-desktop app_icon two"></i>
                     <h5 class="f_p f_size_18 f_600 t_color3 mt_40 mb-30">Sales Information&nbsp;&nbsp;</h5>
                     <p class="f_300 f_size_15 mb-30">
                     Coming Soon!
                     </p>
                  </div>
               </div>
               <div class="col-lg-3 col-sm-6">
                  <div class="app_service_item">
                     <i class="ti-money app_icon two"></i>
                     <h5 class="f_p f_size_18 f_600 t_color3 mt_40 mb-30">Why Decentralization? &nbsp;&nbsp;</h5>
                     <p class="f_300 f_size_15 mb-30">
                     Coming Soon!
                     </p>
                  </div>
               </div>
               <div class="col-lg-3 col-sm-6">
                  <div class="app_service_item">
                     <i class="ti-pulse app_icon three"></i>
                     <h5 class="f_p f_size_18 f_600 t_color3 mt_40 mb-30">Understand MILA-CRM &nbsp;&nbsp;</h5>
                     <p class="f_300 f_size_15 mb-30">
                     Coming Soon!
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      <section class="app_service_area align-center">
         <div class="container">
            <div class="sec_title text-center align-center mb_70">
               <h2 class="f_size_30 f_600 t_color3 l_height40 text-center mb_60">Who loves our CRM?</h2>
            </div>
         <div class="partner_logo">
            <div class="p_logo_item wow fadeInLeft" data-wow-delay="0.3s">
               <a target="_blank" href="https://lamoncogroup.com/" rel="noopener"><img src="https://res.cloudinary.com/phlab/image/upload/v1557198495/echo/clients/lam_ljlsb1.svg" alt="Lam logo"/></a>
            </div>
            <div class="p_logo_item wow fadeInLeft" data-wow-delay="0.3s">
               <a target="_blank" href="https://blockstack.org/" rel="noopener"><img src="https://res.cloudinary.com/phlab/image/upload/v1557199610/echo/clients/blockstack_szzg6x.png" alt="Blockstack logo"/></a>
            </div>
            <div class="p_logo_item wow fadeInLeft" data-wow-delay="0.3s">
               <a target="_blank" href="https://xertify.co/" rel="noopener"><img src="https://res.cloudinary.com/phlab/image/upload/v1557199882/echo/clients/xertify_eos39w.png" alt="Xertify logo"/></a>
            </div>
            <div class="p_logo_item wow fadeInLeft" data-wow-delay="0.2s">
               <a target="_blank" href="https://blockchainacademy.mx/" rel="noopener"><img src="https://res.cloudinary.com/phlab/image/upload/v1557198494/echo/allies/bacademy_sp92mz.svg" alt="Blockchain academy logo"/></a>
            </div>
            <div class="p_logo_item wow fadeInLeft" data-wow-delay="0.4s">
               <a target="_blank" href="https://blockchainespana.com/" rel="noopener"><img src="https://res.cloudinary.com/phlab/image/upload/v1557198495/echo/allies/bespana_wdnsft.png" alt="Blockchain espana logo"/></a>
            </div>
         </div>
      </div>
      </section>

      <section class="agency_testimonial_area bg_color sec_pad">
         <div class="container">
            <h2 class="f_size_30 f_600 t_color3 l_height40 text-center mb_60">What people are saying..</h2>
            <div class="agency_testimonial_info">
               <div class="testimonial_slider owl-carousel">
                  <div class="testimonial_item text-center left">
                     <div class="author_img"><img src="https://res.cloudinary.com/phlab/image/upload/v1557198494/echo/test/01_bhlznw.png" alt="Adam davis"/></div>
                     <div class="author_description">
                        <h4 class="f_500 t_color3 f_size_18">Adam Davis</h4>
                        <h6>Strategy Manager - LAM</h6>
                     </div>
                     <p>Daniel from ECHO Intelligent Solutions, has been a great resource for creating new business.
                     ECHO has provided high quality work, helping us understand the market and how to access it efficiently.
                     ECHO facilities and streamlines business development and we look forward to continuing our work together.</p>
                  </div>
                  <div class="testimonial_item text-center center">
                     <div class="author_img"><img src="https://res.cloudinary.com/phlab/image/upload/v1557198494/echo/test/02_wdid88.png" alt="Joseph akintolayo"/></div>
                     <div class="author_description">
                        <h4 class="f_500 t_color3 f_size_18">Joseph Akintola</h4>
                        <h6>CEO/Founder - Philanthrolab</h6>
                     </div>
                     <p>I have had the pleasure of working with Daniel on many projects.
                     He has been an excellent resource and diligent in his approach to finding the best solutions to challenging problems.
                     He really raises the bar with his commincation and overall motivation.
                     He’s been indispensable and a major part of our client success.
                     I could not rate him higher</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      <section id="contact" class="app_service_area align-center">
         <div class="curved"></div>
         <div class="container">
            <div class="row">
               <div class="col-lg-12">
                  <div class="action_content text-center">
                     <h2 class="f_600 f_size_30 l_height45 mb_40">Ready to Grow YOUR Sales Funnel while Protecting YOUR Data?</h2>
                  </div>
               </div>
            </div>
         </div>
      <section class="contact_info_area sec_pad bg_color">
         <div class="container">
            <div class="row">
               <div class="col-lg-3 pr-0">
                  <div class="contact_info_item">
                     <h6 class="f_p f_size_20 t_color3 f_500 mb_20">Get to know us</h6>
                     <a class="f_400 f_size_15" href="https://www.notion.so/milacrm/8498353e92374913a0431647f519607f?v=d5f3659989474fd8893c3f4819c2ca16">MILA CRM Roadmap</a>
                  </div>
                  <div class="contact_info_item">
                     <h6 class="f_p f_size_20 t_color3 f_500 mb_20">Let's be Partners</h6>
                     <p class="f_400 f_size_15"><span class="f_400 t_color3">Email:</span> <a href="mailto:admin@milalabs.org">admin@milalabs.org</a></p>
                  </div>
                  <div class="contact_info_item">
                     <h6 class="f_p f_size_20 t_color3 f_500 mb_20">Donations are Welcome</h6>
                     <p class="f_400 f_size_15"><span class="f_400 t_color3">BTC:</span> <span>AkBXxeh7iqYvAyvrvUBxkpFQxBDekhx8J</span></p>
                  </div>
               </div>
               <div class="col-lg-8 offset-lg-1">
                  <div class="contact_form">
                     <form action="https://formspree.io/contact@echoisolutions.com" class="contact_form_box" method="post" id="contactForm">
                        <input type="hidden" name="_subject" value="Echoisolutions Contact Form"/>
                        <div class="row">
                           <div class="col-lg-6">
                              <div class="form-group text_box">
                                 <input type="text" id="name" name="name" placeholder="Your Name" required/>
                              </div>
                           </div>
                           <div class="col-lg-6">
                              <div class="form-group text_box">
                                 <input type="email" name="email" id="email" placeholder="Your Email" required/>
                              </div>
                           </div>
                           <div class="col-lg-12">
                              <div class="form-group text_box">
                                 <textarea name="message" id="message" cols="30" rows="10" placeholder="Enter Your Message . . ." required></textarea>
                              </div>
                           </div>
                        </div>
                        <button type="submit" name="submit" class="btn_three">Send Us Message</button>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </section>
      </section>

      <footer class="footer_area footer_area_four f_bg">
              <div class="footer_top">
                  <div class="container">
                      <div class="row">
                          <div class="col-lg-6 col-md-6">
                              <div class="f_widget w-50 company_widget">
                                  <a href="/" class="f-logo"><img src={Favicon2} alt=""/></a>
                              </div>
                          </div>
                          <div class="col-lg-3 col-md-6">
                              <div class="f_widget about-widget pl_40">
                                  <h3 class="f-title f_600 t_color f_size_18 mb_40">Quick Links</h3>
                                  <ul class="list-unstyled f_list">
                                      <li><a href="/">Home</a></li>
                                      <li><a href="/#start">About</a></li>
                                      <li><a href="/#contact">Contact</a></li>
                                      <li><a href="https://medium.com/@danielparamo">Blog</a></li>
                                  </ul>
                              </div>
                          </div>
                          <div class="col-lg-3 col-md-6 pl-20">
                              <div class="f_widget about-widget">
                                  <h3 class="f-title f_600 t_color f_size_18 mb_40">Team Solutions</h3>
                                  <ul class="list-unstyled f_list">
                                      <li><p>Privacy</p></li>
                                      <li><p>Decentralized</p></li>
                                      <li><p>360 Customer View</p></li>
                                      <li><p>Sales Consultation</p></li>
                                  </ul>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="footer_bottom">
                  <div class="container">
                      <div class="row align-items-center">
                          <div class="col-lg-4 col-md-5 col-sm-6">
                              <p class="mb-0 f_300">Copyright &copy; 2019</p>
                          </div>
                          <div class="col-lg-4 col-md-3 col-sm-6">
                              <div class="f_social_icon_two text-center">
                                  <a href="https://twitter.com/mila_labs"><i class="ti-twitter-alt"></i></a>
                              </div>
                          </div>
                          <div class="col-lg-4 col-md-4 col-sm-12">
                              <ul class="list-unstyled f_menu text-right">
                                  <li>All rights reserved &copy; MILA Labs</li>
                              </ul>
                          </div>
                      </div>
                  </div>
              </div>
          </footer>
      </body>
      </html>
    );
  }
}
