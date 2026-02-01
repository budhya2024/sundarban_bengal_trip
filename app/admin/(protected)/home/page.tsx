"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Save, RotateCcw, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { HomeContent } from "@/lib/content";

export default function HomePageEditor() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [content, setContent] = useState<HomeContent | null>(null);
  const [originalContent, setOriginalContent] = useState<HomeContent | null>(
    null,
  );

  // Fetch content on mount
  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch("/api/content/home");
      if (response.ok) {
        const data = await response.json();
        setContent(data);
        setOriginalContent(data);
      } else {
        toast({
          title: "Error",
          description: "Failed to load content",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load content",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!content) return;

    setIsSaving(true);
    try {
      const response = await fetch("/api/content/home", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(content),
      });

      if (response.ok) {
        setOriginalContent(content);
        toast({
          title: "Success",
          description: "Content saved successfully",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to save content",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save content",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (originalContent) {
      setContent(originalContent);
      toast({
        title: "Reset",
        description: "Changes have been discarded",
      });
    }
  };

  const updateHeroField = (field: string, value: any) => {
    if (!content) return;
    setContent({
      ...content,
      hero: {
        ...content.hero,
        [field]: value,
      },
    });
  };

  const updateHeroStat = (index: number, field: string, value: string) => {
    if (!content) return;
    const newStats = [...content.hero.stats];
    newStats[index] = {
      ...newStats[index],
      [field]: value,
    };
    setContent({
      ...content,
      hero: {
        ...content.hero,
        stats: newStats,
      },
    });
  };

  const updateButton = (
    type: "primary" | "secondary",
    field: "text" | "link",
    value: string,
  ) => {
    if (!content) return;
    setContent({
      ...content,
      hero: {
        ...content.hero,
        buttons: {
          ...content.hero.buttons,
          [type]: {
            ...content.hero.buttons[type],
            [field]: value,
          },
        },
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!content) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Failed to load content</p>
      </div>
    );
  }

  const hasChanges =
    JSON.stringify(content) !== JSON.stringify(originalContent);

  return (
    <div className="space-y-6 max-w-[90%] m-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Home Page Editor
          </h1>
          <p className="text-muted-foreground mt-1">
            Edit the content for your home page
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleReset}
            disabled={!hasChanges || isSaving}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button onClick={handleSave} disabled={!hasChanges || isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <Card>
        <CardHeader>
          <CardTitle className="font-display">Hero Section</CardTitle>
          <CardDescription>
            Main banner content that appears at the top of the home page
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Tag */}
          <div className="space-y-2">
            <Label htmlFor="tag">Tag Line</Label>
            <Input
              id="tag"
              value={content.hero.tag}
              onChange={(e) => updateHeroField("tag", e.target.value)}
              placeholder="UNESCO World Heritage Site"
            />
          </div>

          {/* Title */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title (Part 1)</Label>
              <Input
                id="title"
                value={content.hero.title}
                onChange={(e) => updateHeroField("title", e.target.value)}
                placeholder="Discover the Wild Beauty of"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="titleHighlight">Title (Highlighted)</Label>
              <Input
                id="titleHighlight"
                value={content.hero.titleHighlight}
                onChange={(e) =>
                  updateHeroField("titleHighlight", e.target.value)
                }
                placeholder="Sundarbans"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={content.hero.description}
              onChange={(e) => updateHeroField("description", e.target.value)}
              placeholder="Enter hero description"
              rows={4}
            />
          </div>

          <Separator />

          {/* Buttons */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">
              Call-to-Action Buttons
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-muted-foreground">
                  Primary Button
                </h4>
                <div className="space-y-2">
                  <Label htmlFor="primaryText">Button Text</Label>
                  <Input
                    id="primaryText"
                    value={content.hero.buttons.primary.text}
                    onChange={(e) =>
                      updateButton("primary", "text", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="primaryLink">Button Link</Label>
                  <Input
                    id="primaryLink"
                    value={content.hero.buttons.primary.link}
                    onChange={(e) =>
                      updateButton("primary", "link", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-muted-foreground">
                  Secondary Button
                </h4>
                <div className="space-y-2">
                  <Label htmlFor="secondaryText">Button Text</Label>
                  <Input
                    id="secondaryText"
                    value={content.hero.buttons.secondary.text}
                    onChange={(e) =>
                      updateButton("secondary", "text", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondaryLink">Button Link</Label>
                  <Input
                    id="secondaryLink"
                    value={content.hero.buttons.secondary.link}
                    onChange={(e) =>
                      updateButton("secondary", "link", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Stats */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Statistics</h3>
            <div className="grid grid-cols-3 gap-4">
              {content.hero.stats.map((stat, index) => (
                <div key={index} className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Stat {index + 1}
                  </h4>
                  <div className="space-y-2">
                    <Label htmlFor={`stat-value-${index}`}>Value</Label>
                    <Input
                      id={`stat-value-${index}`}
                      value={stat.value}
                      onChange={(e) =>
                        updateHeroStat(index, "value", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`stat-label-${index}`}>Label</Label>
                    <Input
                      id={`stat-label-${index}`}
                      value={stat.label}
                      onChange={(e) =>
                        updateHeroStat(index, "label", e.target.value)
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Media */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Background Media</h3>
            <div className="space-y-2">
              <Label htmlFor="videoUrl">Video URL</Label>
              <Input
                id="videoUrl"
                value={content.hero.videoUrl}
                onChange={(e) => updateHeroField("videoUrl", e.target.value)}
                placeholder="https://..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="posterUrl">Poster Image URL</Label>
              <Input
                id="posterUrl"
                value={content.hero.posterUrl}
                onChange={(e) => updateHeroField("posterUrl", e.target.value)}
                placeholder="https://..."
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
