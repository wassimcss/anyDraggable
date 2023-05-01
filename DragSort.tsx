import Container from 'components/Container';
import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AnySizeDragSortableView } from 'react-native-drag-sort';

const DragSort = () => {
  const [items, setItems] = useState([
    { id: 1, text: 'Item 1' },
    { id: 2, text: 'Item 2' },
    { id: 3, text: 'Item 3' },
    // { id: 4, text: 'Item 4' },
  ]);

  const sortableViewRef = useRef();

  const onDataChange = (data, callback) => {
    setItems(data);
    callback();
  };

  const renderItem = (item, index, isMoved) => {
    return (
      <TouchableOpacity
        onLongPress={() => {
          sortableViewRef.current.startTouch(item, index);
        }}
        onPressOut={() => {
          sortableViewRef.current.onPressOut();
        }}
      >
        <View style={[styles.item,{width:index===2 ? 300 : 150}]}>
          <Text>{item.text}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Container style={styles.container}>
      <View style={styles.wrapper}>
        <AnySizeDragSortableView
        
          dataSource={items}
          onDataChange={onDataChange}
          renderItem={renderItem}
          //@ts-ignore
          ref={sortableViewRef}
          keyExtractor={(item, index) => item.id}
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  item: {
    padding: 10,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    width: 100,
  },
  wrapper:{
    width:300,
    backgroundColor:'green',
    height:200
  }
});

export default DragSort;
