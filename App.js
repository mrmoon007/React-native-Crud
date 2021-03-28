import {View, Text} from 'native-base';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  List,
  ListItem,
} from 'native-base';
import React, {useState} from 'react';
import {ScrollView, TextInput} from 'react-native';

export default function App() {
  const [state, setState] = useState({
    name: null,
    email: null,
    phone: null,
    id: null,
    list: [],
  });

  const [status, setStatus] = useState(false);

  const submitHandler = () => {
    const cloneState = {...state};
    const data = {
      name: state.name,
      email: state.email,
      phone: state.phone,
    };
    cloneState.list.push(data);
    setState(cloneState);
    console.log(state);
  };

  const onchangeHandler = (e, name) => {
    const cloneState = {...state};
    cloneState[name] = e;
    setState(cloneState);
  };

  const deleteHandler = (id, data) => {
    const cloneState = {...state};
    cloneState.list.splice(id, 1);
    setState(cloneState);
  };

  const editHandler = (id, data) => {
    setStatus(true);
    const cloneState = {...state};
    cloneState.name = data.name;
    cloneState.email = data.email;
    cloneState.phone = data.phone;
    cloneState.id = id;
    setState(cloneState);
  };

  const updateHandler = () => {
    const cloneState = {...state};
    for (let i = 0; i < state.list.length; i++) {
      const element = cloneState.list[i];
      if (i === state.id) {
        element.name = state.name;
        element.email = state.email;
        element.phone = state.phone;
      }
    }
    setState(cloneState);
    setStatus(false);
  };

  return (
    <Container>
      <Header />
      <Content>
        <Form>
          <Item stackedLabel>
            <Label>Name</Label>
            <Input
              onChangeText={e => onchangeHandler(e, 'name')}
              value={state.name}
            />
          </Item>
          <Item stackedLabel last>
            <Label>Email</Label>
            <Input
              onChangeText={e => onchangeHandler(e, 'email')}
              value={state.email}
            />
          </Item>
          <Item stackedLabel last>
            <Label>Phone Number</Label>
            <Input
              onChangeText={e => onchangeHandler(e, 'phone')}
              value={state.phone}
            />
          </Item>

          <Button block info onPress={status ? updateHandler : submitHandler}>
            {status ? <Text>Update</Text> : <Text>Save</Text>}
          </Button>
        </Form>
        {state.list.map((data, id) => (
          <ScrollView>
            <View
              style={{
                width: '90%',
                height: 250,
                backgroundColor: 'gray',
                margin: 2,
                alignItems: 'center',
              }}>
              <List>
                <ListItem>
                  <Text>{data.name}</Text>
                </ListItem>
                <ListItem>
                  <Text>{data.email}</Text>
                </ListItem>
                <ListItem>
                  <Text>{data.phone}</Text>
                </ListItem>
                <ListItem>
                  <Button
                    rounded
                    danger
                    style={{margin: 3}}
                    onPress={e => deleteHandler(id, data)}>
                    <Text>delete</Text>
                  </Button>
                  <Button
                    rounded
                    success
                    style={{margin: 3}}
                    onPress={e => editHandler(id, data)}>
                    <Text>Edit</Text>
                  </Button>
                </ListItem>
              </List>
            </View>
          </ScrollView>
        ))}
      </Content>
    </Container>
  );
}
