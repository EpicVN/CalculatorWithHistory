import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import InputMath from './InputMath';
import { ArrowDownOnSquareIcon } from "react-native-heroicons/outline";

function my_eval(t) {
    let result = { value: '', isError: false };
    try {
        result.value = eval(t);
    } catch(error) {
        result.value = "Syntax Error: " + error.message;
        result.isError = true;
    }
    return result;
  }

export default function History() {
    const [value, setValue] = useState('')
    const result = my_eval(value);
    const [history, setHistory] = useState([]);
    const [selectedExpression, setSelectedExpression] = useState(null);

    const handleEvaluate = () => {
        if (!result.isError) {
        setHistory([...history, { expression: value, result: result.value }]);
        }
    };

    const handleClearHistory = () => {
        setHistory([]);
        setSelectedExpression(null);
    };

    const handleReuseExpression = (expression) => {
        setSelectedExpression(expression);
        setValue(expression);
    };

    const HistoryFlatList = () => {
        return (
            <FlatList
                data={history}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                <View style={styles.historyItem}>
                    <Text>
                    {item.expression} = {item.result}
                    <TouchableOpacity
                        title="Reuse" 
                        onPress={() => handleReuseExpression(item.expression)}
                    >

                    </TouchableOpacity>
                    </Text>
                </View>
                )}
            />
        )
    }

    return (
        <View>
            {/*Input math*/}
            <InputMath
                style={styles.textField}
                defaultValue={value}
                label="Type your math here"
                onChangeText={(newVal) => setValue(newVal)}
            />

            {/*Save history math button*/}
            <TouchableOpacity
                className=' bg-sky-600'
                style={styles.btnHistory}
                onPress={handleEvaluate} 
            >
                <ArrowDownOnSquareIcon color={'lightgray'} size={'32'}/>
            </TouchableOpacity>

            {/*Show result of the math*/}
            <Text
                className='border-solid border-2 mb-4 h-14 pl-2 pr-2'
                style={{fontSize: result.isError ? 15 : 40, color:result.isError ? 'red': 'lightgreen'}}
            >
                {result.value}
            </Text>

            {/*History list*/}
            <Text style={styles.historyTitle}>History</Text>
            <FlatList
                ListFooterComponent={<HistoryFlatList/>}
            />

            {/*Clear history*/}
            <TouchableOpacity
                className='bg-red-500 mb-8 mt-8'
                style={styles.btnHistory}
                onPress={handleClearHistory} 
            >
                <Text className='text-sm text-white font-semibold'>CLEAR HISTORY</Text>
            </TouchableOpacity>
        </View>
  )
}

const styles = StyleSheet.create({
    textField: {
      marginBottom: 32,
    },
    historyTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 16,
      marginTop: 16
    },
    historyItem: {
      borderBottomWidth: 1,
      borderColor: 'lightgray',
      padding: 8,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    btnHistory: {
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    }
  })