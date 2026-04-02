// REACT
import React, { useState } from "react";

// REACT-ROUTER-DOM
import { useNavigate } from "react-router-dom";

// CONFIGURATION
import { URLS } from "@/config/api";

// LIBRARY
import { LoaderCircle } from "lucide-react"; // ICON
import { format } from "date-fns"; // FOR CALENDAR
import axios from "axios"; // FOR HTTP REQUEST

// SHADCN COMPONENTS
import { Field, FieldLabel, FieldSet } from "../../components/ui/field";
import { Calendar } from "../../components/ui/calendar";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../components/ui/select";

// COMPONENTS
import WarningMessage from "../../components/warning-message";
import FieldError from "@/components/field-error";
import FormInformation from "./form-information";

// HELPER FUNCTION
import { countWords } from "@/lib/helper/text-helper";

// CONSTANT DATA
import {
  MAX_SUBMISSIONS,
  NOTES_MAX_WORDS,
  SOCIAL_POST_TYPE,
  AD_TYPE,
  PLATFORM,
  ORG_LINK_PREFIX,
  PRODUCT_LINK_PREFIX,
  GOOGLE_DRIVE_PREFIX,
} from "./constants";

// ======== TYPES SECTION ========

type SubmissionMode = "single" | "multiple";

interface SubmissionEntry {
  id: number;
  productName: string;
  organizationLink: string;
  productLink: string;
  assetLink: string;
  socialPostType: string;
  adType: string;
  platform: string;
  date: Date | undefined;
  notes: string;
}

type EntryErrors = Partial<Record<keyof SubmissionEntry, string>>;
type FormErrors = {
  name?: string;
  entries: Record<number, EntryErrors>;
};

function createEmptyEntry(id: number): SubmissionEntry {
  return {
    id,
    productName: "",
    organizationLink: "",
    productLink: "",
    assetLink: "",
    socialPostType: "",
    adType: "",
    platform: "",
    date: undefined,
    notes: "",
  };
}

// ======== VALIDATION SECTION ========

function validateEntry(entry: SubmissionEntry): EntryErrors {
  const errors: EntryErrors = {};

  if (!entry.productName.trim())
    errors.productName = "Product name is required.";

  if (!entry.organizationLink.trim()) {
    errors.organizationLink = "Organization link is required.";
  } else if (!entry.organizationLink.startsWith(ORG_LINK_PREFIX)) {
    errors.organizationLink = `Must start with ${ORG_LINK_PREFIX}`;
  }

  if (!entry.productLink.trim()) {
    errors.productLink = "Product link is required.";
  } else if (!entry.productLink.startsWith(PRODUCT_LINK_PREFIX)) {
    errors.productLink = `Must start with ${PRODUCT_LINK_PREFIX}`;
  }

  if (!entry.assetLink.trim()) {
    errors.assetLink = "Asset link is required.";
  } else if (!entry.assetLink.startsWith(GOOGLE_DRIVE_PREFIX)) {
    errors.assetLink = `Must start with ${GOOGLE_DRIVE_PREFIX}`;
  }

  if (!entry.socialPostType)
    errors.socialPostType = "Social post type is required.";
  if (!entry.adType) errors.adType = "Ad type is required.";
  if (!entry.platform) errors.platform = "Platform is required.";
  if (!entry.date) errors.date = "Date scheduled is required.";

  if (entry.notes.trim() && countWords(entry.notes) > NOTES_MAX_WORDS) {
    errors.notes = `Notes must not exceed ${NOTES_MAX_WORDS} words (currently ${countWords(entry.notes)}).`;
  }

  return errors;
}

function validateForm(name: string, entries: SubmissionEntry[]): FormErrors {
  const errors: FormErrors = { entries: {} };

  if (!name.trim()) errors.name = "Name is required.";

  for (const entry of entries) {
    const entryErrors = validateEntry(entry);
    if (Object.keys(entryErrors).length > 0) {
      errors.entries[entry.id] = entryErrors;
    }
  }

  return errors;
}

function hasErrors(errors: FormErrors): boolean {
  if (errors.name) return true;
  return Object.keys(errors.entries).length > 0;
}

// ======== SUB-COMPONENTS ========

interface SubmissionBlockProps {
  index: number;
  entry: SubmissionEntry;
  isMultiple: boolean;
  canRemove: boolean;
  errors: EntryErrors;
  isLoading: boolean;
  onChange: (id: number, field: keyof SubmissionEntry, value: unknown) => void;
  onRemove: (id: number) => void;
}

function SubmissionBlock({
  index,
  entry,
  isMultiple,
  canRemove,
  errors,
  isLoading,
  onChange,
  onRemove,
}: SubmissionBlockProps) {
  const wordCount = countWords(entry.notes);
  const today = new Date();
  const isSameDayAllowed =
    entry.adType === "Bronze" && entry.socialPostType === "Image";

  return (
    <div
      className={`space-y-4 relative ${isMultiple ? "border rounded-lg p-5" : ""}`}
    >
      {isMultiple && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-muted-foreground">
            #{index + 1}
          </span>
          {canRemove && (
            <Button
              variant="ghost"
              size="sm"
              type="button"
              className="text-destructive hover:text-destructive h-7 px-2 text-xs"
              onClick={() => onRemove(entry.id)}
              disabled={isLoading}
            >
              Remove
            </Button>
          )}
        </div>
      )}

      {/* PRODUCT NAME */}
      <Field>
        <FieldLabel>Product Name</FieldLabel>
        <Input
          type="text"
          placeholder="Enter product name"
          value={entry.productName}
          onChange={(e) => onChange(entry.id, "productName", e.target.value)}
          disabled={isLoading}
          className={errors.productName ? "border-destructive" : ""}
        />
        <FieldError message={errors.productName} />
      </Field>

      {/* ORGANIZATION LINK */}
      <Field>
        <FieldLabel>Organization Link</FieldLabel>
        <Input
          type="text"
          placeholder={`Enter organization madmin link`}
          value={entry.organizationLink}
          onChange={(e) =>
            onChange(entry.id, "organizationLink", e.target.value)
          }
          disabled={isLoading}
          className={errors.organizationLink ? "border-destructive" : ""}
        />
        <FieldError message={errors.organizationLink} />
      </Field>

      {/* PRODUCT LINK */}
      <Field>
        <FieldLabel>Product Link</FieldLabel>
        <Input
          type="text"
          placeholder={`Enter product madmin link`}
          value={entry.productLink}
          onChange={(e) => onChange(entry.id, "productLink", e.target.value)}
          disabled={isLoading}
          className={errors.productLink ? "border-destructive" : ""}
        />
        <FieldError message={errors.productLink} />
      </Field>

      {/* ASSET LINK */}
      <Field>
        <FieldLabel>Asset Folder</FieldLabel>
        <Input
          type="text"
          placeholder="Enter google drive asset link"
          value={entry.assetLink}
          onChange={(e) => onChange(entry.id, "assetLink", e.target.value)}
          disabled={isLoading}
          className={errors.assetLink ? "border-destructive" : ""}
        />
        <FieldError message={errors.assetLink} />
      </Field>

      {/* SOCIAL POST TYPE */}
      <Field>
        <FieldLabel>Social Post Type</FieldLabel>
        <Select
          value={entry.socialPostType}
          onValueChange={(val) => onChange(entry.id, "socialPostType", val)}
          disabled={isLoading}
        >
          <SelectTrigger
            className={errors.socialPostType ? "border-destructive" : ""}
          >
            <SelectValue placeholder="Select a social post type" />
          </SelectTrigger>
          <SelectContent>
            {SOCIAL_POST_TYPE.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FieldError message={errors.socialPostType} />
      </Field>

      {/* AD TYPE */}
      <Field>
        <FieldLabel>Ad Type</FieldLabel>
        <Select
          value={entry.adType}
          onValueChange={(val) => onChange(entry.id, "adType", val)}
          disabled={isLoading}
        >
          <SelectTrigger className={errors.adType ? "border-destructive" : ""}>
            <SelectValue placeholder="Select an ad type" />
          </SelectTrigger>
          <SelectContent>
            {AD_TYPE.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FieldError message={errors.adType} />
      </Field>

      {/* DATE SCHEDULED */}
      <Field>
        <FieldLabel>Date Scheduled</FieldLabel>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={`justify-start font-normal ${errors.date ? "border-destructive!" : ""}`}
              disabled={isLoading}
            >
              {entry.date ? (
                format(entry.date, "PPP")
              ) : (
                <span>Select a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={entry.date}
              onSelect={(d) => onChange(entry.id, "date", d)}
              defaultMonth={entry.date}
              disabled={
                isSameDayAllowed
                  ? [{ before: today }]
                  : [{ before: today }, today]
              }
            />
          </PopoverContent>
        </Popover>
        <FieldError message={errors.date} />
      </Field>

      {/* PLATFORM */}
      <Field>
        <FieldLabel>Platform</FieldLabel>
        <Select
          value={entry.platform}
          onValueChange={(val) => onChange(entry.id, "platform", val)}
          disabled={isLoading}
        >
          <SelectTrigger
            className={errors.platform ? "border-destructive" : ""}
          >
            <SelectValue placeholder="Select a platform" />
          </SelectTrigger>
          <SelectContent>
            {PLATFORM.map((p) => (
              <SelectItem key={p} value={p}>
                {p}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FieldError message={errors.platform} />
      </Field>

      {/* NOTES */}
      <Field>
        <FieldLabel>
          Notes{" "}
          <Badge variant="ghost" className="ml-auto">
            optional
          </Badge>
        </FieldLabel>
        <Textarea
          placeholder="Add any additional notes..."
          className={`w-full resize-none break-all${errors.notes ? " border-destructive" : ""}`}
          rows={4}
          value={entry.notes}
          onChange={(e) => onChange(entry.id, "notes", e.target.value)}
          disabled={isLoading}
        />
        <div className="flex items-center justify-between mt-1">
          <FieldError message={errors.notes} />
          <span
            className={`text-xs ml-auto ${
              wordCount > NOTES_MAX_WORDS
                ? "text-destructive"
                : "text-muted-foreground"
            }`}
          >
            {wordCount}/{NOTES_MAX_WORDS} words
          </span>
        </div>
      </Field>
    </div>
  );
}

// ======== MAIN COMPONENT ========

export default function FormContainer() {
  // STATES
  const [name, setName] = useState("");
  const [submissionMode, setSubmissionMode] =
    useState<SubmissionMode>("single");
  const [entries, setEntries] = useState<SubmissionEntry[]>([
    createEmptyEntry(1),
  ]);

  // LOADING AND ERROR STATE
  const [errors, setErrors] = useState<FormErrors>({ entries: {} });
  const [isLoading, setIsLoading] = useState(false);

  const nextId = React.useRef(2);
  const isMultiple = submissionMode === "multiple";
  const canAddMore = entries.length < MAX_SUBMISSIONS;

  const navigate = useNavigate();

  function handleModeChange(mode: SubmissionMode) {
    setSubmissionMode(mode);
    setEntries([createEmptyEntry(1)]);
    nextId.current = 2;
    setErrors({ entries: {} });
  }

  function handleEntryChange(
    id: number,
    field: keyof SubmissionEntry,
    value: unknown,
  ) {
    setEntries((prev) =>
      prev.map((e) => {
        if (e.id !== id) return e;

        const updated = { ...e, [field]: value };

        // If adType or socialPostType changed, check if selected date (today) is still valid
        if (field === "adType" || field === "socialPostType") {
          const isSameDayAllowed =
            updated.adType === "Bronze" && updated.socialPostType === "Image";

          const isToday =
            updated.date &&
            updated.date.toDateString() === new Date().toDateString();

          if (!isSameDayAllowed && isToday) {
            updated.date = undefined; // clear the date
            toast.warning(
              "Same day booking is only allowed for Bronze & Image.",
              {
                position: "top-right",
              },
            );
          }
        }

        return updated;
      }),
    );

    // clear field error as before
    setErrors((prev) => {
      const entryErrors = { ...(prev.entries[id] ?? {}) };
      delete entryErrors[field as keyof EntryErrors];
      return {
        ...prev,
        entries: { ...prev.entries, [id]: entryErrors },
      };
    });
  }

  function handleAddSubmission() {
    if (entries.length >= MAX_SUBMISSIONS) return;
    setEntries((prev) => [...prev, createEmptyEntry(nextId.current++)]);
  }

  function handleRemoveEntry(id: number) {
    setEntries((prev) => prev.filter((e) => e.id !== id));
    setErrors((prev) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [id]: _, ...rest } = prev.entries;
      return { ...prev, entries: rest };
    });
  }

  // SUBMIT DATA TO N8N
  async function handleSubmit() {
    const validationErrors = validateForm(name, entries);
    setErrors(validationErrors);
    if (hasErrors(validationErrors)) return;

    setIsLoading(true);
    try {
      const payload = {
        name,
        submissionMode,
        entries: entries.map((e) => ({
          ...e,
          date: e.date ? format(e.date, "yyyy-MM-dd") : undefined,
        })),
        submittedAt: new Date().toISOString(),
      };

      const response = await axios.post(URLS.SOCIAL, payload, {
        timeout: 60000,
      });

      // HANDLE 207 - PARTIALLY BOOKED
      if (response.status === 207) {
        sessionStorage.setItem(
          "socialPartiallyBookedData",
          JSON.stringify(response.data[0]),
        );
        navigate("/social-booking/partially-booked");
        return;
      }

      // GET MESSAGE FROM WEBHOOK RESPONSE
      const data = response.data;
      const message = Array.isArray(data) ? data[0]?.message : data?.message;

      // HANDLE 200 - SUCCESS BOOKING
      toast.success(message, {
        position: "top-right",
        style: {
          background: "#16a34a",
          color: "#ffffff",
        },
      });

      // RESET FORM
      setName("");
      setSubmissionMode("single");
      setEntries([createEmptyEntry(1)]);
      nextId.current = 2;
      setErrors({ entries: {} });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const data = error.response?.data;

        // HANDLE BOTH ARRAY RESPONSE [ { message: "..." } ] and object { message: "..." }
        const message = Array.isArray(data) ? data[0]?.message : data?.message;

        // HANDLE 409 - FULLY BOOKED
        if (status === 409) {
          sessionStorage.setItem(
            "socialFullyBookedData",
            JSON.stringify(data[0]),
          );
          navigate("/social-booking/fully-booked");
          return;
        }
        // HANDLE 503 - APPS SCRIPT
        if (status === 503) {
          toast.error(message || "Something went wrong. Please try again.", {
            position: "top-right",
            style: {
              background: "#a50e0e",
              color: "#ffffff",
            },
          });
        } else {
          // NORMAL ERROR
          toast.error(message || "Something went wrong. Please try again.", {
            position: "top-right",
            style: {
              background: "#a50e0e",
              color: "#ffffff",
            },
          });
        }
      } else {
        alert("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full lg:w-2/3">
      <FormInformation />

      {/* INTRODUCTION */}
      <div className="my-5">
        <h1 className="text-2xl font-semibold">Social Booking Details</h1>
        <p className="text-sm text-muted-foreground">
          Book multiple social placements in one go.
        </p>
      </div>

      {/* NAME */}
      <FieldSet>
        <Field>
          <FieldLabel>Name</FieldLabel>
          <Input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrors((prev) => ({ ...prev, name: undefined }));
            }}
            disabled={isLoading}
            className={errors.name ? "border-destructive" : ""}
          />
          {errors.name && (
            <p className="text-xs text-destructive mt-1">{errors.name}</p>
          )}
        </Field>

        {/* MODE TOGGLE - ALWAYS VISIBLE */}
        <Field>
          <div className="flex gap-2">
            <Button
              type="button"
              variant={!isMultiple ? "default" : "outline"}
              size="sm"
              onClick={() => handleModeChange("single")}
              className="flex-1"
              disabled={isLoading}
            >
              Single
            </Button>
            <Button
              type="button"
              variant={isMultiple ? "default" : "outline"}
              size="sm"
              onClick={() => handleModeChange("multiple")}
              className="flex-1"
              disabled={isLoading}
            >
              Multiple
            </Button>
          </div>
        </Field>

        {/* ENTRIES */}
        <div className="space-y-6">
          {entries.map((entry, index) => (
            <SubmissionBlock
              key={entry.id}
              index={index}
              entry={entry}
              isMultiple={isMultiple}
              canRemove={isMultiple && entries.length > 1}
              errors={errors.entries[entry.id] ?? {}}
              isLoading={isLoading}
              onChange={handleEntryChange}
              onRemove={handleRemoveEntry}
            />
          ))}
        </div>

        {/* ADD ANOTHER SUBMISSION (MULTIPLE) */}
        {isMultiple && canAddMore && (
          <Button
            type="button"
            variant="outline"
            className="w-full border-dashed text-center"
            onClick={handleAddSubmission}
            disabled={isLoading}
          >
            + Add Another Submission{" "}
            <span className="text-xs text-muted-foreground">
              ({entries.length}/{MAX_SUBMISSIONS})
            </span>
          </Button>
        )}

        {isMultiple && !canAddMore && (
          <p className="text-xs text-muted-foreground text-center">
            Maximum of {MAX_SUBMISSIONS} submissions reached.
          </p>
        )}

        {/* SUBMIT TO N8N */}
        {/* <Button
          variant="default"
          className="cursor-pointer py-5 bg-[#EE3167] text-white"
          type="button"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-2 cursor-not-allowed">
              <span>Loading</span>
              <LoaderCircle className="animate-spin" />
            </div>
          ) : (
            "Book Social"
          )}
        </Button> */}
        {/* SUBMIT TO N8N */}
        {(() => {
          const phHour = new Date(
            new Date().toLocaleString("en-US", { timeZone: "Asia/Manila" }),
          ).getHours();
          const isOutsideAllowedHours = phHour >= 20; // Disable from 8PM (20:00) to midnight
          const isDisabled = isLoading || isOutsideAllowedHours;

          return (
            <Button
              variant="default"
              className={`py-5 text-white ${
                isDisabled
                  ? "bg-[#EE3167]/90 cursor-not-allowed"
                  : "bg-[#EE3167] cursor-pointer"
              }`}
              type="button"
              onClick={handleSubmit}
              disabled={isDisabled}
            >
              {isLoading ? (
                <div className="flex items-center gap-2 cursor-not-allowed">
                  <span>Loading</span>
                  <LoaderCircle className="animate-spin" />
                </div>
              ) : isOutsideAllowedHours ? (
                "Booking Unavailable (8PM–12AM)"
              ) : (
                "Book Social"
              )}
            </Button>
          );
        })()}

        <WarningMessage message="Once submitted, you cannot edit your booking. Please review your selections carefully before submitting." />
      </FieldSet>
    </div>
  );
}
