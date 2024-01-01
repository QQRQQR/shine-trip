let arr = ['a','b','c', 'a']
let arr2 = arr
let set = new Set([...arr])
console.log('arr', arr);
console.log('set', set);
console.log(arr == arr2);
console.log(arr == set);
