import { PrismaClient } from '@prisma/client';

export const db = new PrismaClient();

// // simple way to create a item in the database
// db.snippet.create({
//     data: {
//         title: 'My Snippet Tittle',
//         code: 'const abc = (a, b) => {console.log(a = b)}',
//     },
// });
