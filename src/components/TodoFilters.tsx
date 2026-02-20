import { type FilterType } from "../hooks/useTodos"

type Props = {
    filter: FilterType
    itemsLeft: number
    onChangeFilter: (filter: FilterType) => void
    onClearCompleted: () => void
}

export function TodoFilters({
    filter,
    itemsLeft,
    onChangeFilter,
    onClearCompleted,
}: Props) {
    const activeClass = "text-purple-600 font-medium"
    const inactiveClass = "hover:text-foreground"

    return (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{itemsLeft} items left</span>

            <div className="flex gap-4">
                <button
                    className={filter === "all" ? activeClass : inactiveClass}
                    onClick={() => onChangeFilter("all")}
                >
                    All
                </button>

                <button
                    className={filter === "active" ? activeClass : inactiveClass}
                    onClick={() => onChangeFilter("active")}
                >
                    Active
                </button>

                <button
                    className={filter === "completed" ? activeClass : inactiveClass}
                    onClick={() => onChangeFilter("completed")}
                >
                    Completed
                </button>
            </div>

            <button
                onClick={onClearCompleted}
                className="hover:text-foreground"
            >
                Clear Completed
            </button>
        </div>
    )
}