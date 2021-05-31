const icons = document.querySelectorAll('.icon');

const navSlide = () => {
  icons.forEach (icon => {
    icon.addEventListener('click', (event) => {
      icon.classList.toggle("open");
    });
  });
};

navSlide();