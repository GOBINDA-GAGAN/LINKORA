
import React from "react";
import { Save } from "lucide-react";

const UnsavedChangesBar = ({
  isDirty = false,
  title = "Personal Information & Privacy",
  onDiscard,
  onSave,
  isSaving = false,
}) => {
  if (!isDirty) return null;

  return (
    <div className="sticky top-0 z-50 flex min-h-[36px] items-center max-w-full  justify-between gap-3 border border-border bg-background px-5 py-2 sm:px-8">

      {/* Unsaved Status */}
      <div className="flex min-w-0 items-center gap-2.5">
        <span className="h-2 w-2 shrink-0 rounded-full bg-secondary" />

        <p className="truncate text-xs font-medium text-accent-foreground">
          Unsaved changes in {title}
        </p>
      </div>

      {/* Actions */}
      <div className="flex shrink-0 items-center gap-3">

        <button
          type="button"
          onClick={onDiscard}
          disabled={isSaving}
          className="rounded-md px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground disabled:opacity-50"
        >
          Discard
        </button>

        <button
          type="button"
          onClick={onSave}
          disabled={isSaving}
          className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Save size={12} />
          {isSaving ? "Saving..." : "Save Changes"}
        </button>

      </div>
    </div>
  );
};

export default UnsavedChangesBar;
