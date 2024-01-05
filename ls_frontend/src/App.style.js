import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    //background-color: #f5f5f5;
    align-items: flex-start; 
    min-height: 100vh; 
  }

  #root {
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
