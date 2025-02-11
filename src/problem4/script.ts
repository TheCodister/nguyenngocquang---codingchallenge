function sum_to_n_a1(n: number): number {
  return (n * (n + 1)) / 2;
}

function sum_to_n_b1(n: number): number {
  if (n === 1) return 1;
  return n + sum_to_n_b(n - 1);
}

function sum_to_n_c1(n: number): number {
  return [...Array(n).keys()]
    .map((i) => i + 1)
    .reduce((acc, val) => acc + val, 0);
}

function sum_to_n_d1(n: number): number {
  return (n >> 1) * (n + 1) + (n & 1 ? (n + 1) >> 1 : 0);
}

function sum_to_n_e1(n: number): number {
  if (n === 1) return 1;
  if (n === 2) return 3;

  let mid = Math.floor(n / 2);
  return sum_to_n_e(mid) + sum_to_n_e(n - mid);
}

const testValue = 10_000; // Test with a large value

console.time("Gauss Formula");
sum_to_n_a1(testValue);
console.timeEnd("Gauss Formula");

console.time("Recursion");
sum_to_n_b1(testValue); //Cause stack overflow for large n
console.timeEnd("Recursion");

console.time("Array Reduce");
sum_to_n_c1(testValue);
console.timeEnd("Array Reduce");

console.time("Bitwise Summation");
sum_to_n_d1(testValue);
console.timeEnd("Bitwise Summation");

console.time("Divide & Conquer");
sum_to_n_e1(testValue);
console.timeEnd("Divide & Conquer");
