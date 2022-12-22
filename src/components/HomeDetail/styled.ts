import styled from "@emotion/styled";

export const HomeDetailWapper = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: space-between;
`;

export const LeftWapper = styled.div`
    width: 55%;
    height: 100%;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    align-items:flex-start;
    padding: 5vh 8% 15vh 8%;
    position: relative;

`;

export const BackBtn = styled.div`
    position: absolute;
    top: 40px;
    left: 50px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
`;

export const DeleteBtn = styled.div`
    position: absolute;
    top: 50px;
    left: 87%;
    width: 80px;
    height: 30px;
    font-size: 1.1rem;
    border-radius: 50%;
    cursor: pointer;
    color: red;
`;

export const ModifyBtn = styled.div`
    position: absolute;
    top: 50px;
    left: 79%;
    width: 80px;
    height: 30px;
    font-size: 1.1rem;
    border-radius: 50%;
    cursor: pointer;
    color: orange
`;



export const DecsWapper = styled.div`
    height:650px;
    display:flex;
    flex-direction:column;
    align-items:flex-start;
    justify-content: center;
    gap: 35px;
    font-size: 1.3rem;
`;

export const DecsTitle = styled.div`
    font-size: 2.5rem;
    font-weight: bold;

    input {
        width: 400px;
        height: 50px;
        font-size: 1.5rem;
        padding-left: 30px;
        background: #FFFFFF;
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        outline: none;
        border: none;
    }
`;

export const DecsContent = styled.div`
    font-size: 1.5rem;
    color: rgba(114, 111, 111, 1);

    textarea{
        border: none;
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        outline: none;

        height: 10vh;
        padding: 15px 13px;
        color: black;
        resize: none;
        font-size: 1.3rem;
        background-color: white;
    }
`;

export const SpanWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 25px;

    input {
        width: 200px;
        height: 30px;
        font-size: 1.1rem;
        padding-left: 20px;
        background: #FFFFFF;
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        outline: none;
        border: none;
        margin-left: 10px;
    }
    input[type="date"]::before {
    display:none;
    }
    input[type="date"].after::-webkit-calendar-picker-indicator{
    margin-left: 0px;
    }
    input[type="number"] {
        text-align: center;
        padding: 0;
    }
    input[type='number']::-webkit-outer-spin-button,
    input[type='number']::-webkit-inner-spin-button {
	  -webkit-appearance: none;
	  margin: 0;
    }
    span {
        display: flex;
        align-items: center;
        gap: 20px;
    }
`;

export const TopicBtns = styled.div`
    width: 80%;
    height: 45px;

    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;

    input{
        display: none;
    }
    input[type=radio]+label{
        width: 100px;
        height: 30px;
        display: flex;
        font-size: 1.1rem;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        background: #F2F2F2;
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
        color: rgba(121, 121, 121, 0.8);
        cursor: pointer;
    }
    input[type=radio]:checked+label{
        background: #FFCD9F;
        color: white;
    }
`;

export const SubmitBtn = styled.button`
    width: 100%;
    height: 60px;
    display:flex;
    align-items:center;
    justify-content:center;
    color: white;
    background: #77D6B3;
    border-radius: 10px;
    cursor: pointer;
    border: none;
    font-size: 1.3rem;
    font-weight: bold;
`;

export const RightWapper = styled.div`
    width: 55%;
    height: 100%;
    display:flex;
    flex-wrap:wrap;
    justify-content:flex-start;
    align-content:flex-start;
    padding: 10vh 4% 0 4.3%;
    gap: 5%;
    background: #EFEFEF;
    overflow-y: scroll;
`;