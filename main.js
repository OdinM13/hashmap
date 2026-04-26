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
    if (this.has(key)) {
      this.bucket[hashCode] = {key: key, value: value};
    }
    if (this.bucket[hashCode] !== null) {
      // Create LinkedList
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
    const returnValue = this.bucket[hashCode].value;
    return returnValue;
  }

  has(key) {
    // takes a key as an argument and returns true or false based on whether or not the key is in the hash map.
    const hashCode = this.hash(key);
    if (hashCode < 0 || hashCode > this.capacity) {
      return false;
    }
    if (this.bucket[hashCode].key === key) {
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
    this.bucket[hashCode] = null;
    return true;
  }

  length() {
    // returns the number of stored keys in the hash map.
    let count = 0;
    this.bucket.forEach(e => {
      if (e !== null) {
        count ++;
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
      const tmpBucket = this.bucket;
      this.bucket = new Array(this.capacity).fill(null);
      tmpBucket.forEach(e => {
        if (e !== null) {
          set(e.key, e.value);
        }
      })
    }
  }

  clear() {
    // removes all entries in the hash map
    this.bucket.fill(null);
  }

  keys() {
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
        entriesArray.push(e);
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
console.log(test.bucket);
console.log(test.length());
console.log(`Current Load Factor: ` + test.currentLoadFactor());
test.set('moon', 'silver');
console.log(test.bucket);
console.log(`Current Load Factor: ` + test.currentLoadFactor());
console.log(test.bucket);

console.log(`Key lion has value:`, test.get('lion'));
console.log(`Key rhino has value: ` + test.get('rhino'));

console.log(`Has key lion: ` + test.has('lion'));
console.log(`Has key rhino: ` + test.has('rhino'));

console.log(`Remove key lion: ` + test.remove('lion'));
console.log(`Remove key rhino: ` + test.remove('rhino'));
console.log(test.bucket);
console.log(test.length());

console.log(test.entries());
console.log(test.values());
console.log(test.keys());

test.clear();
console.log(test.bucket);

