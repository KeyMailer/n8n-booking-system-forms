// REACT
import React, { useState, useEffect } from "react";

// REACT-ROUTER-DOM
import { useNavigate } from "react-router-dom";

// CONFIGURATION
import { URLS } from "@/config/api";

// LIBRARY
import { LoaderCircle } from "lucide-react"; // ICON
import { format } from "date-fns"; // FOR CALENDAR
import axios from "axios"; // FOR HTTP REQUEST

// SHADCN COMPONENT
import { Field, FieldLabel, FieldSet } from "../../components/ui/field";
import { Textarea } from "../../components/ui/textarea";
import { Calendar } from "../../components/ui/calendar";
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
import { countWords } from "../../lib/helper/text-helper";
import { getDisabledDays } from "./utils/getDisabledDays";
import { containsUrl } from "@/lib/helper/contain-url";

// CONSTANT DATA
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

// ======== TYPES SECTION ========

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

// ======== VALIDATION SECTION ========

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
  if (!entry.purchaseType || entry.purchaseType === "Other") {
    errors.purchaseType = "Purchase type is required.";
  }

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

  const trimmedName = name.trim();
  if (!trimmedName) {
    errors.name = "Name is required.";
  } else if (containsUrl(trimmedName)) {
    errors.name = "Name cannot contain links or URLs.";
  }
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

// ======== SUB COMPONENTS ========

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

      {/* PLACEMENT TYPE */}
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
              disabled={getDisabledDays(newsletterType)}
            />
          </PopoverContent>
        </Popover>
        <FieldError message={errors.date} />
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

      {/* SEGMENT */}
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

      {/* PURCHASE TYPE */}
      <Field>
        <FieldLabel>Purchase Type</FieldLabel>
        <Select
          value={
            PURCHASE_OPTIONS.includes(entry.purchaseType)
              ? entry.purchaseType
              : entry.purchaseType
                ? "Other"
                : ""
          }
          onValueChange={(val) => {
            if (val === "Other") {
              onChange(entry.id, "purchaseType", "Other");
            } else {
              onChange(entry.id, "purchaseType", val);
            }
          }}
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

        {/* SHOW INPUT FIELD WHEN USER SELECT OTHER */}
        {(entry.purchaseType === "Other" ||
          (!PURCHASE_OPTIONS.includes(entry.purchaseType) &&
            entry.purchaseType !== "")) && (
          <Input
            type="text"
            placeholder="Please specify purchase type"
            value={
              PURCHASE_OPTIONS.includes(entry.purchaseType)
                ? ""
                : entry.purchaseType === "Other"
                  ? ""
                  : entry.purchaseType
            }
            onChange={(e) =>
              onChange(entry.id, "purchaseType", e.target.value || "Other")
            }
            disabled={isLoading}
            className={`${errors.purchaseType ? "border-destructive" : ""}`}
            autoFocus
          />
        )}

        <FieldError message={errors.purchaseType} />
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
  const [newsletterType, setNewsletterType] = useState("");
  const [submissionMode, setSubmissionMode] =
    useState<SubmissionMode>("single");
  const [entries, setEntries] = useState<SubmissionEntry[]>([
    createEmptyEntry(1),
  ]);

  // LOADING AND ERROR STATE
  const [errors, setErrors] = useState<FormErrors>({ entries: {} });
  const [isLoading, setIsLoading] = useState(false);

  const nextId = React.useRef(2);

  // RESTORE STATE ON MOUNT
  useEffect(() => {
    const saved = sessionStorage.getItem("savedFormState");
    if (!saved) return;

    const parsed = JSON.parse(saved);
    setName(parsed.name);
    setNewsletterType(parsed.newsletterType);
    setSubmissionMode(parsed.submissionMode);
    setEntries(
      parsed.entries.map((e: SubmissionEntry & { date?: string }) => ({
        ...e,
        date: e.date ? new Date(e.date) : undefined, // deserialize Date
      })),
    );

    sessionStorage.removeItem("savedFormState"); // clean up after restoring
  }, []);

  const showModeToggle = NEWSLETTER_SHOWS_MODE.includes(newsletterType);
  const isMultiple = submissionMode === "multiple";
  const canAddMore = entries.length < MAX_SUBMISSIONS;

  const navigate = useNavigate();

  function handleNewsletterTypeChange(val: string) {
    setNewsletterType(val);
    if (!NEWSLETTER_SHOWS_MODE.includes(val)) {
      setSubmissionMode("single");
      setEntries([createEmptyEntry(1)]);
      nextId.current = 2;
    } else {
      // only clear dates if staying in mode-toggle flow
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
    // clear field-level error on change
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
    const validationErrors = validateForm(name, newsletterType, entries);
    setErrors(validationErrors);

    // SCROLL WHEN THERE'S AN ERROR
    if (hasErrors(validationErrors)) {
      // LET REACT RE-RENDER WITH THE NEW ERRORS, THEN FIND AND SCROLL TO THE FIRST ONE
      setTimeout(() => {
        const firstError = document.querySelector(".border-destructive");
        firstError?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 0);
      return;
    }

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

      const response = await axios.post(URLS.NEWSLETTER, payload, {
        timeout: 60000,
      });

      // HANDLE 207 - PARTIALLY BOOKED
      if (response.status === 207) {
        sessionStorage.setItem(
          "partiallyBookedData",
          JSON.stringify(response.data[0]),
        );
        navigate("/newsletter-booking/partially-booked");
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
      setNewsletterType("");
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
          // SAVE FROM STATE BEFORE LEAVING
          sessionStorage.setItem("fullyBookedData", JSON.stringify(data[0]));
          sessionStorage.setItem(
            "savedFormState",
            JSON.stringify({
              name,
              newsletterType,
              submissionMode,
              entries: entries.map((e) => ({
                ...e,
                date: e.date ? e.date.toISOString() : undefined, // serialize Date
              })),
            }),
          );
          // NAVIGATE TO NEXT FULLY-BOOKED PAGE
          navigate("/newsletter-booking/fully-booked");
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
        <h1 className="text-2xl font-semibold">Newsletter Booking Details</h1>
        <p className="text-sm text-muted-foreground">
          Book multiple newsletter placements in one go.
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
            <p className="text-xs text-destructive">{errors.name}</p>
          )}
        </Field>

        {/* NEWSLETTER TYPE */}
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
            <p className="text-xs text-destructive">{errors.newsletterType}</p>
          )}
        </Field>

        {/* MODE TOGGLE (SINGLE/MULTIPLE SUBMISSION) */}
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

        {/* ENTRIES */}
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

        {/* ADD ANOTHER SUBMISSION (MULTIPLE)*/}
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
        <Button
          variant="default"
          className={`cursor-pointer py-5 bg-[#EE3167] text-white`}
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
