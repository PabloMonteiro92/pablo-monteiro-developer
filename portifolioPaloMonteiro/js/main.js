// Smooth scrolling for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault(); // Prevent default anchor click behavior

    // Scroll to the target section smoothly
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Form submission for the contact form using EmailJS
const contactForm = document.querySelector(".contact-form");
const formFeedback = document.getElementById("formFeedback");
const submitBtn = document.getElementById("submitBtn");

// Initialize EmailJS with your Public Key
(function () {
  emailjs.init({
    publicKey: "IRln9FFgBf5yD17MS",
  });
})();

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submission

    const name = this.querySelector('input[name="name"]').value;
    const email = this.querySelector('input[name="email"]').value;
    const message = this.querySelector('textarea[name="message"]').value;

    // Basic validation
    if (name === "" || email === "" || message === "") {
      showFeedback(
        "Por favor, preencha todos os campos obrigatórios.",
        "error"
      );
      return;
    }

    if (!validateEmail(email)) {
      showFeedback("Por favor, insira um endereço de e-mail válido.", "error");
      return;
    }

    // Show loading state
    setButtonState(true);
    showFeedback("Enviando...", "loading");

    // Prepare data to send
    const templateParams = {
      name: name,
      email: email,
      subject: this.querySelector('input[name="subject"]').value, // Getting subject field
      message: message,
    };

    // Send the email using EmailJS
    emailjs.send("service_51ituxo", "template_0m2cj7u", templateParams).then(
      (response) => {
        console.log("SUCCESS!", response.status, response.text);
        setButtonState(false);
        showFeedback(
          "Mensagem enviada com sucesso! Entrarei em contato em breve.",
          "success"
        );
        contactForm.reset(); // Reset form after successful submission
      },
      (error) => {
        console.log("FAILED...", error);
        setButtonState(false);
        showFeedback(
          "Falha ao enviar a mensagem. Tente novamente mais tarde.",
          "error"
        );
      }
    );
  });
}

// Helper function to validate email format using a regular expression
function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// Helper function to show form feedback
function showFeedback(message, type) {
  formFeedback.textContent = message;
  formFeedback.className = "form-feedback " + type;
}

// Helper function to manage button state
function setButtonState(isSending) {
  if (isSending) {
    submitBtn.querySelector(".btn-text").style.display = "none";
    submitBtn.querySelector(".btn-loading").style.display = "inline-block";
    submitBtn.disabled = true;
  } else {
    submitBtn.querySelector(".btn-text").style.display = "inline-block";
    submitBtn.querySelector(".btn-loading").style.display = "none";
    submitBtn.disabled = false;
  }
}
