import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Server, FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projectTypes } from "@/data/projectTypes";
import { icons } from "lucide-react";

const SelectConfig = () => {
  const { typeId } = useParams();
  const navigate = useNavigate();
  const projectType = projectTypes.find((t) => t.id === typeId);

  if (!projectType) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Type de projet introuvable</p>
          <Button onClick={() => navigate("/")}>Retour</Button>
        </div>
      </div>
    );
  }

  const IconComponent = icons[projectType.icon as keyof typeof icons];

  const options = [
    {
      id: "existing",
      title: "J'ai du matériel existant",
      description: "Je dispose d'une configuration actuelle à reprendre ou migrer",
      icon: Server,
    },
    {
      id: "new",
      title: "Je n'ai pas de configuration existante",
      description: "Installation neuve, aucune configuration à récupérer",
      icon: FileQuestion,
    },
  ];

  return (
    <div className="min-h-screen bg-background px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <Button
          variant="ghost"
          size="sm"
          className="mb-8 -ml-2 text-muted-foreground"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Retour
        </Button>

        <div className="mb-10 text-center">
          <div className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${projectType.color}`}>
            {IconComponent && <IconComponent className="h-6 w-6 text-foreground" />}
          </div>
          <h1 className="text-3xl font-bold font-display tracking-tight mb-2">
            {projectType.name}
          </h1>
          <p className="text-muted-foreground">
            Quelle est votre situation ?
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => navigate(`/checklist/${typeId}?config=${option.id}`)}
              className="group relative overflow-hidden rounded-2xl border bg-card p-6 text-left transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 active:scale-[0.98]"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-secondary transition-colors group-hover:bg-primary/10">
                <option.icon className="h-5 w-5 text-foreground" />
              </div>
              <h2 className="font-display font-bold text-lg mb-1">
                {option.title}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {option.description}
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                Sélectionner →
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectConfig;
