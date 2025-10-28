import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [value, setValue] = useState("");
  const [editTodo, setEditTodo] = useState(null);
  const [deleteTodo, setDeleteTodo] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    setTodos([...todos, { id: Date.now(), text: value.trim(), completed: false }]);
    setValue("");
  };

  const toggleComplete = (id) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const saveEdit = () => {
    if (editText.trim()) {
      setTodos(todos.map((t) => (t.id === editTodo.id ? { ...t, text: editText.trim() } : t)));
      setEditTodo(null);
      setEditText("");
    }
  };

  const confirmDelete = () => {
    setTodos(todos.filter((t) => t.id !== deleteTodo.id));
    setDeleteTodo(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow p-6 space-y-4">
        <h1 className="text-3xl font-bold text-center mb-4">📝 Vazifalar ro'yxati</h1>

        <form onSubmit={addTodo} className="flex gap-2">
          <Input
            type="text"
            placeholder="Vazifa yozing..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="flex-1"
          />
          <Button type="submit">Qo'shish</Button>
        </form>

        <div className="space-y-3 mt-4">
          {todos.length === 0 ? (
            <p className="text-center text-gray-500 py-8">Hali vazifalar yo'q ✨</p>
          ) : (
            todos.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center justify-between bg-gray-50 p-3 rounded-lg shadow-sm border"
              >
                <div className="flex items-center gap-3 flex-1">
                  <Checkbox
                    checked={todo.completed}
                    onCheckedChange={() => toggleComplete(todo.id)}
                    className="h-5 w-5"
                  />
                  <span
                    className={`text-lg break-words flex-1 ${
                      todo.completed ? "line-through text-gray-500" : "text-gray-800"
                    }`}
                  >
                    {todo.text}
                  </span>
                </div>

                <div className="flex gap-2 ml-3">
                  <Dialog
                    open={editTodo?.id === todo.id}
                    onOpenChange={(open) => {
                      if (!open) {
                        setEditTodo(null);
                        setEditText("");
                      }
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditTodo(todo);
                          setEditText(todo.text);
                        }}
                        className="h-9 px-3"
                      >
                        Tahrirlash
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Vazifani tahrirlash</DialogTitle>
                      </DialogHeader>
                      <div className="py-4">
                        <Input
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          placeholder="Vazifani tahrirlash..."
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === "Enter") saveEdit();
                          }}
                        />
                      </div>
                      <DialogFooter>
                        <Button onClick={saveEdit}>Saqlash</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Dialog
                    open={deleteTodo?.id === todo.id}
                    onOpenChange={(open) => {
                      if (!open) setDeleteTodo(null);
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setDeleteTodo(todo)}
                        className="h-9 px-3"
                      >
                        O'chirish
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Bu vazifani o'chirish?</DialogTitle>
                      </DialogHeader>
                      <div className="py-4">
                        <p className="text-sm text-gray-600">
                          Rostan ham "<span className="font-semibold">{deleteTodo?.text}</span>" ni
                          o'chirmoqchimisiz?
                        </p>
                      </div>
                      <DialogFooter className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setDeleteTodo(null)}>
                          Bekor qilish
                        </Button>
                        <Button variant="destructive" onClick={confirmDelete}>
                          O'chirish
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}


// Assalomu alaykum ustoz agar bu vazifani korayotgan bolsangiz dialog qoshilgan bu dialog modal uchun kerak ekan emish.