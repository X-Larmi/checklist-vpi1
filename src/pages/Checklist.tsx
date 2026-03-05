import { useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Plus, Trash2, Check, ArrowLeft, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { projectTypes } from "@/data/projectTypes";
import { icons } from "lucide-react";

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  hasInput?: boolean;
  inputValue?: string;
  inputPlaceholder?: string;
  multipleInputs?: { key: string; placeholder: string }[];
  inputValues?: Record<string, string>;
}

const ITEMS_WITH_INPUT: Record<string, string> = {
  "ID pour le MGMT": "Ex: VLAN 10",
  "Adresse IP et Masque": "Ex: 192.168.1.1 / 255.255.255.0",
  "Passerelle": "Ex: 192.168.1.254",
  "Hostname": "Ex: SW-CORE-01",
};

const ITEMS_WITH_MULTIPLE_INPUTS: Record<string, { key: string; placeholder: string }[]> = {
  "Login / Mot de passe": [
    { key: "login", placeholder: "Login" },
    { key: "password", placeholder: "Mot de passe" },
  ],
};

const EXISTING_CONFIG_CATEGORIES: Record<string, { name: string; items: string[] }[]> = {
  switching: [
    {
      name: "Informations IP",
      items: [
        "ID pour le MGMT",
        "Adresse IP et Masque",
        "Passerelle",
      ],
    },
    {
      name: "Accès & Identification",
      items: [
        "Login / Mot de passe",
        "Hostname",
      ],
    },
  ],
};

interface ChecklistCategory {
  id: string;
  name: string;
  items: ChecklistItem[];
}

const generateId = () => Math.random().toString(36).substring(2, 9);

const Checklist = () => {
  const { typeId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const configType = searchParams.get("config");
  const projectType = projectTypes.find((t) => t.id === typeId);

  const [projectName, setProjectName] = useState("");
  const [categories, setCategories] = useState<ChecklistCategory[]>(() => {
    if (!projectType) return [];

    const sourceCategories =
      configType === "existing" && typeId && EXISTING_CONFIG_CATEGORIES[typeId]
        ? EXISTING_CONFIG_CATEGORIES[typeId]
        : projectType.categories;

    return sourceCategories.map((cat) => ({
      id: generateId(),
      name: cat.name,
      items: cat.items.map((text) => ({
        id: generateId(),
        text,
        completed: false,
        hasInput: !!ITEMS_WITH_INPUT[text],
        inputValue: "",
        inputPlaceholder: ITEMS_WITH_INPUT[text] || "",
        multipleInputs: ITEMS_WITH_MULTIPLE_INPUTS[text] || undefined,
        inputValues: ITEMS_WITH_MULTIPLE_INPUTS[text] ? {} : undefined,
      })),
    }));
  });
  const [newItemText, setNewItemText] = useState<Record<string, string>>({});
  const [newCategoryName, setNewCategoryName] = useState("");

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

  const toggleItem = (categoryId: string, itemId: string) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? { ...cat, items: cat.items.map((item) => item.id === itemId ? { ...item, completed: !item.completed } : item) }
          : cat
      )
    );
  };

  const updateItemInput = (categoryId: string, itemId: string, value: string) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? { ...cat, items: cat.items.map((item) => item.id === itemId ? { ...item, inputValue: value } : item) }
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
        {/* Back + Header */}
        <div className="mb-10">
          <Button
            variant="ghost"
            size="sm"
            className="mb-4 -ml-2 text-muted-foreground"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Retour
          </Button>

          <div className="flex items-center gap-3 mb-4">
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${projectType.color}`}>
              {IconComponent && <IconComponent className="h-5 w-5 text-foreground" />}
            </div>
            <h1 className="text-3xl font-bold font-display tracking-tight">
              {projectType.name}
            </h1>
          </div>

          <Input
            placeholder="Nom du projet..."
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="text-lg font-display border-none bg-transparent px-0 placeholder:text-muted-foreground/50 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>


        {/* Categories */}
        <div className="space-y-6">
          {categories.map((category) => (
            <div key={category.id} className="rounded-xl border bg-card overflow-hidden">
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

              <div className="divide-y">
                {category.items.map((item) => (
                  <div
                    key={item.id}
                    className="group px-5 py-3 transition-colors hover:bg-secondary/50"
                  >
                    <div className="flex items-center gap-3">
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
                          item.completed ? "text-muted-foreground" : "text-foreground"
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
                    {item.hasInput && item.completed && (
                      <div className="mt-2 ml-8">
                        <Input
                          placeholder={item.inputPlaceholder}
                          value={item.inputValue || ""}
                          onChange={(e) => updateItemInput(category.id, item.id, e.target.value)}
                          className="h-8 text-sm"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 border-t px-5 py-3">
                <Input
                  placeholder="Ajouter une tâche..."
                  value={newItemText[category.id] || ""}
                  onChange={(e) => setNewItemText((prev) => ({ ...prev, [category.id]: e.target.value }))}
                  onKeyDown={(e) => e.key === "Enter" && addItem(category.id)}
                  className="h-8 border-none bg-transparent px-0 text-sm placeholder:text-muted-foreground/40 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0 text-primary" onClick={() => addItem(category.id)}>
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

export default Checklist;
