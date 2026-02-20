import { Button } from "./ui/button"

interface Props {
    onToggle: () => void
}

export function ThemeToggle({ onToggle }: Props) {
    return (
        <Button
            size="icon"
            variant="ghost"
            onClick={onToggle}
            className="text-white hover:bg-white/10"
        >
            ✦
        </Button>
    )
}