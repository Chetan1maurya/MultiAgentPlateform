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

        return {
            success: true,
            title,
            downloadUrl
        };
    },

    {
        name: "create_pdf",

        description: `
      Create a professional, well-structured downloadable PDF.

Use this tool whenever the user requests a PDF, report,
guide, tutorial, study material, documentation, notes,
resume, proposal, comparison, or other document.

The PDF content and architecture should be designed based
on the user's request.

The calling agent is responsible for deciding:
- the document type
- the overall structure
- the number and order of sections
- the appropriate content for each section
- whether to use explanations, bullet lists, examples,
  code blocks, tables, comparisons, summaries, etc.

Do not force every document into the same structure.

The content supplied to this tool must be the final content
that should appear in the PDF. Do not use placeholders,
instructions, or meta-comments.

Create a professional document that is easy to read and
appropriate for the user's requested subject and audience.

The tool generates the PDF, uploads it to storage, and
returns a temporary download URL.

Do not invent a download URL. The URL must come from the
tool result.
        `,

        schema: z.object({

            title: z.string(),

            subtitle: z.string().optional(),

            sections: z.array(
                z.object({

                    heading: z.string().optional(),

                    blocks: z.array(

                        z.discriminatedUnion("type", [

                            // Normal explanation
                            z.object({
                                type: z.literal("paragraph"),
                                content: z.string()
                            }),

                            // Bullet list
                            z.object({
                                type: z.literal("bullets"),
                                items: z.array(z.string())
                            }),

                            // Numbered list
                            z.object({
                                type: z.literal("numbered_list"),
                                items: z.array(z.string())
                            }),

                            // Code example
                            z.object({
                                type: z.literal("code"),
                                language: z.string(),
                                code: z.string()
                            }),

                            // Comparison / data table
                            z.object({
                                type: z.literal("table"),
                                headers: z.array(z.string()),
                                rows: z.array(
                                    z.array(z.string())
                                )
                            }),

                            // Important information
                            z.object({
                                type: z.literal("callout"),
                                title: z.string(),
                                content: z.string()
                            })

                        ])
                    )
                })
            )
        })
    }
);