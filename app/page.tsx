import { db } from '@/db';
import Link from 'next/link';

export default async function HomePage() {
    const snippets = await db.snippet.findMany();

    const renderedSnippets = snippets.map((snippet, i) => {
        return (
            <Link
                key={i}
                href={`/snippets/${snippet.id}`}
                className="flex justify-between itens-center p-2 border rounded"
            >
                <div>{snippet.title}</div>
                <div>View</div>
            </Link>
        );
    });

    return (
        <div>
            <div className="flex m-2 justify-between items-center">
                <h1 className="text-xl font-bold">Snippets</h1>
                <Link
                    href={'/snippets/new'}
                    className="py-1 px-5 border rounded-md"
                >
                    New
                </Link>
            </div>
            <div className="flex flex-col gap-2">{renderedSnippets}</div>
        </div>
    );
}
