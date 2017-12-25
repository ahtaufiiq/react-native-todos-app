import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, AsyncStorage, ScrollView, Dimensions } from 'react-native';

export default class App extends React.Component {
  state = {
    tasks:[]
  };

  componentDidMount() {
    AsyncStorage.getItem("tasks").then(tasks => {
      if (tasks) this.setState({
          tasks: JSON.parse(tasks)
        });
    });
  }

  handleTextCreation = task => {
    this.setState(state => ({
      tasks: [task, ...state.tasks]
    }), this.persistTasks);
  };

  handleTaskRemoval = taskId => {
    this.setState(state => ({
      tasks: state.tasks.filter((task,index) => index != taskId)
    }), this.persistTasks);
  };

  persistTasks = () => {
    AsyncStorage.setItem("tasks", JSON.stringify(this.state.tasks));
  }

  render() {
    let screenWidth = Dimensions.get('window').width;
    return (
      <View justifyContent="space-around" height="100%">
          <TaskInput onTaskCreation={this.handleTextCreation}/>
          <ScrollView>
          <TaskList style={{width: screenWidth, height: screenWidth *2448 /3264}}>
            {this.state.tasks.map((task, index) =>
              <Task key={index} id={index} description={task} onRemove={this.handleTaskRemoval}/>
            )}
          </TaskList>
          </ScrollView>
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
    <View backgroundColor="pink" justifyContent="center" padding={40}>
      <TextInput style={styles.inputName}
      onChangeText={this.handleTextChange}
      // onSubmitEditing={this.handleSubmit}
      value={this.state.text}
      />
      <Button style={styles.addButton}
        onPress={this.handleSubmit}
        title="Add Task"
        color="#841584"
        accessibilityLabel="Add Task"
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
<TouchableOpacity onPress={() => props.onRemove(props.id)}>
  <View width={300} backgroundColor="#eee" margin={10} padding={10}>
    <Text fontSize={20}>
      {props.description}
    </Text>
  </View>
  </TouchableOpacity>;


const styles = StyleSheet.create({
  inputName:{
    backgroundColor: 'white',
    height: 30
  },addButton: {
    position: 'absolute',
    zIndex: 11,
    right: 20,
    bottom: 90,
    backgroundColor: '#E91E63',
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8
},
addButtonText: {
    color: '#fff',
    fontSize: 15
}
});
