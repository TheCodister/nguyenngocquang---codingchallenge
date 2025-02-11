var sum_to_n_a = function (n) {
  return (n * (n + 1)) / 2; // Gauss Summation Formula. Complexity O(1)
};

var sum_to_n_b = function (n) {
  // Using Recursion. Complexity O(n)
  if (n === 1) return 1;
  return n + sum_to_n_b(n - 1);
};

var sum_to_n_c = function (n) {
  // Using Array and reduce() in functional programming. Complexity O(n)
  return [...Array(n).keys()]
    .map((i) => i + 1)
    .reduce((acc, val) => acc + val, 0);
};

//MORE WAYS TO SOLVE THE PROBLEM

var sum_to_n_d = function (n) {
  return (n >> 1) * (n + 1) + (n & 1 ? (n + 1) >> 1 : 0); // Bitwise operation, variation of the Gauss formula. Complexity O(1)
};

var sum_to_n_e = function (n) {
  if (n === 1) return 1;
  if (n === 2) return 3;

  let mid = Math.floor(n / 2);
  return sum_to_n_e(mid) + sum_to_n_e(n - mid); // Divide and Conquer. Complexity O(log n)
};

const n = 10000; // Test with a large value

console.time("Gauss Formula");
sum_to_n_a(n);
console.timeEnd("Gauss Formula");

console.time("Recursion");
sum_to_n_b(n); //cause stack overflow for large n
console.timeEnd("Recursion");

console.time("Array Reduce");
sum_to_n_c(n);
console.timeEnd("Array Reduce");

console.time("Bitwise Summation");
sum_to_n_d(n);
console.timeEnd("Bitwise Summation");

console.time("Divide & Conquer");
sum_to_n_e(n);
console.timeEnd("Divide & Conquer");

// Gauss Formula: 0.073ms
// Recursion: 0.941ms
// Array Reduce: 2.133ms
// Bitwise Summation: 0.084ms slower than Gauss Formula because of the conditional check
// Divide & Conquer: 1.513ms
