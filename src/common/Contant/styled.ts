import styled from "@emotion/styled";
import { themedPalette } from "../../styles/global";

export const Contant = styled.div`
  width: 30.1%;
  height: 11.5vh;
  background: #FFFFFF;
  border-radius: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 10px 15px;
  cursor: pointer;
  color : ${themedPalette.text};
  background-color: ${themedPalette.boxBackground};
  transition: all 0.3s ease-in;
`;

export const ContantTop = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  p{
    width: 80%;
    font-size: 1.3rem;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const ConferenceText = styled.span`
  color: #7092BA;
  font-weight: bold;
`;

export const ContantBottom = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Topic = styled.div`
  font-size: 1.1rem;
  display: flex;
  width: 60%;
  svg{
    width: 20px;
  }
`;

export const Date = styled.div`
  font-size: 1.1rem;
`;