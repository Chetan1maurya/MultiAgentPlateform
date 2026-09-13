// tools/createPdf.tool.js

import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { generatePdf } from "../utils/generatePdf.js";
import { uploadToS3 } from "../utils/uploadToS3.js";
import { getFromS3 } from "../utils/getFromS3.js";


export const createPdfTool = tool(
    async ({ title, subtitle, sections }) => {

        console.log("🛠️ create_pdf tool called");

        const pdfBuffer = await generatePdf({
            title,
            subtitle,
            sections
        });

        const filename = `pdf-${Date.now()}.pdf`;

        await uploadToS3(
            filename,
            pdfBuffer,
            "application/pdf"
        );

        const downloadUrl = await getFromS3(
            filename,
            24 * 60
        );

        return JSON.stringify({
            success: true,
            title,
            downloadUrl
        });
    },

    {
        name: "create_pdf",

        description: `
        Create a downloadable PDF.

        Use this when the user wants:
        - a PDF
        - notes as a PDF
        - a report
        - a guide
        - documentation
        - a downloadable document

        Generate well-structured content with a title,
        optional subtitle, sections and bullet points.
        `,

        schema: z.object({

            title: z.string(),

            subtitle: z.string()
                .optional(),

            sections: z.array(
                z.object({
                    heading: z.string(),

                    points: z.array(
                        z.string()
                    )
                })
            )
        })
    }
);