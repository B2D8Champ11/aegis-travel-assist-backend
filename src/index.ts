import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { classifyIntent } from "./router.js";
import { travelAdvisor } from "./agents/travel.js";
import { riskAnalyst } from "./agents/risk.js";
import { triageAgent } from "./agents/triage.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

app.post("/chat", async (req, res) => {
  try {
    const { message, context } = req.body;
    const intent = classifyIntent(message);

    if (intent === "travel") {
      const data = await travelAdvisor({
        country: context?.country || "unknown",
        month: context?.month,
        preferences: context?.prefs
      });
      return res.json({ intent, data });
    }

    if (intent === "risk") {
      const data = await riskAnalyst({ country: context?.country || "unknown" });
      return res.json({ intent, data });
    }

    const data = await triageAgent({
      symptoms: context?.symptoms || [message],
      age: context?.age,
      pregnant: context?.pregnant,
      lat: context?.lat,
      lon: context?.lon,
      locale_emergency_number: context?.emergency || "112"
    });

    return res.json({ intent, data });

  } catch (e:any) {
    console.error(e);
    return res.status(500).json({ error: e.message || "Server error" });
  }
});
app.get("/", (_, res) => {
  res.send("Aegis Travel Assist Backend is running 🚀");
});

app.get("/health", (_,res)=>res.json({ ok:true }));

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Backend running on :${port}`));
