import * as fs from "node:fs";
import * as path from "node:path";
import { StorageContract } from "src/core/domain/contracts/storage.contract";
import { Delivery } from "../../domain/interfaces/delivery.interface";

export class InFileRepository implements StorageContract {
    private readonly filePath: string;

    constructor() {
        this.filePath = path.resolve(__dirname, "..", "..", "..", "..", "storage", "deliveries.txt");
        this.ensureStorage();
    }

    public saveDelivery(delivery: Delivery): void {
        this.ensureStorage();
        const serialized = this.serializeDelivery(delivery);
        fs.appendFileSync(this.filePath, `${serialized}\n`, "utf-8");
    }

    public listDeliveries(): Delivery[] {
        const lines = this.readLines();
        return lines.map((line) => this.deserializeDelivery(line));
    }

    public findDeliveryById(id: string): Delivery | null {
        const deliveries = this.listDeliveries();
        return deliveries.find((delivery) => this.getDeliveryId(delivery) === id) ?? null;
    }

    public updateDelivery(delivery: Delivery): void {
        const deliveries = this.listDeliveries();
        const targetId = this.getDeliveryId(delivery);
        const index = deliveries.findIndex((item) => this.getDeliveryId(item) === targetId);

        if (index === -1) {
            throw new Error(`Entrega con id ${targetId} no encontrada.`);
        }

        deliveries[index] = delivery;
        this.overwrite(deliveries);
    }

    private ensureStorage(): void {
        const dir = path.dirname(this.filePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        if (!fs.existsSync(this.filePath)) {
            fs.writeFileSync(this.filePath, "", "utf-8");
        }
    }

    private readLines(): string[] {
        try {
            const content = fs.readFileSync(this.filePath, "utf-8");
            return content.split("\n").filter((line) => line.trim().length > 0);
        } catch (error) {
            if ((error as NodeJS.ErrnoException).code === "ENOENT") {
                return [];
            }
            throw error;
        }
    }

    private overwrite(deliveries: Delivery[]): void {
        const payload = deliveries.map((delivery) => this.serializeDelivery(delivery)).join("\n");
        fs.writeFileSync(this.filePath, payload.length ? `${payload}\n` : "", "utf-8");
    }

    private serializeDelivery(delivery: Delivery): string {
        return Object.entries(delivery)
            .map(([key, value]) => `${this.escapeValue(key)}=${this.escapeValue(String(value ?? ""))}`)
            .join("|");
    }

    private deserializeDelivery(line: string): Delivery {
        const segments = this.splitLine(line);
        const delivery: Record<string, string> = {};

        for (const segment of segments) {
            const equalsIndex = this.findUnescapedEquals(segment);
            const key = equalsIndex === -1 ? segment : segment.slice(0, equalsIndex);
            const rawValue = equalsIndex === -1 ? "" : segment.slice(equalsIndex + 1);
            delivery[this.unescapeValue(key)] = this.unescapeValue(rawValue);
        }

        return delivery as unknown as Delivery;
    }

    private getDeliveryId(delivery: Delivery): string {
        if ("id" in delivery && typeof (delivery as any).id === "string") {
            return (delivery as any).id;
        }
        throw new Error("La entrega debe tener una propiedad `id` de tipo string.");
    }

    private escapeValue(value: string): string {
        return value.replace(/\\/g, "\\\\").replace(/\|/g, "\\|").replace(/=/g, "\\=");
    }

    private unescapeValue(value: string): string {
        let result = "";
        let escaping = false;

        for (const char of value) {
            if (escaping) {
                result += char;
                escaping = false;
                continue;
            }

            if (char === "\\") {
                escaping = true;
                continue;
            }

            result += char;
        }

        if (escaping) {
            result += "\\";
        }

        return result;
    }

    private splitLine(line: string): string[] {
        const segments: string[] = [];
        let buffer = "";
        let escaping = false;

        for (const char of line) {
            if (escaping) {
                buffer += char;
                escaping = false;
                continue;
            }

            if (char === "\\") {
                escaping = true;
                continue;
            }

            if (char === "|") {
                segments.push(buffer);
                buffer = "";
                continue;
            }

            buffer += char;
        }

        segments.push(buffer);
        return segments;
    }

    private findUnescapedEquals(segment: string): number {
        let escaping = false;
        for (let i = 0; i < segment.length; i++) {
            const char = segment[i];

            if (escaping) {
                escaping = false;
                continue;
            }

            if (char === "\\") {
                escaping = true;
                continue;
            }

            if (char === "=") {
                return i;
            }
        }

        return -1;
    }
}