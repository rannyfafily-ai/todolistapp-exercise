import { Input } from "./ui/input"
import { useEffect, useState } from "react"

type Props = {
    onSearch: (value: string) => void
    onAdd: (title: string) => void
}

export function TodoInput({ onSearch, onAdd }: Props) {
    const [value, setValue] = useState("")

    // Debounce untuk search
    useEffect(() => {
        const timeout = setTimeout(() => {
            onSearch(value)
        }, 400)

        return () => clearTimeout(timeout)
    }, [value, onSearch])

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            onAdd(value)
            setValue("")
        }
    }

    return (
        <Input
            placeholder="Search or create todo..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="h-12 bg-background dark:bg-muted"
        />
    )
}