export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/50 p-4">
      <div className="w-full max-w-sm">
        <div className="rounded-lg border bg-card shadow-sm">
          <div className="p-6">
            <h1 className="text-2xl font-bold">Welcome back</h1>
            <p className="text-sm text-muted-foreground mt-2">Sign in to your WorkSphere account</p>
            <form className="mt-6 space-y-4">
              <div>
                <label className="text-sm font-medium">Email</label>
                <input type="email" placeholder="you@company.com" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">Password</label>
                <input type="password" placeholder="••••••••" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1" />
              </div>
              <button type="submit" className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">Sign in</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
