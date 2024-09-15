import { ScrollArea } from "@/components/ui/scroll-area"

const workContent = [
  "Artificial Intelligence Engineer",
  "Grupo MásMóvil (Sep 2023 - Present)",
  "- Architecting ML model solutions, including LLM-based models",
  "- Developing MLOps pipelines for production ML deployment",
  "- Leading partnerships with major cloud providers (VertexAI, Langchain)",
  "Backend Developer",
  "Grupo MásMóvil (Apr 2023 - Sep 2023)",
  "- Developed vital processes critical to company operations",
  "- Worked in dynamic cloud-native project environments",
  "DevOps - Data Engineer Trainee",
  "Grupo MásMóvil (Oct 2022 - Apr 2023)",
  "- Automated ETL pipelines and deployed BigQuery solutions",
  "- Developed DataStudio dashboards to analyze cloud costs",
  "Machine Learning Researcher",
  "Universidad Carlos III de Madrid (Sep 2022 - Jun 2023)",
  "- Researched game theory and data management",
  "- Coordinated international project collaborations",
  "Digital Business Developer",
  "Grupo Santa María (Jun 2019 - Aug 2019)",
  "- Co-created innovative digital products",
  "- Developed mobile apps with a multidisciplinary team"
]

export default function WorkSection() {
  return (
    <ScrollArea className="flex-1 p-4">
      {workContent.map((item, index) => (
        <p key={index} className="mb-2">{item}</p>
      ))}
    </ScrollArea>
  )
}
