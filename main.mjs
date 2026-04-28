import { LinkedList } from './LinkedList.mjs';

class HashMap {
  constructor () {
    this.loadFactor = 0.75;
    this.capacity = 16;
    this.bucket = new Array(this.capacity).fill(null);
  }

  hash(key) {
    // Takes a key and produces a hash code with it.
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }
    return hashCode;
  }

  set(key, value) {
    // takes two arguments: the first is a key, and the second is a value that is assigned to this key.     
    // If a key already exists, then the old value is overwritten, and we can say that we update the key’s value 
    const hashCode = this.hash(key);
    if (this.bucket[hashCode] === null) {
      const newLinkedList = new LinkedList();
      newLinkedList.append(key, value);
      this.bucket[hashCode] = newLinkedList;
    } else if (this.bucket[hashCode] !== null) {
      this.bucket[hashCode].append(key, value);
    }
    console.log(hashCode);
    this.expandCapacity();
  }

  get(key) {
    // takes one argument as a key and returns the value that is assigned to this key. If a key is not found, return null.
    if (this.has(key) === false) {
      return null;
    }
    const hashCode = this.hash(key);
    const index = this.bucket[hashCode].findIndex(key);
    const returnValue = this.bucket[hashCode].at(index);
    return returnValue;
  }

  has(key) {
    // takes a key as an argument and returns true or false based on whether or not the key is in the hash map.
    const hashCode = this.hash(key);
    if (hashCode < 0 || hashCode > this.capacity) {
      return false;
    }
    if (this.bucket[hashCode] !== null && this.bucket[hashCode].containsKey(key)) {
      return true;
    }
   return false; 
  }

  remove(key) {
    // takes a key as an argument. 
    // If the given key is in the hash map, it should remove the entry with that key and return true. If the key isn’t in the hash map, it should return false.
    if (this.has(key) === false) {
      return false;
    }
    const hashCode = this.hash(key);
    if (this.bucket[hashCode].header.next === null) {
      this.bucket[hashCode] = null;
    } else {
      this.bucket[hashCode].removeNode(key);
    }
    return true;
  }

  length() {
    // returns the number of stored keys in the hash map.
    let count = 0;
    this.bucket.forEach(e => {
      if (e !== null) {
        count = count + e.size();
      }
    });
    return count;
  }

  currentLoadFactor() {
    const currentLoadFactor = this.length() / this.capacity;
    return currentLoadFactor;
  }

  expandCapacity() {
    if (this.currentLoadFactor() > this.loadFactor) {
      this.capacity *= 2;
      const allKeyValuePairs = this.entries();
      this.bucket = new Array(this.capacity).fill(null);
      allKeyValuePairs.forEach(e => {
        this.set(e.key, e.value);
      })
    }
  }

  clear() {
    // removes all entries in the hash map
    this.bucket.fill(null);
  }

  keys() {
    // NOCH OFFEN
    // returns an array containing all the keys inside the hash map
    let keysArray = [];
    this.bucket.forEach(e => {
      if (e !== null) {
        keysArray.push(e.key);
      }
    });
    return keysArray;
  }

  values() {
    // NOCH OFFEN
    // returns an array containing all the values
    let valuesArray = [];
    this.bucket.forEach(e => {
      if (e !== null) {
        valuesArray.push(e.value);
      }
    });
    return valuesArray;
  }

  entries() {
    // returns an array that contains each key, value pair.
    let entriesArray = [];
    this.bucket.forEach(e => {
      if (e !== null) {
        const size = e.size();
        for (let i = 0; i < size; i++) {
          entriesArray.push(e.pop());
        }
      }
    });
    return entriesArray;
  }
}

const test = new HashMap();

test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');

console.dir(test.bucket, { depth: null});
console.log(test.length());
console.log(`Current Load Factor: ` + test.currentLoadFactor());

test.set('moon', 'silver');
console.log(test.length());
console.dir(test.bucket, { depth: null});
console.log(`Current Load Factor: ` + test.currentLoadFactor());

console.log(`Key lion has value:`, test.get('lion'));
console.log(`Key rhino has value: ` + test.get('rhino'));

console.log(`Has key lion: ` + test.has('lion'));
console.log(`Has key rhino: ` + test.has('rhino'));

console.log(`Remove key lion: ` + test.remove('lion'));
// console.log(`Remove key dog: ` + test.remove('dog'));
console.log(`Remove key rhino: ` + test.remove('rhino'));
console.dir(test.bucket, { depth: null});
console.log(test.length());

console.dir(test.entries(), { depth: null });
// console.log(test.values());
// console.log(test.keys());
//
// test.clear();
// console.dir(test.bucket, { depth: null});
