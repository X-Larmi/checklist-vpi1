import { useNavigate } from "react-router-dom";
import { projectTypes } from "@/data/projectTypes";
import { icons } from "lucide-react";
import { ClipboardList } from "lucide-react";

const SelectProject = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background px-4 py-12">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
            <ClipboardList className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold font-display tracking-tight mb-3">
            Checklist Projet
          </h1>
          <p className="text-muted-foreground text-lg">
            Choisissez votre type de projet pour démarrer
          </p>
        </div>

        {/* Project Type Cards */}
        <div className="grid gap-4 sm:grid-cols-2">
          {projectTypes.map((type) => {
            const IconComponent = icons[type.icon as keyof typeof icons];
            return (
              <button
                key={type.id}
                onClick={() => navigate(`/checklist/${type.id}`)}
                className="group relative overflow-hidden rounded-2xl border bg-card p-6 text-left transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 active:scale-[0.98]"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${type.color} opacity-0 transition-opacity group-hover:opacity-100`} />
                <div className="relative">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-secondary transition-colors group-hover:bg-primary/10">
                    {IconComponent && (
                      <IconComponent className="h-5 w-5 text-foreground" />
                    )}
                  </div>
                  <h2 className="font-display font-bold text-lg mb-1">
                    {type.name}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {type.description}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    Commencer →
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SelectProject;
