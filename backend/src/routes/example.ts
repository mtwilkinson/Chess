import express, { Router, Request, Response } from "express";
import {PrismaClient, Prisma} from "database/.prisma/client";
const router: Router = express.Router();

const prismaClient = new PrismaClient()

router.post("/", async function (req: Request, res: Response) {
    const test: Prisma.FeedbackCreateInput = req.body;
    try {
        // Attempt to create in the database
        await prismaClient.feedback.create({data: test});
        console.info("Successfully saved high score attempt"); // Log that it was successful
    } catch (error) {
        // Log any failures
        console.error(
            `Unable to save high score attempt ${test}: ${error}`,
        );
        res.sendStatus(400); // Send error
        return; // Don't try to send duplicate statuses
    }

    res.sendStatus(200); // Otherwise say it's fine
});

router.get("/", async function (req: Request, res: Response) {
    const data = await prismaClient.feedback.findMany({});

    // If the high score doesn't exist
    if (data === null) {
        // Log that (it's a problem)
        console.error("No high score found in database!");
        res.sendStatus(204); // and send 204, no data
    } else {
        // Otherwise, send the score
        res.send(data);
    }
});

export default router;
