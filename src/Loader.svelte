<style>
  .loader {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>

<div class="loader">
  <svg viewBox="0 0 100 100">
    <path d="M50 5A45 45 0 0 0 5 50a45 45 0 0 0 90 0 45 45 0 0 0-45-45z" fill="#000"/>
  </svg>
</div>
