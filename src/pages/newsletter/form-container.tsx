// react
import React, { useState } from "react";

// date-fns format
import { format } from "date-fns";

import { Field, FieldLabel, FieldSet } from "../../components/ui/field";
import { Input } from "../../components/ui/input";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../components/ui/select";

import {
  NEWSLETTER_SHOWS_MODE,
  MAX_SUBMISSIONS,
  NOTES_MAX_WORDS,
  ORG_LINK_PREFIX,
  PRODUCT_LINK_PREFIX,
  PURCHASE_OPTIONS,
  CUSTOMER_TYPES,
  PLACEMENT_TYPES,
  NEWSLETTER_TYPE,
} from "./constants";

import { LoaderCircle } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";

import { Calendar } from "../../components/ui/calendar";
import { Button } from "../../components/ui/button";

import axios from "axios";

import { Badge } from "../../components/ui/badge";
import { Textarea } from "../../components/ui/textarea";
import WarningMessage from "../../components/warning-message";

import { countWords } from "../../lib/helper/text-helper";
import FormInformation from "./form-information";
import { toast } from "sonner";

import { useNavigate } from "react-router-dom";
// ─── Types ────────────────────────────────────────────────────────────────────

type SubmissionMode = "single" | "multiple";

interface SubmissionEntry {
  id: number;
  date: Date | undefined;
  productName: string;
  placementType: string;
  organizationLink: string;
  productLink: string;
  segment: string;
  purchaseType: string;
  notes: string;
}

type EntryErrors = Partial<Record<keyof SubmissionEntry, string>>;
type FormErrors = {
  name?: string;
  newsletterType?: string;
  entries: Record<number, EntryErrors>; // keyed by entry.id
};

function createEmptyEntry(id: number): SubmissionEntry {
  return {
    id,
    date: undefined,
    productName: "",
    placementType: "",
    organizationLink: "",
    productLink: "",
    segment: "",
    purchaseType: "",
    notes: "",
  };
}

// ─── Validation ───────────────────────────────────────────────────────────────

function validateEntry(entry: SubmissionEntry): EntryErrors {
  const errors: EntryErrors = {};

  if (!entry.productName.trim())
    errors.productName = "Product name is required.";
  if (!entry.placementType)
    errors.placementType = "Placement type is required.";
  if (!entry.date) errors.date = "Date scheduled is required.";

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

  if (!entry.segment) errors.segment = "Segment is required.";
  if (!entry.purchaseType) errors.purchaseType = "Purchase type is required.";

  if (entry.notes.trim() && countWords(entry.notes) > NOTES_MAX_WORDS) {
    errors.notes = `Notes must not exceed ${NOTES_MAX_WORDS} words (currently ${countWords(entry.notes)}).`;
  }

  return errors;
}

function validateForm(
  name: string,
  newsletterType: string,
  entries: SubmissionEntry[],
): FormErrors {
  const errors: FormErrors = { entries: {} };

  if (!name.trim()) errors.name = "Name is required.";
  if (!newsletterType) errors.newsletterType = "Newsletter type is required.";

  for (const entry of entries) {
    const entryErrors = validateEntry(entry);
    if (Object.keys(entryErrors).length > 0) {
      errors.entries[entry.id] = entryErrors;
    }
  }

  return errors;
}

function hasErrors(errors: FormErrors): boolean {
  if (errors.name || errors.newsletterType) return true;
  return Object.keys(errors.entries).length > 0;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

// Add this helper above SubmissionBlock or inside it
function getDisabledDays(newsletterType: string) {
  const today = new Date();

  // dayOfWeek: 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
  const TUESDAY = 2;
  const WEDNESDAY = 3;
  const THURSDAY = 4;

  let disabledDays: number[] = [0, 6]; // always disable weekends

  if (newsletterType === "Influencer") {
    disabledDays = [...disabledDays, TUESDAY, WEDNESDAY, THURSDAY];
  } else if (newsletterType === "Press") {
    disabledDays = [...disabledDays, TUESDAY, THURSDAY];
  } else if (newsletterType === "Both") {
    disabledDays = [...disabledDays, TUESDAY, THURSDAY];
  }

  return [{ before: today }, { dayOfWeek: disabledDays }];
}

interface SubmissionBlockProps {
  index: number;
  entry: SubmissionEntry;
  showIndex: boolean;
  canRemove: boolean;
  errors: EntryErrors;
  isLoading: boolean;
  onChange: (id: number, field: keyof SubmissionEntry, value: unknown) => void;
  onRemove: (id: number) => void;
  newsletterType: string;
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-xs text-destructive mt-1">{message}</p>;
}

function SubmissionBlock({
  index,
  entry,
  showIndex,
  canRemove,
  errors,
  isLoading,
  onChange,
  onRemove,
  newsletterType,
}: SubmissionBlockProps) {
  const wordCount = countWords(entry.notes);

  return (
    <div
      className={`space-y-4 relative ${showIndex ? "border rounded-lg p-5" : ""}`}
    >
      {showIndex && (
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

      {/* Product Name */}
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

      {/* Placement Type */}
      <Field>
        <FieldLabel>Placement Type</FieldLabel>
        <Select
          value={entry.placementType}
          onValueChange={(val) => onChange(entry.id, "placementType", val)}
          disabled={isLoading}
        >
          <SelectTrigger
            className={errors.placementType ? "border-destructive" : ""}
          >
            <SelectValue placeholder="Select a placement type" />
          </SelectTrigger>
          <SelectContent>
            {PLACEMENT_TYPES.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FieldError message={errors.placementType} />
      </Field>

      {/* Date Scheduled */}
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
              disabled={getDisabledDays(newsletterType)}
            />
          </PopoverContent>
        </Popover>
        <FieldError message={errors.date} />
      </Field>

      {/* Organization Link */}
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

      {/* Product Link */}
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

      {/* Segment */}
      <Field>
        <FieldLabel>Segment</FieldLabel>
        <Select
          value={entry.segment}
          onValueChange={(val) => onChange(entry.id, "segment", val)}
          disabled={isLoading}
        >
          <SelectTrigger className={errors.segment ? "border-destructive" : ""}>
            <SelectValue placeholder="Select a segment" />
          </SelectTrigger>
          <SelectContent>
            {CUSTOMER_TYPES.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FieldError message={errors.segment} />
      </Field>

      {/* Purchase Type */}
      <Field>
        <FieldLabel>Purchase Type</FieldLabel>
        <Select
          value={entry.purchaseType}
          onValueChange={(val) => onChange(entry.id, "purchaseType", val)}
          disabled={isLoading}
        >
          <SelectTrigger
            className={errors.purchaseType ? "border-destructive" : ""}
          >
            <SelectValue placeholder="Select a purchase type" />
          </SelectTrigger>
          <SelectContent>
            {PURCHASE_OPTIONS.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FieldError message={errors.purchaseType} />
      </Field>

      {/* Notes */}
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

// ─── Main Component ───────────────────────────────────────────────────────────

const URL = import.meta.env.VITE_N8N_API_URL;

export default function FormContainer() {
  const [name, setName] = useState("");
  const [newsletterType, setNewsletterType] = useState("");
  const [submissionMode, setSubmissionMode] =
    useState<SubmissionMode>("single");
  const [entries, setEntries] = useState<SubmissionEntry[]>([
    createEmptyEntry(1),
  ]);
  const [errors, setErrors] = useState<FormErrors>({ entries: {} });
  const [isLoading, setIsLoading] = useState(false);

  const nextId = React.useRef(2);

  const showModeToggle = NEWSLETTER_SHOWS_MODE.includes(newsletterType);
  const isMultiple = submissionMode === "multiple";
  const canAddMore = entries.length < MAX_SUBMISSIONS;

  const navigate = useNavigate();

  function handleNewsletterTypeChange(val: string) {
    setNewsletterType(val);
    if (!NEWSLETTER_SHOWS_MODE.includes(val)) {
      setSubmissionMode("single");
      setEntries([createEmptyEntry(1)]); // already creates fresh entry, no need to clear dates separately
      nextId.current = 2;
    } else {
      // Only clear dates if staying in mode-toggle flow
      setEntries((prev) => prev.map((e) => ({ ...e, date: undefined })));
    }
    setErrors((prev) => ({ ...prev, newsletterType: undefined }));
  }

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
      prev.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    );
    // Clear field-level error on change
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

  async function handleSubmit() {
    const validationErrors = validateForm(name, newsletterType, entries);
    setErrors(validationErrors);
    if (hasErrors(validationErrors)) return;

    setIsLoading(true);
    try {
      const payload = {
        name,
        newsletterType,
        submissionMode,
        entries: entries.map((e) => ({
          ...e,
          date: e.date ? format(e.date, "yyyy-MM-dd") : undefined,
        })),
        submittedAt: new Date().toISOString(),
      };

      const response = await axios.post(URL, payload); // 🔁 replace with your actual endpoint

      // ✅ Get message from webhook response
      const data = response.data;
      const message = Array.isArray(data) ? data[0]?.message : data?.message;

      // ✅ Use toast instead of alert
      toast.success(message, {
        position: "top-right",
        style: {
          background: "#16a34a", // green
          color: "#ffffff",
        },
      });

      // Reset form
      setName("");
      setNewsletterType("");
      setSubmissionMode("single");
      setEntries([createEmptyEntry(1)]);
      nextId.current = 2;
      setErrors({ entries: {} });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const data = error.response?.data;

        // Handle both array response [ { message: "..." } ] and object { message: "..." }
        const message = Array.isArray(data) ? data[0]?.message : data?.message;

        // ✅ HANDLE 409 HERE
        if (status === 409) {
          sessionStorage.setItem("fullyBookedData", JSON.stringify(data[0])); // 👈 add [0]
          navigate("/newsletter-booking/fully-booked");
          return;
        }

        if (status === 503) {
          toast.error(message || "Something went wrong. Please try again.", {
            position: "top-right",
            style: {
              background: "#a50e0e",
              color: "#ffffff",
            },
          });
        } else {
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

      {/* Intro */}
      <div className="intro_container my-5">
        <h1 className="text-2xl font-semibold">Newsletter Booking Details</h1>
        <p className="text-sm text-muted-foreground">
          Book multiple newsletter placements in one go.
        </p>
      </div>

      {/* Fields */}
      <FieldSet className="input_fields">
        {/* Name */}
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

        {/* Newsletter Type */}
        <Field>
          <FieldLabel>Newsletter Type</FieldLabel>
          <Select
            value={newsletterType}
            onValueChange={handleNewsletterTypeChange}
            disabled={isLoading}
          >
            <SelectTrigger
              className={errors.newsletterType ? "border-destructive" : ""}
            >
              <SelectValue placeholder="Select a newsletter type" />
            </SelectTrigger>
            <SelectContent>
              {NEWSLETTER_TYPE.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.newsletterType && (
            <p className="text-xs text-destructive mt-1">
              {errors.newsletterType}
            </p>
          )}
        </Field>

        {/* Mode Toggle */}
        {showModeToggle && (
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
        )}

        {/* Entries */}
        <div className="space-y-6">
          {entries.map((entry, index) => (
            <SubmissionBlock
              key={entry.id}
              index={index}
              entry={entry}
              showIndex={isMultiple}
              canRemove={isMultiple && entries.length > 1}
              errors={errors.entries[entry.id] ?? {}}
              isLoading={isLoading}
              onChange={handleEntryChange}
              onRemove={handleRemoveEntry}
              newsletterType={newsletterType}
            />
          ))}
        </div>

        {/* Add Another */}
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

        {/* Submit */}
        <Button
          variant="default"
          className="cursor-pointer py-5 bg-chart-4 dark:bg-[#1447E6] dark:text-white"
          type="button"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <span>Loading</span>
              <LoaderCircle className="animate-spin" />
            </div>
          ) : (
            "Book Newsletter"
          )}
        </Button>

        <WarningMessage
          message=" Once submitted, you cannot edit your booking. Please review your
                      selections carefully before submitting."
        />
      </FieldSet>
    </div>
  );
}
