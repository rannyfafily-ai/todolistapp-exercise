
import { useMemo, useState } from "react";

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export type FilterType = "all" | "active" | "completed";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, title: "Complete online JavaScript course", completed: true },
    { id: 2, title: "Jog around the park 3x", completed: false },
    { id: 3, title: "10 minutes meditation", completed: false },
    { id: 4, title: "Read for 1 hour", completed: false },
    { id: 5, title: "Pick up groceries", completed: false },
  ]);

  const [filter, setFilter] = useState<FilterType>("all");
  const [search, setSearch] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState("");

  /* ================= CRUD ================= */
  function addTodo(title: string) {
    if (!title.trim()) return;

    setTodos((prev) => {
      return [
        {
          id: Date.now(),
          title,
          completed: false,
        },
        ...prev,
      ];
    });
  }

  function toggleTodo(id: number) {
    setTodos(function (prev) {
      return prev.map(function (todo) {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
    });
  }

  function deleteTodo(id: number) {
    setTodos(function (prev) {
      return prev.filter(function (todo) {
        return todo.id !== id;
      });
    });
  }

  function clearCompleted() {
    setTodos(function (prev) {
      return prev.filter(function (todo) {
        return !todo.completed;
      });
    });
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

    setTodos(function (prev) {
      return prev.map(function (todo) {
        if (todo.id === id) {
          return { ...todo, title: editingTitle };
        }
        return todo;
      });
    });

    cancelEditing();
  }

  /* ================= FILTER + SEARCH ================= */

  const filteredTodos = useMemo(
    function () {
      return todos
        .filter(function (todo) {
          if (filter === "active") return !todo.completed;
          if (filter === "completed") return todo.completed;
          return true;
        })
        .filter(function (todo) {
          return todo.title.toLowerCase().includes(search.toLowerCase());
        });
    },
    [todos, filter, search],
  );

  const itemsLeft = todos.filter(function (todo) {
    return !todo.completed;
  }).length;

  return {
    todos: filteredTodos,
    filter,
    setFilter,
    search,
    setSearch,
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
