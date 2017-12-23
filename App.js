import React from 'react'
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default class App extends React.Component {
  state = {
    tasks:["Wash", "Clean", "learn", "Add Tasks."]
  };

  handleTextCreation = task => {
    alert(task);
  };

  render() {
    return (
      <View justifyContent="space-around" height="100%">
          <TaskInput onTaskCreation={this.handleTextCreation}/>
          <TaskList >
            {this.state.tasks.map((task, index) =>
              <Task key={index} description={task}/>
            )}
          </TaskList>
      </View>
    );
  }
}

class TaskInput extends React.Component {

  state = {
    text: ""
  };

  handleTextChange = text => {
    this.setState({text});
  };

  handleSubmit = () => {
    this.props.onTaskCreation(this.state.text);
    this.setState({ text: "" })
  }

  render() {
    return (
    <View flex={1} backgroundColor="pink" justifyContent="center" padding={40}>
      <TextInput style={styles.inputName}
      onChangeText={this.handleTextChange}
      onSubmitEditing={this.handleSubmit}
      value={this.state.text}
      />
    </View>
  );
  }
}

const TaskList = props =>
<View flex={3} alignItems="center">
  {props.children}
</View>;

const Task = props =>
<View width={300} backgroundColor="#eee" margin={10} padding={10}>
  <Text fontSize={20}>
    {props.description}
  </Text>
</View>;

const styles = StyleSheet.create({
  inputName:{
    backgroundColor: 'white',
    height: 30
  }
});
