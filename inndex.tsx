@import "tailwindcss";

@layer base {
  :root {
    --font-playfair: 'Playfair Display', Georgia, serif;
    --font-cormorant: 'Cormorant Garamond', Georgia, serif;
    --font-poppins: 'Poppins', 'Plus Jakarta Sans', system-ui, sans-serif;
  }

  body {
    font-family: 'Poppins', 'Plus Jakarta Sans', system-ui, sans-serif;
    color: #2b1d16;
    background-color: #0d0907;
  }

  h1, h2, h3, .font-serif-display {
    font-family: 'Playfair Display', Georgia, serif;
  }
}

.font-serif-elegant {
  font-family: 'Playfair Display', Georgia, serif;
}

.font-cormorant {
  font-family: 'Cormorant Garamond', Georgia, serif;
}

.font-sans-clean {
  font-family: 'Poppins', 'Plus Jakarta Sans', system-ui, sans-serif;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #19120e;
}
::-webkit-scrollbar-thumb {
  background: #3e281f;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #734c38;
}
