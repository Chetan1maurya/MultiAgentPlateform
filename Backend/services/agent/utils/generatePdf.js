import PDFDocument from "pdfkit";

export const generatePdf = async (data) => {

    return new Promise((resolve, reject) => {

        const doc = new PDFDocument({
            size: "A4",
            margin: 50,
        });

        const chunks = [];

        doc.on("data", (chunk) => chunks.push(chunk));

        doc.on("end", () => {
            resolve(Buffer.concat(chunks));
        });

        doc.on("error", (err) => {
            reject(err);
        });


        // =========================
        // TITLE
        // =========================

        doc
            .fontSize(28)
            .fillColor("#111827")
            .text(data.title, {
                align: "center"
            });


        // =========================
        // SUBTITLE
        // =========================

        if (data.subtitle) {

            doc
                .moveDown(0.5)
                .fontSize(12)
                .fillColor("#6B7280")
                .text(data.subtitle, {
                    align: "center"
                });
        }


        doc.moveDown(2);


        // =========================
        // SECTIONS
        // =========================

        data?.sections?.forEach((section) => {

            // Section heading

            if (section.heading) {

                doc
                    .fontSize(18)
                    .fillColor("#111827")
                    .text(section.heading);

                doc.moveDown(0.5);
            }


            // =========================
            // BLOCKS
            // =========================

            section?.blocks?.forEach((block) => {


                // =========================
                // PARAGRAPH
                // =========================

                if (block.type === "paragraph") {

                    doc
                        .fontSize(12)
                        .fillColor("#374151")
                        .text(block.content, {
                            lineGap: 4
                        });

                    doc.moveDown(0.8);
                }


                // =========================
                // BULLETS
                // =========================

                else if (block.type === "bullets") {

                    block.items?.forEach((item) => {

                        doc
                            .fontSize(12)
                            .fillColor("#374151")
                            .text("• " + item, {
                                indent: 15,
                                lineGap: 4
                            });

                        doc.moveDown(0.2);
                    });

                    doc.moveDown(0.7);
                }


                // =========================
                // NUMBERED LIST
                // =========================

                else if (block.type === "numbered_list") {

                    block.items?.forEach((item, index) => {

                        doc
                            .fontSize(12)
                            .fillColor("#374151")
                            .text(`${index + 1}. ${item}`, {
                                indent: 15,
                                lineGap: 4
                            });

                        doc.moveDown(0.2);
                    });

                    doc.moveDown(0.7);
                }


                // =========================
                // CODE
                // =========================

                else if (block.type === "code") {

                    doc
                        .fontSize(9)
                        .fillColor("#111827")
                        .text(block.code, {
                            indent: 15,
                            lineGap: 3
                        });

                    doc.moveDown(1);
                }


                // =========================
                // CALLOUT
                // =========================

                else if (block.type === "callout") {

                    doc
                        .fontSize(13)
                        .fillColor("#111827")
                        .text(block.title);

                    doc.moveDown(0.3);

                    doc
                        .fontSize(11)
                        .fillColor("#374151")
                        .text(block.content, {
                            lineGap: 4
                        });

                    doc.moveDown(1);
                }


                // =========================
                // TABLE
                // =========================

                else if (block.type === "table") {

                    doc
                        .fontSize(12)
                        .fillColor("#111827")
                        .text(block.headers.join(" | "));

                    doc.moveDown(0.3);

                    block.rows?.forEach((row) => {

                        doc
                            .fontSize(10)
                            .fillColor("#374151")
                            .text(row.join(" | "));

                        doc.moveDown(0.2);
                    });

                    doc.moveDown(1);
                }

            });

            doc.moveDown(0.5);
        });


        // =========================
        // FOOTER
        // =========================

        doc
            .fontSize(10)
            .fillColor("#9CA3AF")
            .text("Generated By CortexAI", {
                align: "center"
            });


        doc.end();
    });
};