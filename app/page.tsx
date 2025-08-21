'use client';

import { TodoApp } from '../components/TodoApp';

export default function Page() {
    return (
        <div
            className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200 p-4"
            data-oid="1"
        >
            <TodoApp />
        </div>
    );
}