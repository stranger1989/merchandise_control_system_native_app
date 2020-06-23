import React from 'react';
import { Container, Content } from 'native-base';

export default function CenterView({ children }) {
  return (
    <Container>
      <Content contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>
        {children}
      </Content>
    </Container>
  );
}

CenterView.defaultProps = {
  children: null,
};
