function initializeDarkMode() {
    const checkbox = document.getElementById('darkmode');
    const html = document.documentElement;
  
    //Vérifiez si le mode sombre est activé dans le localStorage
    if (localStorage.getItem('darkmode') === 'enabled') {
      checkbox.checked = true;
      html.classList.add('dark');
    }
  
    // Écoutez les changements sur la checkbox
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        html.classList.add('dark');
        localStorage.setItem('darkmode', 'enabled');
      } else {
        html.classList.remove('dark');
        localStorage.setItem('darkmode', 'disabled');
      }
    });
  }
  
  export { initializeDarkMode };