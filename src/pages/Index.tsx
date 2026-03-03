import { useState } from "react";
import { Plus, Trash2, Check, ClipboardList, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

interface ChecklistCategory {
  id: string;
  name: string;
  items: ChecklistItem[];
}

const generateId = () => Math.random().toString(36).substring(2, 9);

const ProjectChecklist = () => {
  const [projectName, setProjectName] = useState("");
  const [categories, setCategories] = useState<ChecklistCategory[]>([
    {
      id: generateId(),
      name: "Préparation",
      items: [
        { id: generateId(), text: "Définir les objectifs du projet", completed: false },
        { id: generateId(), text: "Identifier les parties prenantes", completed: false },
        { id: generateId(), text: "Établir le budget", completed: false },
      ],
    },
    {
      id: generateId(),
      name: "Développement",
      items: [
        { id: generateId(), text: "Créer le cahier des charges", completed: false },
        { id: generateId(), text: "Planifier les sprints", completed: false },
      ],
    },
  ]);

  const [newItemText, setNewItemText] = useState<Record<string, string>>({});
  const [newCategoryName, setNewCategoryName] = useState("");

  const totalItems = categories.reduce((sum, cat) => sum + cat.items.length, 0);
  const completedItems = categories.reduce(
    (sum, cat) => sum + cat.items.filter((i) => i.completed).length,
    0
  );
  const progress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

  const toggleItem = (categoryId: string, itemId: string) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              items: cat.items.map((item) =>
                item.id === itemId ? { ...item, completed: !item.completed } : item
              ),
            }
          : cat
      )
    );
  };

  const addItem = (categoryId: string) => {
    const text = newItemText[categoryId]?.trim();
    if (!text) return;
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? { ...cat, items: [...cat.items, { id: generateId(), text, completed: false }] }
          : cat
      )
    );
    setNewItemText((prev) => ({ ...prev, [categoryId]: "" }));
  };

  const removeItem = (categoryId: string, itemId: string) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? { ...cat, items: cat.items.filter((item) => item.id !== itemId) }
          : cat
      )
    );
  };

  const addCategory = () => {
    const name = newCategoryName.trim();
    if (!name) return;
    setCategories((prev) => [...prev, { id: generateId(), name, items: [] }]);
    setNewCategoryName("");
  };

  const removeCategory = (categoryId: string) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== categoryId));
  };

  return (
    <div className="min-h-screen bg-background px-4 py-12">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <ClipboardList className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold font-display tracking-tight">
              Checklist Projet
            </h1>
          </div>

          <Input
            placeholder="Nom du projet..."
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="text-lg font-display border-none bg-transparent px-0 placeholder:text-muted-foreground/50 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>

        {/* Progress */}
        <div className="mb-10 rounded-xl border bg-card p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-muted-foreground">Progression</span>
            <span className="text-sm font-bold font-display">
              {completedItems}/{totalItems} tâches
            </span>
          </div>
          <Progress value={progress} className="h-2.5" />
          <p className="mt-2 text-right text-xs text-muted-foreground">
            {Math.round(progress)}% complété
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-6">
          {categories.map((category) => (
            <div key={category.id} className="rounded-xl border bg-card overflow-hidden">
              {/* Category Header */}
              <div className="flex items-center justify-between border-b px-5 py-3.5">
                <div className="flex items-center gap-2">
                  <GripVertical className="h-4 w-4 text-muted-foreground/40" />
                  <h2 className="font-display font-semibold text-sm uppercase tracking-wider">
                    {category.name}
                  </h2>
                  <span className="ml-1 rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
                    {category.items.filter((i) => i.completed).length}/{category.items.length}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted-foreground hover:text-destructive"
                  onClick={() => removeCategory(category.id)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>

              {/* Items */}
              <div className="divide-y">
                {category.items.map((item) => (
                  <div
                    key={item.id}
                    className="group flex items-center gap-3 px-5 py-3 transition-colors hover:bg-secondary/50"
                  >
                    <button
                      onClick={() => toggleItem(category.id, item.id)}
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all ${
                        item.completed
                          ? "border-success bg-success"
                          : "border-muted-foreground/30 hover:border-primary"
                      }`}
                    >
                      {item.completed && <Check className="h-3 w-3 text-success-foreground" />}
                    </button>
                    <span
                      className={`flex-1 text-sm transition-all ${
                        item.completed
                          ? "text-muted-foreground line-through"
                          : "text-foreground"
                      }`}
                    >
                      {item.text}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-destructive"
                      onClick={() => removeItem(category.id, item.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                ))}
              </div>

              {/* Add Item */}
              <div className="flex items-center gap-2 border-t px-5 py-3">
                <Input
                  placeholder="Ajouter une tâche..."
                  value={newItemText[category.id] || ""}
                  onChange={(e) =>
                    setNewItemText((prev) => ({ ...prev, [category.id]: e.target.value }))
                  }
                  onKeyDown={(e) => e.key === "Enter" && addItem(category.id)}
                  className="h-8 border-none bg-transparent px-0 text-sm placeholder:text-muted-foreground/40 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 shrink-0 text-primary"
                  onClick={() => addItem(category.id)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Category */}
        <div className="mt-6 flex items-center gap-3">
          <Input
            placeholder="Nouvelle catégorie..."
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addCategory()}
            className="h-10 rounded-xl"
          />
          <Button onClick={addCategory} className="h-10 shrink-0 rounded-xl gap-1.5">
            <Plus className="h-4 w-4" />
            Ajouter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectChecklist;
