import { cn } from "@/lib/utils";

export type MessageBubbleProps = {
  type: "user" | "assistant";
  content: string;
};

export function MessageBubble({ type, content }: MessageBubbleProps) {
  return (
    <div
      className={cn(
        "max-w-[85%] rounded-lg px-3 py-2 text-sm",
        type === "user"
          ? "bg-primary text-primary-foreground ml-auto"
          : "bg-muted mr-auto"
      )}
    >
      {content}
    </div>
  );
}
