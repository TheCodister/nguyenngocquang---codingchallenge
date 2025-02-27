import { Select, SelectItem } from '@heroui/react'

interface CurrencySelectProps {
  label: string
  value: string
  tokens: string[]
  onChange: (value: string) => void
}

export default function CurrencySelect({
  label,
  value,
  tokens,
  onChange,
}: CurrencySelectProps) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <Select
        label={`Choose currency you want to convert${label === 'From' ? '' : ' to'}`}
        selectedKeys={new Set([value])}
        startContent={
          <img src={`../${value}.svg`} alt={value} className="w-4 h-4" />
        }
        onSelectionChange={(keys) =>
          onChange(Array.from(keys as Set<string>)[0])
        }
      >
        {tokens.map((token) => (
          <SelectItem
            key={token}
            value={token}
            startContent={
              <img src={`../${token}.svg`} alt={token} className="w-4 h-4" />
            }
          >
            {token}
          </SelectItem>
        ))}
      </Select>
    </div>
  )
}
