# Code Review: WalletPage Component

## Computational Inefficiencies & Anti-Patterns

### 1. **Incorrect Filter Condition (Critical Bug)**

```tsx
// Broken filter logic (typo + inverted condition)
if (lhsPriority > -99) {
  // lhsPriority is undefined
  if (balance.amount <= 0) return true;
}
```

- **Bug**: `lhsPriority` typo (should be `balancePriority`)
- **Logic Error**: Filter keeps balances with `amount <= 0`, `amount === 0` is enough
- **Priority Check**: First condition redundant with priority threshold

### 2. **Incorrect Priority Mapping**

```tsx
// Type mismatch between currency and blockchain
interface WalletBalance {
  currency: string; // Used as blockchain identifier
  amount: number;
}

getPriority(balance.blockchain); // Property doesn't exist
```

- **Type Error**: WalletBalance has `currency`, not `blockchain`
- **Domain Mismatch**: Currency codes vs blockchain names (e.g., 'ETH' vs 'Ethereum')

### 3. **Unnecessary Memo Dependencies**

```tsx
const sortedBalances = useMemo(() => {
  // ...
}, [balances, prices]); // prices unused in calculation
```

### 4. **Unstable Sorting**

```tsx
.sort((lhs, rhs) => {
  // No tiebreaker for equal priorities
  if (leftPriority > rightPriority) return -1;
  else if (rightPriority > leftPriority) return 1;
  // Missing return 0 for equal case
});
```

### 5. **Key Anti-Pattern**

```tsx
key = { index }; // Dangerous for dynamic lists
```

### 6. **Redundant Formatting**

```tsx
const formattedBalances = sortedBalances.map(...); // Never used
```

- If this function can be helpful in the future, then move it to a utils folder so that it can be reuse again and again.

### 7. **Type Safety Issues**

```tsx
getPriority(blockchain: any) // Unspecified input type
interface Props extends BoxProps {} // Empty interface extension
```

### 8. **Prop Handling Issues**

```tsx
const { children, ...rest } = props; // Unused children
<div {...rest}> // Potential invalid HTML attributes
```

### 9. **If possible, move the interface to a type folder**

```tsx
// ./type/BalanceType.ts
interface WalletBalance {
  currency: string;
  amount: number;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}
```

### 10. **Lacks a lot of import**

```tsx
import WalletRow from "./components/WalletRow";
import { useWalletBalance, usePrices } from "./hooks";
```

### 11. **Refactor function getPriority**

- Make a constant BLOCKCHAIN_PRIORITY in constants folder.

```tsx
const BLOCKCHAIN_PRIORITY: PriorityMap = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};
```

- Refactor the new getPriority:

```tsx
const getPriority = useCallback(
  (blockchain: keyof typeof BLOCKCHAIN_PRIORITY): number =>
    BLOCKCHAIN_PRIORITY[blockchain] ?? -99,
  []
);
```

**Replaced switch with a Lookup Table**

- Before: The switch statement was used to map blockchain names to priority values.

- After: A lookup table (BLOCKCHAIN_PRIORITY) is used instead.

**Strongly Typed Input**

- Before: The blockchain parameter was typed as any, which is unsafe and can lead to runtime errors.

- After: The blockchain parameter is typed as keyof typeof BLOCKCHAIN_PRIORITY.

**Memoization with useCallback**

- Before: The function was recreated on every render.

- After: The function is memoized using useCallback.

---

## Refactored Implementation

```tsx
import WalletRow from "./component/WalletRow";
import { useWalletBalance, usePrices } from "./hooks";
import useCallback from react

//Could move these interface to a seperate file
interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string; // Added proper field
}

interface PriorityMap {
  [key: string]: number;
}

const BLOCKCHAIN_PRIORITY: PriorityMap = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};

const WalletPage: React.FC<BoxProps> = (props) => {
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = useCallback(
    (blockchain: keyof typeof BLOCKCHAIN_PRIORITY): number =>
      BLOCKCHAIN_PRIORITY[blockchain] ?? -99,
    []
  );

  const sortedBalances = useMemo(() => {
    const threshold = -99;

    return balances
      .filter((balance) => {
        const priority = getPriority(balance.blockchain);
        return priority > threshold && balance.amount > 0;
      })
      .sort((a, b) => {
        const priorityDiff =
          getPriority(b.blockchain) - getPriority(a.blockchain);
        return priorityDiff || a.currency.localeCompare(b.currency);
      });
  }, [balances, getPriority]);

  const rows = useMemo(
    () =>
      sortedBalances.map((balance) => {
        const usdValue = prices[balance.currency] * balance.amount;
        return (
          <WalletRow
            key={`${balance.blockchain}-${balance.currency}`}
            amount={balance.amount}
            usdValue={usdValue}
            formattedAmount={balance.amount.toFixed()}
          />
        );
      }),
    [sortedBalances, prices]
  );

  return <div {...props}>{rows}</div>;
};
```

---

## Performance Impact Analysis

| Operation        | Before | After |
| ---------------- | ------ | ----- |
| Filter/Sort      | O(n²)  | O(n)  |
| Priority Lookups | O(n)   | O(1)  |
| Re-renders       | High   | Low   |
| Memo Benefits    | Low    | High  |

---

## Anti-Pattern Prevention

1. **Separation of Concerns**

   - Data processing separate from rendering
   - Business logic separated from UI

2. **Immutable Operations**

   - Filter -> Sort chain preserves data integrity
   - No side effects in processing

3. **Type-Driven Development**

   - `BLOCKCHAIN_PRIORITY` as single source of truth
   - Type-safe priority lookups

4. **Predictable Rendering**
   - Stable keys prevent DOM reconciliation issues
   - Memoized components prevent unnecessary re-renders

---
