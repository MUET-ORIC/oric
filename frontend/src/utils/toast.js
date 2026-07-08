import toast from 'react-hot-toast';
import { FiCheckCircle, FiAlertCircle, FiInfo, FiXCircle, FiLoader } from 'react-icons/fi';
import React from 'react';

// ─── Internal Toast Component (built with React.createElement) ──────────
const ToastContent = ({ icon: Icon, title, message, color }) => {
    return React.createElement(
        'div',
        { className: 'flex items-start gap-3 p-4 min-w-[280px] max-w-md' },
        React.createElement(
            'div',
            { className: `flex-shrink-0 mt-0.5 ${color}` },
            React.createElement(Icon, { className: 'w-5 h-5' })
        ),
        React.createElement(
            'div',
            { className: 'flex-1 min-w-0' },
            React.createElement('p', { className: 'text-sm font-semibold text-slate-800' }, title),
            message && React.createElement('p', { className: 'text-xs text-slate-500 mt-0.5 break-words' }, message)
        )
    );
};

// ─── Toast Functions ──────────────────────────────────────────────────────
export const showSuccess = (title, message = '') => {
    toast.custom(
        (t) =>
            React.createElement(
                'div',
                {
                    className: `bg-white rounded-2xl shadow-xl border border-green-100 transform transition-all duration-300 ${t.visible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                        }`,
                },
                React.createElement(ToastContent, { icon: FiCheckCircle, title, message, color: 'text-green-500' })
            ),
        { duration: 4000 }
    );
};

export const showError = (title, message = '') => {
    toast.custom(
        (t) =>
            React.createElement(
                'div',
                {
                    className: `bg-white rounded-2xl shadow-xl border border-red-100 transform transition-all duration-300 ${t.visible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                        }`,
                },
                React.createElement(ToastContent, { icon: FiXCircle, title, message, color: 'text-red-500' })
            ),
        { duration: 5000 }
    );
};

export const showWarning = (title, message = '') => {
    toast.custom(
        (t) =>
            React.createElement(
                'div',
                {
                    className: `bg-white rounded-2xl shadow-xl border border-amber-100 transform transition-all duration-300 ${t.visible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                        }`,
                },
                React.createElement(ToastContent, { icon: FiAlertCircle, title, message, color: 'text-amber-500' })
            ),
        { duration: 4000 }
    );
};

export const showInfo = (title, message = '') => {
    toast.custom(
        (t) =>
            React.createElement(
                'div',
                {
                    className: `bg-white rounded-2xl shadow-xl border border-blue-100 transform transition-all duration-300 ${t.visible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                        }`,
                },
                React.createElement(ToastContent, { icon: FiInfo, title, message, color: 'text-blue-500' })
            ),
        { duration: 3000 }
    );
};

export const showLoading = (title, message = '') => {
    return toast.custom(
        (t) =>
            React.createElement(
                'div',
                {
                    className: `bg-white rounded-2xl shadow-xl border border-blue-100 transform transition-all duration-300 ${t.visible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                        }`,
                },
                React.createElement(
                    'div',
                    { className: 'flex items-start gap-3 p-4 min-w-[280px] max-w-md' },
                    React.createElement(
                        'div',
                        { className: 'flex-shrink-0 mt-0.5 text-blue-500' },
                        React.createElement(FiLoader, { className: 'w-5 h-5 animate-spin' })
                    ),
                    React.createElement(
                        'div',
                        { className: 'flex-1 min-w-0' },
                        React.createElement('p', { className: 'text-sm font-semibold text-slate-800' }, title),
                        message && React.createElement('p', { className: 'text-xs text-slate-500 mt-0.5 break-words' }, message)
                    )
                )
            ),
        { duration: Infinity }
    );
};

export const dismissToast = (toastId) => {
    toast.dismiss(toastId);
};