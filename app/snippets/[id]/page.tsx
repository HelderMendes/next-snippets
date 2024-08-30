import { notFound } from 'next/navigation';
import { db } from '@/db';
import Link from 'next/link';
import * as actions from '@/actions';

interface SnippetShowPageProps {
    params: {
        id: string;
    };
}

export default async function SnippetShowPage(props: SnippetShowPageProps) {
    await new Promise((r) => setTimeout(r, 1000));
    console.log(props);
    const snippet = await db.snippet.findFirst({
        where: { id: parseInt(props.params.id) },
    });

    if (!snippet) return notFound();
    // if (!snippet) return <div>Sorry but we can&apos;t find that snippet</div>;

    const deletSnippetAction = actions.deleteSnippet.bind(null, snippet.id);

    return (
        <div>
            <div className="flex  m-4 justify-between items-center">
                <h1 className="text-xl font-bold">{snippet.title}</h1>
                <div className="flex gap-2">
                    <Link
                        href={`/snippets/${snippet.id}/edit`}
                        className="py-2 px-5 border rounded-md"
                    >
                        Edit
                    </Link>
                    <form action={deletSnippetAction}>
                        <button className="py-2 px-5 border rounded-md">
                            Delete
                        </button>
                    </form>
                </div>
            </div>
            <pre className="p-3 border rounded-md bg-gray-100 border-indigo-200">
                <code>{snippet.code}</code>
            </pre>
        </div>
    );
}

export async function generateStaticParams() {
    const snippets = await db.snippet.findMany();

    return snippets.map((snippet) => {
        return {
            id: snippet.id.toString(),
        };
    });
}
