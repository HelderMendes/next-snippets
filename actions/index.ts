'use server';

import { redirect } from 'next/navigation';
import { db } from '@/db';
import { revalidatePath } from 'next/cache';

export async function editSnippet(id: number, code: string) {
    await db.snippet.update({
        where: { id },
        data: { code },
    });

    revalidatePath(`/snippets/${id}`);
    redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
    await db.snippet.delete({
        where: { id },
    });

    revalidatePath('/');
    redirect('/');
}

export async function createSnippet(
    formState: { message: string },
    formData: FormData
) {
    try {
        // Check the user's inputs and ckeck that the user is / are valid
        const title = formData.get('title') as string;
        const code = formData.get('code') as string;

        // form input validation
        if (typeof title !== 'string' || title.length <= 3) {
            return {
                message: 'Title must be longer',
            };
        }
        if (typeof code !== 'string' || code.length <= 10) {
            return {
                message: 'Code must be longer',
            };
        }

        // Create a new record on the Database...
        // const snippet = await db.snippet.create({
        await db.snippet.create({
            data: {
                title,
                code,
            },
        });
        // console.log(snippet);

        // //Create an error manually to test
        // throw new Error('Hai hai ai... Ooops!!!');
    } catch (err: unknown) {
        if (err instanceof Error) {
            return { message: err.message };
        } else {
            return { message: 'Something went wrong!' };
        }
    }

    revalidatePath('/');
    // Redirect the user te the root
    redirect('/');
}
