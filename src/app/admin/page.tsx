export default function AdminDashboard() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">
                    Welcome to the Education Institute Admin Panel.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="p-6 bg-white rounded-lg shadow-sm border">
                    <h3 className="font-semibold text-lg">Quick Actions</h3>
                    <p className="text-sm text-gray-500 mt-2">Manage your institute efficiently.</p>
                </div>
                {/* Placeholder for stats */}
                <div className="p-6 bg-white rounded-lg shadow-sm border">
                    <h3 className="font-semibold text-lg">Total Students</h3>
                    <p className="text-3xl font-bold mt-2">0</p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-sm border">
                    <h3 className="font-semibold text-lg">Active Batches</h3>
                    <p className="text-3xl font-bold mt-2">0</p>
                </div>
            </div>
        </div>
    )
}
