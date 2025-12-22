// Initialize all tooltips after DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.forEach(function (tooltipTriggerEl) {
    // Assumes that Bootstrap's JS is included globally
    new bootstrap.Tooltip(tooltipTriggerEl);
  });
});
