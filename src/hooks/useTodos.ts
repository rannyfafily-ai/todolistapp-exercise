import { useMemo, useState } from "react";

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
};

export type FilterType = "all" | "active" | "completed";
export type SortType = "newest" | "oldest";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: 1,
      title: "Complete online JavaScript course",
      completed: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      title: "Jog around the park 3x",
      completed: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: 3,
      title: "10 minutes meditation",
      completed: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: 4,
      title: "Read for 1 hour",
      completed: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: 5,
      title: "Pick up groceries",
      completed: false,
      createdAt: new Date().toISOString(),
    },
  ]);

  const [filter, setFilter] = useState<FilterType>("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortType>("newest");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState("");

  /* ================= CRUD ================= */

  function addTodo(title: string) {
    if (!title.trim()) return;

    const newTodo: Todo = {
      id: Date.now(),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTodos((prev) => [newTodo, ...prev]);
  }

  function toggleTodo(id: number) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function deleteTodo(id: number) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  function clearCompleted() {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  }

  /* ================= EDIT ================= */

  function startEditing(id: number, currentTitle: string) {
    setEditingId(id);
    setEditingTitle(currentTitle);
  }

  function cancelEditing() {
    setEditingId(null);
    setEditingTitle("");
  }

  function saveEditing(id: number) {
    if (!editingTitle.trim()) {
      cancelEditing();
      return;
    }

    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, title: editingTitle } : todo
      )
    );

    cancelEditing();
  }

  /* ================= FILTER + SEARCH ================= */

  const filteredTodos = useMemo(() => {
    return todos
      .filter((todo) => {
        if (filter === "active") return !todo.completed;
        if (filter === "completed") return todo.completed;
        return true;
      })
      .filter((todo) =>
        todo.title.toLowerCase().includes(search.toLowerCase())
      );
  }, [todos, filter, search]);

  /* ================= SORT ================= */

  const sortedTodos = useMemo(() => {
    return [...filteredTodos].sort((a, b) => {
      if (sortBy === "newest") {
        return (
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
        );
      }
      if (sortBy === "oldest") {
        return (
          new Date(a.createdAt).getTime() -
          new Date(b.createdAt).getTime()
        );
      }
      return 0;
    });
  }, [filteredTodos, sortBy]);

  /* ================= ITEMS LEFT ================= */

  const itemsLeft = useMemo(() => {
    return todos.filter((todo) => !todo.completed).length;
  }, [todos]);

  return {
    todos: sortedTodos,
    filter,
    setFilter,
    search,
    setSearch,
    sortBy,
    setSortBy,
    itemsLeft,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    editingId,
    editingTitle,
    setEditingTitle,
    startEditing,
    cancelEditing,
    saveEditing,
    addTodo,
  };
}