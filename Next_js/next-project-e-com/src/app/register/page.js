import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-md border rounded-xl p-8 shadow-sm bg-card">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="text-muted-foreground mt-2">
            Register to get started
          </p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full h-11 px-3 border rounded-md bg-background"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full h-11 px-3 border rounded-md bg-background"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Password
            </label>
            <input
              type="password"
              placeholder="Create a password"
              className="w-full h-11 px-3 border rounded-md bg-background"
            />
          </div>

          <button
            type="submit"
            className="w-full h-11 bg-primary text-primary-foreground rounded-md font-medium"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
