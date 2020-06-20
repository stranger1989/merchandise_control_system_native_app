import React from "react";
import { Container, Content, Text, List, ListItem } from "native-base";
const routes = ["Home", "Add", "Account"];

const SideBar: React.FC<any> = ({navigation}) => {
  return (
    <Container>
      <Content>
        <List
          dataArray={routes}
          renderRow={data => {
            return (
              <ListItem
                button
                onPress={() => navigation.navigate(data)}
              >
                <Text>{data}</Text>
              </ListItem>
            );
          }}
        />
      </Content>
    </Container>
  );
}

export default SideBar;