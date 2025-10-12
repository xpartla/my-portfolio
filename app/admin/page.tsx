import { auth, signOut } from "@/auth";
import GalleryCrud from "@/components/GalleryCrud";

export default async function AdminPage() {
    const session = await auth();

    if (!session) {
        throw new Error("No session found");
    }

    return (
        <main className="p-8">
            <h1 className="text-xl font-semibold mb-4">Admin Dashboard</h1>
            <p>Signed in as {session.user?.name}</p>

            <form
                action={async () => {
                    "use server";
                    await signOut();
                }}
            >
                <button type="submit" className="mt-4 border px-3 py-1 rounded">
                    Sign out
                </button>
            </form>
            <GalleryCrud />
        </main>
    );
}
