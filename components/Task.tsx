import ITask from "@/shared/ITask"
import { useToDoStore } from "@/stores/store"
import { TextInput, View } from "react-native"
import { Switch } from "react-native"
import MyButton from "./Button"

interface IProps {
    task: ITask
}

const Task = ({task}: IProps) => {
    const {changeStatus, changeTitle, deleteTask} = useToDoStore()
    
    return (
        <View style={
            {
                //borderBottomColor: '#ccc',
                borderBottomWidth: 0.5,
                paddingBottom: 15
            }
        }>
            <TextInput 
                value={task.title}
                onChangeText={newText => changeTitle(task.id, newText)}
                />
            <Switch
                value={task.isDone}
                onValueChange={() => changeStatus(task.id)}
                />
            <MyButton
                color='#e53935'
                title="Удалить"
                onPress={() => deleteTask(task.id)}/>
        </View>
    )
}

export default Task