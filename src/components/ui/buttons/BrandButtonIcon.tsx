import { Button } from "@/components"

interface Props {
  title: string
  variant?: 'default' | 'ghost' | 'link' | 'outline' | 'link' 
  icon?: React.ReactNode
}

export function BrandButtonIcon({ title, variant, icon }: Props) {
  return (
    <Button variant={variant ?? 'default'} size="sm">
      { icon } { title }
    </Button>
  )
}
