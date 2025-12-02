export interface OccupationStat {
    occupation: string;
    count: number;
    category: string;
    icon: string;
    gradient: string;
}

export const occupationStats: OccupationStat[] = [
    { occupation: 'Software Engineer', count: 45, category: 'Technology', icon: '💻', gradient: 'from-blue-500 to-cyan-500' },
    { occupation: 'Doctor', count: 32, category: 'Healthcare', icon: '⚕️', gradient: 'from-red-500 to-pink-500' },
    { occupation: 'Teacher', count: 28, category: 'Education', icon: '📚', gradient: 'from-green-500 to-emerald-500' },
    { occupation: 'Civil Engineer', count: 24, category: 'Engineering', icon: '🏗️', gradient: 'from-orange-500 to-amber-500' },
    { occupation: 'Business Owner', count: 20, category: 'Business', icon: '💼', gradient: 'from-purple-500 to-violet-500' },
    { occupation: 'Lawyer', count: 15, category: 'Legal', icon: '⚖️', gradient: 'from-indigo-500 to-blue-500' },
    { occupation: 'Accountant', count: 18, category: 'Finance', icon: '📊', gradient: 'from-teal-500 to-cyan-500' },
    { occupation: 'Nurse', count: 22, category: 'Healthcare', icon: '🩺', gradient: 'from-pink-500 to-rose-500' },
];
