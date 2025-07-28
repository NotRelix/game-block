document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.delete-form').forEach((form) => {
    form.addEventListener('submit', (e) => {
      const password = prompt("Please enter the admin password:");
      if (password === null) {
        e.preventDefault();
      } else if (password !== 'loading') {
        alert("Incorrect Password");
        e.preventDefault();
      }
    });
  });
});
