import { ScrollArea } from "@/components/ui/scroll-area"

const studiesContent = [
  "Dual Bachelor in Computer Science & Engineering and Business Administration & Management",
  "Universidad Carlos III de Madrid (2017-2023)",
  "First year of Mathematical Engineering",
  "Universidad Complutense de Madrid (2015-2016)",
  "Online Master in Artificial Intelligence and Innovation",
  "Founderz & Microsoft (Jun 2023 - Present)",
  "Additional Courses:",
  "- Prompt Engineering & Langchain for Developers (The Valley, Nov 2023)",
  "- GANs Training (DeepLearning.AI & Coursera, Jan 2022)",
  "- ML Principles (Microsoft & EdX, Jun 2020)"
]

export default function StudiesSection() {
  return (
    <ScrollArea className="flex-1 p-4">
      {studiesContent.map((item, index) => (
        <p key={index} className="mb-2">{item}</p>
      ))}
    </ScrollArea>
  )
}
