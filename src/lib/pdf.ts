import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";

const A4_W = 210; // mm
const A4_H = 297; // mm

export async function downloadSuratPdf(el: HTMLElement, filename: string) {
    const canvas = await html2canvas(el, {
        scale: 3,
        useCORS: true,
        backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });

    const imgH = (canvas.height * A4_W) / canvas.width;

    if (imgH <= A4_H) {
        pdf.addImage(imgData, "PNG", 0, 0, A4_W, imgH);
    } else if (imgH <= A4_H * 1.1) {
        const scale = A4_H / imgH;
        const w = A4_W * scale;
        pdf.addImage(imgData, "PNG", (A4_W - w) / 2, 0, w, A4_H);
    } else {
        pdf.addImage(imgData, "PNG", 0, 0, A4_W, imgH);
        let remaining = imgH - A4_H;
        let position = 0;
        while (remaining > 0) {
            position -= A4_H;
            pdf.addPage();
            pdf.addImage(imgData, "PNG", 0, position, A4_W, imgH);
            remaining -= A4_H;
        }
    }

    pdf.save(filename);
}