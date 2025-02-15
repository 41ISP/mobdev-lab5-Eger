import {StyleSheet} from 'react-native';

const _styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15
    },
    inputBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 5,
        marginRight: 5,
    },
    dropdown: {
        marginBottom: 10,
        height: 40,
        borderBottomWidth: 1,
    },
});

export default _styles;