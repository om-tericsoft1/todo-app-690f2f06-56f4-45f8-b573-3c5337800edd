'use client';

import { useState } from 'react';
import { Plus, Trash2, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim() === '') return;
    
    const newTodo: Todo = {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false,
    };
    
    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-red-900 rounded-lg shadow-lg p-6 border border-red-100 dark:border-red-800">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-red-800 dark:text-red-100 mb-2">
          Todo App
        </h1>
        <p className="text-sm text-red-600 dark:text-red-300">
          {totalCount === 0 ? 'No tasks yet' : `${completedCount} of ${totalCount} completed`}
        </p>
      </div>

      <div className="flex gap-2 mb-6">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a new task..."
          className="flex-1"
        />
        <Button 
          onClick={addTodo}
          size="icon"
          className="shrink-0"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-2">
        {todos.length === 0 ? (
          <div className="text-center py-8 text-red-500 dark:text-red-400">
            <p>No todos yet. Add one above!</p>
          </div>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center gap-3 p-3 rounded-md border border-red-200 dark:border-red-700 hover:bg-red-50 dark:hover:bg-red-800 transition-colors"
            >
              <button
                onClick={() => toggleTodo(todo.id)}
                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                  todo.completed
                    ? 'bg-red-500 border-red-500 text-white'
                    : 'border-red-300 dark:border-red-600 hover:border-red-500'
                }`}
              >
                {todo.completed && <Check className="h-3 w-3" />}
              </button>
              
              <span
                className={`flex-1 transition-all ${
                  todo.completed
                    ? 'line-through text-red-500 dark:text-red-400'
                    : 'text-red-800 dark:text-red-100'
                }`}
              >
                {todo.text}
              </span>
              
              <Button
                onClick={() => deleteTodo(todo.id)}
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-red-400 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-800"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}