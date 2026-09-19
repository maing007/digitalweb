export type ErrorCode = "UNAUTHORIZED" | "FORBIDDEN" | "NOT_FOUND" | "VALIDATION" | "INTERNAL" | "RATE_LIMITED";

export interface ApiError {
  ok: false;
  error: {
    code: ErrorCode;
    message: string;
    details?: Record<string, string[]>;
  };
}

export interface ApiSuccess<T> {
  ok: true;
  data: T;
}

export type ApiResult<T> = ApiSuccess<T> | ApiError;

export class AppError extends Error {
  readonly code: ErrorCode;
  readonly status: number;
  details?: Record<string, string[]>;

  constructor(code: ErrorCode, message: string, status: number = 500, details?: Record<string, string[]>) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

export function toApiResult<T>(err: unknown, fallbackCode: ErrorCode = "INTERNAL"): ApiResult<T> {
  if (err instanceof AppError) {
    return {
      ok: false,
      error: {
        code: err.code,
        message: err.message,
        ...(err.details ? { details: err.details } : {}),
      },
    };
  }
  console.error("[worksphere] Unhandled error:", err);
  return {
    ok: false,
    error: { code: fallbackCode, message: "An unexpected error occurred" },
  };
}
