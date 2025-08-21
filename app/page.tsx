'use client';

import { TodoApp } from '../components/TodoApp';

export default function Page() {
    return (
        <div
            className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-white dark:from-red-900 dark:to-gray-900 transition-colors duration-200 p-4"
            data-oid="1"
        >
            <TodoApp />
        </div>
    );
}