import {signIn} from "@/auth";

export default function LoginPage() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-8">
            <h1 className="text-2xl font-semibold mb-6">Sign in to continue</h1>

            <form
                action={async () => {
                    "use server";
                    await signIn("github", {redirectTo: "/admin"});
                }}
            >
                <button
                    type="submit"
                    className="px-4 py-2 rounded bg-black text-white hover:bg-gray-800"
                >
                    Sign in with GitHub
                </button>
            </form>
        </main>
    );
}