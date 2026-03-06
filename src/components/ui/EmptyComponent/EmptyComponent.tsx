import { Button } from "@/components"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components"
import { Ghost } from "lucide-react"
import React from "react";

interface Props {
  title: string;
  description?: string;
  icon: React.ReactNode;
  action: React.ReactNode;
}

export function EmptyComponent({title, description = '', icon, action}: Props) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          { icon }
        </EmptyMedia>
        <EmptyTitle>{ title }</EmptyTitle>
        <EmptyDescription>
          { description }
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        { action }
      </EmptyContent>
    </Empty>
  )
}
