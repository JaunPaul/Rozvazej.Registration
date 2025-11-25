import { t } from "../i18n/i18n.svelte";
import {
    validateCompany,
    validateEmail,
    validateName,
    validatePhone,
    searchLocations,
    searchCompanies,
    type FxLocation,
    type FxCompany,
    type LocationSearchType,
} from "../foxentry";
import { getEndpoint } from "../utils/getEndpoints";
import { validateStepAsync } from "../utils/validation";
import { SubmissionStatus } from "../enums/form";
import type { Company, FormStates, CustomErrors, Bucket } from "../types";
import { isEu } from "../i18n/euCountriesFilter";
import { PHASE1_ENDPOINT, PHASE2_ENDPOINT } from "../endpoints";

export class RegistrationState {
    // State
    values = $state({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        companyId: "",
        companyName: "",
        nationalId: "",
        passportOrId: "",
        deliveryCompany: [] as string[],
        deliveryCompanyWolt: false,
        deliveryCompanyFoodora: false,
        deliveryCompanyBolt: false,
        applyAsCompany: undefined as boolean | undefined,
        __addressFromSuggestion: false,
        address: "",
        country: "",
        street: "",
        houseNumber: "",
        city: "",
        zip: "",
        bankPrefix: "",
        bankNumber: "",
        bankCode: "",
        deliveryCity: "",
        transport: "",
        insurance: "",
        pinkStatement: undefined as boolean | undefined,
        gender: "",
        birthDate: "",
        passportExpiryDate: "",
        filesNationalId: [] as File[],
        filesEuPassport: [] as File[],
        filesNonEu: [] as File[],
        filesDriversLicense: [] as File[],
        utm_source: "",
        utm_campaign: "",
        utm_medium: "",
        utm_id: "",
        submitSource: "",
        foxentryPaymentStatus: true,
        step1Completed: false,
        step2Completed: false,
        step3Completed: false,
        sessionId: crypto.randomUUID(),
        formStart: new Date().toUTCString(),
        firstEndpointSubmissionId: undefined as string | undefined,
        firstEndpointSubmissionTime: undefined as string | undefined,
        finalEndpointSubmissionId: undefined as string | undefined,
        finalEndpointSubmissionTime: undefined as string | undefined,
        placeOfBirth: "",
        permanentResidence: "",
    });

    errors: CustomErrors = $state({});
    formState: FormStates = $state("neutral");
    submissionStatus: SubmissionStatus = $state(SubmissionStatus.PENDING);

    // Navigation
    currentPhase = $state(1);
    currentStep = $state("step1");

    // UI State
    validating = $state(false);
    submitting = $state(false);
    disable = $state(false);

    // Foxentry State
    addressSuggestions: FxLocation[] = $state([]);
    companySuggestions: FxCompany[] = $state([]);
    activeAddressType: LocationSearchType | null = $state(null);
    companyActive = $state(false);
    addrCtx = $state({
        street: undefined as string | undefined,
        city: undefined as string | undefined,
        zip: undefined as string | undefined,
        streetId: undefined as string | undefined,
    });

    constructor() {
        this.init();
    }

    async init() {
        if (typeof window !== "undefined") {
            this.loadFromSession();
            this.loadFromUrl();
            this.values.submitSource = this.getCompanyByDomain()[0];

            // Auto-detect phase based on URL param
            const params = new URLSearchParams(window.location.search);
            if (params.get("phase") === "2") {
                this.currentPhase = 2;
                this.currentStep = "step1"; // Reset step for phase 2
            }

            // Foxentry Payment Check
            try {
                const foxentryPaymentStatus: any = await validateName("John", "name");
                if (foxentryPaymentStatus?.status === 402) {
                    this.values.foxentryPaymentStatus = false;
                    // Assuming sendFoxentryFailedPaymentNotification is imported or handled
                    console.warn("Foxentry payment failed");
                }
            } catch (e) {
                console.error("Foxentry check failed", e);
            }

            // Drop-off tracking
            window.addEventListener("beforeunload", () => {
                this.trackDropOff(this.currentStep);
            });

            this.trackPageView(this.currentStep);
        }
    }

    trackDropOff(step: string) {
        if (typeof window === "undefined") return;
        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push({
            event: "dropOff",
            stepDroppedOff: `step-${step}`,
        });
    }

    // --- Data Loading & Persistence ---

    loadFromSession() {
        const saved = sessionStorage.getItem("multi-form-session");
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // Restore files is tricky, usually we can't. 
                // We'll restore scalar values.
                Object.assign(this.values, parsed);
                // Reset file arrays as they can't be serialized
                this.values.filesNationalId = [];
                this.values.filesEuPassport = [];
                this.values.filesNonEu = [];
                this.values.filesDriversLicense = [];
            } catch (e) {
                console.error("Failed to parse saved form data", e);
            }
        }
    }

    saveToSession() {
        if (typeof window !== "undefined") {
            // Exclude files from session storage
            const {
                filesNationalId, filesEuPassport, filesNonEu, filesDriversLicense,
                ...rest
            } = this.values;
            sessionStorage.setItem("multi-form-session", JSON.stringify(rest));
        }
    }

    loadFromUrl() {
        const params = new URLSearchParams(window.location.search);
        const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_id"];
        utmKeys.forEach(key => {
            const val = params.get(key);
            if (val) (this.values as any)[key] = val;
        });
    }

    // --- Helpers ---

    getCompanyByDomain(hostname?: string): Company[] {
        const domains: Record<string, Company> = {
            "rozvazej.cz": "Wolt",
            "rozvazej-foodora.cz": "Foodora",
            "fofrjidlo.cz": "Foodora",
            "bleskrozvoz.cz": "Bolt",
            localhost: "Development",
        };

        const raw = (
            hostname ??
            (typeof window !== "undefined" ? window.location.hostname : "")
        ).toLowerCase();
        const host = raw.replace(/^www\./, "");

        const exact = domains[host];
        if (exact) return [exact];

        const sub = Object.entries(domains).find(([domain]) =>
            host.endsWith("." + domain)
        )?.[1];

        return sub ? [sub] : [""];
    }

    async hashEmail(email: string): Promise<string> {
        if (!email) return "";
        const msgBuffer = new TextEncoder().encode(email.trim().toLowerCase());
        const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    }

    normalizeCzPhone(input: string): string | null {
        const s = (input ?? "").trim();
        if (!s) return null;
        const digits = s.replace(/\D/g, "");
        if (s.startsWith("+")) {
            if (digits.startsWith("420") && digits.length === 12) return `+${digits}`;
            return null;
        }
        if (digits.startsWith("00420") && digits.length === 14) return `+420${digits.slice(5)}`;
        if (digits.length === 10 && digits.startsWith("0")) return `+420${digits.slice(1)}`;
        if (digits.length === 9) return `+420${digits}`;
        if (digits.startsWith("420") && digits.length === 12) return `+${digits}`;
        return null;
    }

    // --- Validation & Navigation ---

    async validateCurrentStep(stepId: "step1" | "step2" | "step3") {
        this.validating = true;
        const { ok, fieldErrors } = await validateStepAsync(
            stepId,
            this.values,
            this.values.foxentryPaymentStatus
        );
        this.errors = fieldErrors;
        this.validating = false;
        return ok;
    }

    async nextStep(targetStep: string) {
        // Logic to move to next step
        // This will be driven by the Phase components calling this
        this.currentStep = targetStep;
        this.saveToSession();
        this.trackPageView(targetStep);
    }

    // --- Submission ---

    async submitPhase1() {
        this.disable = true;
        this.submitting = true;
        this.formState = "submitting";

        // Placeholder endpoint
        const endpoint = PHASE1_ENDPOINT

        try {
            // Prepare payload (similar to original partialSubmit/submit)
            const fd = new FormData();
            // ... append fields ...
            // For now, just logging
            console.log("Submitting Phase 1", this.values);

            // Simulate success
            await new Promise(r => setTimeout(r, 1000));

            this.formState = "success";
            this.submissionStatus = SubmissionStatus.APPROVED;
            this.trackCompletion("Phase1_Success");

        } catch (err) {
            console.error(err);
            this.formState = "fail";
            this.submissionStatus = SubmissionStatus.REJECTED;
        } finally {
            this.disable = false;
            this.submitting = false;
        }
    }

    async submitPhase2() {
        this.disable = true;
        this.submitting = true;
        this.formState = "submitting";

        const endpoint = PHASE2_ENDPOINT; // Or new phase 2 endpoint

        try {
            // ... append fields and files ...
            console.log("Submitting Phase 2", this.values);

            // Simulate success
            await new Promise(r => setTimeout(r, 1000));

            this.formState = "success";
            this.submissionStatus = SubmissionStatus.APPROVED;
            this.trackCompletion("Phase2_Success");

        } catch (err) {
            console.error(err);
            this.formState = "fail";
        } finally {
            this.disable = false;
            this.submitting = false;
        }
    }

    // --- File Handling ---

    appendFiles(bucket: Bucket, files: FileList | File[]) {
        const fileList = Array.isArray(files) ? files : Array.from(files);

        const targetArray =
            bucket === "nationalId" ? this.values.filesNationalId :
                bucket === "euPassport" ? this.values.filesEuPassport :
                    bucket === "driversLicense" ? this.values.filesDriversLicense :
                        this.values.filesNonEu;

        // Dedupe
        const current = targetArray;
        const byKey = new Map<string, File>();
        [...current, ...fileList].forEach(f => {
            byKey.set(`${f.name}|${f.size}|${f.lastModified}`, f);
        });

        const newFiles = Array.from(byKey.values());

        if (bucket === "nationalId") this.values.filesNationalId = newFiles;
        else if (bucket === "euPassport") this.values.filesEuPassport = newFiles;
        else if (bucket === "driversLicense") this.values.filesDriversLicense = newFiles;
        else this.values.filesNonEu = newFiles;
    }

    removeFile(bucket: Bucket, file: File) {
        const targetArray =
            bucket === "nationalId" ? this.values.filesNationalId :
                bucket === "euPassport" ? this.values.filesEuPassport :
                    bucket === "driversLicense" ? this.values.filesDriversLicense :
                        this.values.filesNonEu;

        const newFiles = targetArray.filter(f => f !== file);

        if (bucket === "nationalId") this.values.filesNationalId = newFiles;
        else if (bucket === "euPassport") this.values.filesEuPassport = newFiles;
        else if (bucket === "driversLicense") this.values.filesDriversLicense = newFiles;
        else this.values.filesNonEu = newFiles;
    }

    // --- Tracking ---

    trackPageView(step: string) {
        if (typeof window === "undefined") return;
        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push({
            event: "virtualPageview",
            stepPage: `step-${step}`,
        });
    }

    trackCompletion(status: string) {
        // ... tracking logic ...
    }
}
