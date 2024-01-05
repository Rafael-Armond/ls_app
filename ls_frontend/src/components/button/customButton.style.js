import styled from 'styled-components';

export const Button = styled.button`
    padding: 8px 16px; /* Espaçamento interno */
    border: 1px solid gray;
    border-radius: 5px; /* Bordas levemente arredondadas */
    background-color: ${(props) => props.disabled ? '#696969' : props.color}; /* Cor de fundo do botão */
    color: black; /* Cor do texto */
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
    margin-top: 2.5vh;

    &:hover {
        background-color: #e0e0e0 !important;  /* Altera a cor de fundo ao passar o mouse */
    }
`;