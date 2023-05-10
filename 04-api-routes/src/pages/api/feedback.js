import fsPromises from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const email = req.body.email;
        const feedbackText = req.body.text;

        const newFeedback = {
            id: new Date().toISOString(),
            email: email,
            text: feedbackText,
        };

        // store that in a database or in a file
        const filePath = path.join(process.cwd(), 'data/feedback.json');
        const fileData = await fsPromises.readFile(filePath);
        const objectData = JSON.parse(fileData);
        objectData.push(newFeedback);
        await fsPromises.writeFile(filePath, JSON.stringify(objectData));
        res.status(201).json({ message: 'Success!', feedback: newFeedback });
    } else {
        res.status(200).json({ message: 'This works!' });
    }
}
