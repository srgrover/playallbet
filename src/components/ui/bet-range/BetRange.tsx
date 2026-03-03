"use client"

import { Button, Field } from "@/components"
import { Slider } from "@/components"
import { useState } from "react";

interface Props {
    coins: number;
    actualBet?: number
    updateQuantity?: (quantity: number) => void
}

export function BetRange({ coins, actualBet, updateQuantity }: Props) {
  const [value, setValue] = useState(actualBet ?? 1)

  const setQuantity = (value: number) => {
    setValue(value);
    updateQuantity?.(value);
  }

  return (
    <div className="flex flex-col gap-3">
        <Field className="w-full">
            <Slider
                value={[value]}
                onValueChange={(newValue: number[]) => {
                    setValue(newValue[0])
                    updateQuantity?.(newValue[0])
                }}
                max={ coins }
                min={100}
                className="mt-2 w-full"
                aria-label="Price Range"
            />
        </Field>
        <div className="flex justify-between items-center">
        <Button variant={'outline'} onClick={() => setQuantity(100)} size={"sm"} className="text-sm border border-blue-400 bg-white py-1 px-2 text-blue-400">
                Min
            </Button>
            <Button variant={'outline'} onClick={() => setQuantity(coins)} size={"sm"} className="text-sm border border-blue-400 bg-white py-1 px-2 text-blue-400">
                All in
            </Button>
        </div>
    </div>
  )
}
