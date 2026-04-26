export class LinkedList {
  constructor() {
    this.header = null;
  }

  append(key, value) {
    // adds a new node containing value to the end of the list.
    const newNode = new Node(key, value);
    if (this.header === null) {
      this.header = newNode;
      newNode.next = null;
      return;
    }
    let tmp = this.header;
    while (tmp.next !== null) {
      tmp = tmp.next;
    } 
    tmp.next = newNode;
    newNode.next = null; 
  }

  prepend(key, value) {
    // adds a new node containing value to the start of the list.
    const newNode = new Node(key, value);
    newNode.next = this.header;
    this.header = newNode;
  }

  size() {
    // returns the total number of nodes in the list.
    let tmp = this.header;
    let counter = 0;
    while (tmp !== null) {
      tmp = tmp.next;
      counter += 1;
    }
    return counter;
  }

  head() {
    // should return the value of the first node in the list. If the list is empty, it should return undefined.
    if (this.header === null) {
      return undefined;
    } else {
      return this.header.data;
    }
  }

  tail() {
    // should return the value of the final node in the list. If the list is empty, it should return undefined.
    if (this.header === null) {
      return undefined;
    } else {
      let tmp = this.header;
      while (tmp.next !== null) {
        tmp = tmp.next;
      }
      return tmp.data;
    }
  }

  at(index) {
    // should return the value of the node at the given index. If there’s no node at the given index, it should return undefined.
    const sizeOfLinkedList = this.size();
    if (index > sizeOfLinkedList - 1) {
      return undefined;
    }
    if (this.header === null) {
      return undefined;
    } else {
      let tmp = this.header;
      let value = "";
      for (let i = 0; i <= index; i++) {
        value = tmp.data;
        tmp = tmp.next;
      }
      return value;
    }
  }

  pop() {
    // should remove the header node from the list and return its value. If it’s used on an empty list, it should just return undefined.
    if (this.header === null) {
      return undefined;
    } else {
      const data = this.header.data;
      this.header = this.header.next;
      return data;
    }
  }

  contains(value) {
    // returns true if the passed in value is in the list and otherwise returns false.
    if (this.header === null) {
      return false;
    }
    let tmp = this.header;
    while (tmp !== null) {
      if (tmp.data === value) {
        return true;
      }
      tmp = tmp.next;
    }
    return false;
  }

  findIndex(value) {
    // returns the index of the node containing the given value. If the value can’t be found in the list, it should return -1. 
    // If more than one node has a value matching the given value, it should return the index of the first node with the matching value.
    let tmp = this.header;
    let counter = 0;
    while (tmp !== null) {
      if (tmp.data === value) {
        return counter;
      }
      tmp = tmp.next;
      counter += 1;
    }
    return -1;
  }

  toString() {
    // represents your LinkedList objects as strings, so you can print them out and preview them in the console. 
    // If the list is empty, it should return an empty string. The format should be: ( value ) -> ( value ) -> ( value ) -> null.
    let tmp = this.header;
    let string = '';
    while (tmp !== null ) {
      string += `( ${tmp.data} ) -> `
      tmp = tmp.next;
    }
    string += 'null';
    return string;
  }
}

class Node {
  constructor(key, value) {
    this.data = {key: key, value: value};
    this.next = null;
  }
}
