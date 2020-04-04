import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 500;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  button:hover {
    opacity: 0.8;
  }

  .modal {
    width: 100%;
    height: 100%;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal-body {
    /* max-height: 500px; */
    background: red;
  }


  /* .modal; */

  input::placeholder {
    opacity: 0.6;
  }
`

export default GlobalStyle
