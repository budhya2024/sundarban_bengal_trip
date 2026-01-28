"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PageCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  lastUpdated?: string;
}

export function PageCard({
  title,
  description,
  icon: Icon,
  href,
  lastUpdated,
}: PageCardProps) {
  return (
    <Card className="hover:shadow-elevated transition-shadow duration-200 border-primary/20">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
            <Icon className="w-6 h-6 text-primary" />
          </div>
        </div>
        <CardTitle className="font-display text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          {lastUpdated && (
            <p className="text-xs text-muted-foreground">
              Updated: {lastUpdated}
            </p>
          )}
          <Button asChild variant="default" size="sm" className="ml-auto">
            <Link href={href}>Edit Content</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
