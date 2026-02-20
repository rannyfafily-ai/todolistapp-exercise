import { Card, CardContent } from "../../components/ui/card"
import { TodoInput } from "../../components/TodoInput"
import { ThemeToggle } from "../../components/ThemeToggle"
import { TodoFilters } from "../../components/TodoFilters"
import { useDarkMode } from "../../hooks/useDarkMode"
import { useTodos } from "../../hooks/useTodos"

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
    addTodo
  } = useTodos()

  return (
    <div className="min-h-screen bg-gradient-to-b 
      from-purple-600 to-purple-400 dark:from-[#1f1b2e] dark:to-[#15121f]">

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

        <Card className="shadow-xl">
          <CardContent className="p-0 divide-y">
            {todos.map(todo => (
              <div
                key={todo.id}
                className="flex items-center justify-between px-6 py-4"
              >
                <div className="flex items-center gap-4 flex-1">
                  {/* Toggle Button */}
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className={`w-5 h-5 rounded-full border
                      ${todo.completed
                        ? "bg-purple-600 border-purple-600"
                        : "border-muted-foreground"}
                    `}
                  />

                  {/* Editable Title */}
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

                {/* Delete Button */}
                {editingId !== todo.id && (
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="text-muted-foreground hover:text-foreground"
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