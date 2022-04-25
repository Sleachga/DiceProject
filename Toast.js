import styled from 'styled-components';

const Container = styled.View`
  height: 100px;
  width: 80%;
  background-color: white;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

const ToastText = styled.Text`
  color: black;
`;

const toastConfig = {
  rollToast: ({ text1, props }) => (
    <Container>
      <ToastText>{text1}</ToastText>
      <ToastText>{props.uuid}</ToastText>
    </Container>
  ),
};

export default toastConfig;
