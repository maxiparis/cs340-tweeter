export interface View {
  displayErrorMessage: (
    message: string,
    bootstrapClasses?: string | undefined,
  ) => void;
}
