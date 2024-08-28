import { promises as fs } from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { type, data } = body;

    try {
        const filePath = path.resolve(`./public/${type}.json`);
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));
        return { success: true };
    } catch (error) {
        console.error('Erro ao salvar os dados:', error);
        return { success: false, message: 'Erro ao salvar os dados' };
    }
});
