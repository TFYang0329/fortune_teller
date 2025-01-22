// ./src/config/webFonts.tsx
import { Noto_Sans_TC } from "next/font/google";

export const notoSansTC = Noto_Sans_TC({
    variable: "--font-noto-sans-tc",
    subsets: ["latin"],
    fallback: ["system-ui", "Arial"],
});
