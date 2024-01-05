import styled from 'styled-components';

export const CardContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-top: 4vh;
  background-color: #f5f5f5;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Avatar = styled.img`
  width: 100px; 
  height: 100px; 
  border-radius: 50%;
  object-fit: cover;
`;

export const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;