const FormError: React.FC<{ error: string | null | undefined }> = ({
  error,
}) => {
  return <>{error && <p className="text-red-500">{error}</p>}</>;
};

export default FormError;
