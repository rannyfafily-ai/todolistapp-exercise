import { Card, CardContent } from "../../components/ui/card"
import { TodoInput } from "../../components/TodoInput"
import { ThemeToggle } from "../../components/ThemeToggle"
import { TodoFilters } from "../../components/TodoFilters"
import { useDarkMode } from "../../hooks/useDarkMode"
import { useTodos } from "../../hooks/useTodos"
import type { SortType } from "../../hooks/useTodos"

export default function Todos() {
  const { toggleDarkMode } = useDarkMode()

  const {
    todos,
    filter,
    setFilter,
    itemsLeft,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    setSearch,
    editingId,
    editingTitle,
    setEditingTitle,
    startEditing,
    cancelEditing,
    saveEditing,
    addTodo,
    sortBy,
    setSortBy
  } = useTodos()

  return (
    <div className="min-h-screen bg-gradient-to-b 
      from-purple-600 to-purple-400 
      dark:from-[#1f1b2e] dark:to-[#15121f]">

      {/* HEADER */}
      <div className="max-w-3xl mx-auto px-4 pt-16 pb-10 text-white flex items-center justify-between">
        <h1 className="text-4xl font-bold tracking-[0.3em]">
          TODO
        </h1>
        <ThemeToggle onToggle={toggleDarkMode} />
      </div>

      {/* CONTENT */}
      <div className="max-w-3xl mx-auto px-4 -mt-6 space-y-6">

        <TodoInput onAdd={addTodo} onSearch={setSearch} />

        {/* SORT DROPDOWN */}
        <div className="flex justify-end">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortType)}
            className="bg-background border rounded px-3 py-1 text-sm"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>

        {/* TODO LIST */}
        <Card className="shadow-xl">
          <CardContent className="p-0 divide-y max-h-96 overflow-y-auto">

            {/* EMPTY STATE */}
            {todos.length === 0 && (
              <div className="px-6 py-6 text-center text-muted-foreground">
                No todos found
              </div>
            )}

            {todos.map(todo => (
              <div
                key={todo.id}
                className="flex items-center justify-between px-6 py-4 hover:bg-muted transition"
              >
                <div className="flex items-center gap-4 flex-1">

                  {/* TOGGLE BUTTON */}
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className={`w-5 h-5 flex items-center justify-center rounded-full border
                      ${todo.completed
                        ? "bg-purple-600 border-purple-600 text-white"
                        : "border-muted-foreground"}
                    `}
                  >
                    {todo.completed && "✓"}
                  </button>

                  {/* EDITABLE TITLE */}
                  {editingId === todo.id ? (
                    <input
                      autoFocus
                      value={editingTitle}
                      onChange={(e) => setEditingTitle(e.target.value)}
                      onBlur={() => saveEditing(todo.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") saveEditing(todo.id)
                        if (e.key === "Escape") cancelEditing()
                      }}
                      className="flex-1 bg-transparent border-b outline-none"
                    />
                  ) : (
                    <span
                      onDoubleClick={() => startEditing(todo.id, todo.title)}
                      className={`flex-1 cursor-pointer
                        ${todo.completed
                          ? "line-through text-muted-foreground"
                          : ""}
                      `}
                    >
                      {todo.title}
                    </span>
                  )}
                </div>

                {/* DELETE BUTTON */}
                {editingId !== todo.id && (
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="text-muted-foreground hover:text-red-500 transition"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}

          </CardContent>
        </Card>

        {/* FOOTER FILTER */}
        <div className="bg-background dark:bg-muted rounded-lg px-6 py-4 shadow">
          <TodoFilters
            filter={filter}
            onChangeFilter={setFilter}
            onClearCompleted={clearCompleted}
            itemsLeft={itemsLeft}
          />
        </div>

        <p className="text-center text-sm text-muted-foreground pt-4">
          Double click to edit a todo
        </p>

      </div>
    </div>
  )
}