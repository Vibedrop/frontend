"use client";

function ProjectDashLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="flex bg-background flex-col h-screen px-2">{children}</div>
    </div>
  );
}

export default ProjectDashLayout;
