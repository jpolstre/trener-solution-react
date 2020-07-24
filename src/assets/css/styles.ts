import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  html, body, #root{
    height: 100vh;
    font-family: Roboto, sans-serif;
  }

  *, button, input{
    border: 0;
    outline: 0;
  }

  :root {
    --primary: #D4D9E3;
    --secondary: #222;

    --tertiary: #110f0f;

    --active: #323232;

    --white: #fff;
    --black: #000;
    --gray: #A9A9A9;
    --link: #566E98;

    --focus:#1E90FF;

    --text-white: #FFF;
    --text-black: #000;
    --text-blue: blue;
  }`