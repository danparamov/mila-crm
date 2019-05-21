<!doctype html>
<html lang="en">
   <head>
      <title> CONTACT US - ECHOISOLUTIONS </title>
      <?php include 'includes/meta.php' ?>
   </head>
   <body>
      <?php include 'includes/header.php' ?>
      <section class="breadcrumb_area">
         <div class="container">
            <div class="breadcrumb_content text-center">
               <h1 class="f_p f_700 f_size_50 b_color l_height50 mb_20">Contact Us</h1>
            </div>
         </div>
      </section>
      <section class="contact_info_area sec_pad bg_color">
         <div class="container">
            <div class="row">
               <div class="col-lg-3 pr-0">
                  <div class="contact_info_item">
                     <h6 class="f_p f_size_20 t_color3 f_500 mb_20">Office Address</h6>
                     <p class="f_400 f_size_15">Dallas TX, US.</p>
                  </div>
                  <div class="contact_info_item">
                     <h6 class="f_p f_size_20 t_color3 f_500 mb_20">Contact Info</h6>
                     <p class="f_400 f_size_15"><span class="f_400 t_color3">Phone:</span> <a href="tel:817-500-7283">+817-500-7283</a></p>
                     <p class="f_400 f_size_15"><span class="f_400 t_color3">Email:</span> <a href="mailto:contact@echoisolutions.com">contact@echoisolutions.com</a></p>
                  </div>
               </div>
               <div class="col-lg-8 offset-lg-1">
                  <div class="contact_form">
                     <form action="https://formspree.io/contact@echoisolutions.com" class="contact_form_box" method="post" id="contactForm">
                        <input type="hidden" name="_subject" value="Echoisolutions Contact Form" />
                        <div class="row">
                           <div class="col-lg-6">
                              <div class="form-group text_box">
                                 <input type="text" id="name" name="name" placeholder="Your Name" required>
                              </div>
                           </div>
                           <div class="col-lg-6">
                              <div class="form-group text_box">
                                 <input type="email" name="email" id="email" placeholder="Your Email" required>
                              </div>
                           </div>
                           <div class="col-lg-12">
                              <div class="form-group text_box">
                                 <textarea name="message" id="message" cols="30" rows="10" placeholder="Enter Your Message . . ." required></textarea>
                              </div>
                           </div>
                        </div>
                        <button type="submit" name="submit" class="btn_three">Send Message</button>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </section>

      <?php include 'includes/footer.php' ?>
   </body>
</html>
