import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components/native';

import Calculator from './Calculator';

const Container = styled.View`
  display: flex;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

const Content = styled.View`
  background-color: white;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
`;

const App = () => {
  return (
    <Container>
      <Content>
        <Calculator />
      </Content>
      <StatusBar style='auto' />
    </Container>
  );
};

export default App;
