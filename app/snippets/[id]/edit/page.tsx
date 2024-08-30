import Link from 'next/link';
import { db } from '@/db';
import { notFound } from 'next/navigation';
import SnippetEditForm from '@/components/snippet-edit-form';

interface SnippettEditPageProps {
    params: {
        id: string;
    };
}

export default async function SnippettEditPage(props: SnippettEditPageProps) {
    const id = parseInt(props.params.id);
    const snippet = await db.snippet.findFirst({
        where: { id },
    });

    if (!snippet) return notFound();

    return (
        <div>
            <SnippetEditForm snippet={snippet} />
        </div>
    );
}
