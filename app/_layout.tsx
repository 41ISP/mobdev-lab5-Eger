import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Button, FlatList, TextInput, View } from 'react-native';
import { useToDoStore } from '@/stores/store';
import Task from '@/components/Task';
import Filter from '@/shared/Filter';
import { Dropdown } from 'react-native-element-dropdown';
import 'react-native-reanimated';
import _styles from './styles';
import 'react-native-get-random-values'
import { nanoid } from 'nanoid'
import MyButton from '@/components/Button';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const styles = _styles
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [taskTitle, setTaskTitle] = useState('')

  const createTask = () => {
    if (!taskTitle){
      alert('Нельзя добавить задачу с пустым названием')
      return
    }
    const task = {id: nanoid(), title: taskTitle, isDone: false}
    console.log(task) 
    addTask(task)
  }

  const {tasks, addTask, deleteAll} = useToDoStore()

  const [filter] = useState<Filter>(new Filter())
  const [filterValue, setFilterValue] = useState('Все')

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      console.log(colorScheme)
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View style={styles.container}>
        <View style={styles.inputBox}>
          <TextInput
              style={styles.input}
              placeholder="Введите задачу"
              value={taskTitle}
              onChangeText={newTitle => setTaskTitle(newTitle)} // Обработка изменения текста
              onSubmitEditing={createTask} // Отправка по нажатию Enter (на мобильной клавиатуре)
              returnKeyType="done" // Настройка кнопки "Enter" на клавиатуре
          />
          <MyButton 
            title="Добавить" 
            onPress={createTask} />
        </View>
          <Dropdown
            labelField='label'
            valueField='value'
            data={filter.filters}
            value={filterValue}
            onChange={newValue => setFilterValue(newValue.value)}
            style={styles.dropdown}
          />
        
          <FlatList
            keyExtractor={(item) => item.id}
            data={tasks}
            renderItem={({item}) => {
              switch (filterValue) {
                case filter.toDo:{
                  if (!item.isDone){
                    return (<Task task={item}></Task>) 
                  }
                  return null
                }
                case filter.done: {
                  if (item.isDone){
                    return (<Task task={item}></Task>)
                  }
                  return null
                }
                default: {
                  return (<Task task={item}></Task>)
                }
              }
            }
          }/>
        
      </View>
    </ThemeProvider>
  );
}
