import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  state={
    tasks:[
      "Wash",
      "Clean",
      "learn"
    ]
  };

  render() {
    return (
      <View justifyContent="space-around" height="100%">
          <View flex={1} backgroundColor="pink">
            <Text>Input</Text>
          </View>
          <TaskList >
            {this.state.tasks.map((task, index) =>
              <Task key={index} description={task}/>
            )}
          </TaskList>
      </View>
    );
  }
}

const TaskList = props =>
<View flex={3} backgroundColor="limegreen" alignItems="center">
  {props.children}
</View>;

const Task = props =>
<View width={300} backgroundColor="white" margin={20}>
  <Text>
    {props.description}
  </Text>
</View>;
