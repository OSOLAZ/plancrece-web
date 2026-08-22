import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export type ResultCardProps = {
  title: string;
  description: string;
  cta: string;
  source: string;
  onClick?: () => void;
};

export function ResultCard({ title, description, cta, source, onClick }: ResultCardProps) {
  return (
    <Card className="border shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-1 pt-0">
        <Button variant="link" className="h-auto p-0 text-sm" onClick={onClick}>
          {cta} &#8594;
        </Button>
        <span className="text-xs text-muted-foreground">Fuente: {source}</span>
      </CardFooter>
    </Card>
  );
}
