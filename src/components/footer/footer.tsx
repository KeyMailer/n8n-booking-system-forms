export default function Footer() {
  return (
    <div className="fixed bottom-0 left-0 w-full py-4 text-center">
      <span className="text-sm text-muted-foreground">
        If you encounter any technical issues, mention Justin in the Slack{" "}
        <span className="text-[#EE3167] dark:text-yellow-500">
          #workflow_automation
        </span>{" "}
        channel.
      </span>
    </div>
  );
}
