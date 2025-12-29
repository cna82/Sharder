"use client";
//imports
import React, { useRef, useState } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// ZOD Validation schema
const schema = z.object({
  fullName: z
    .string()
    .min(1, "لطفاً نام و نام خانوادگی را وارد کنید")
    .regex(/^[\u0600-\u06FFa-zA-Z\s]+$/, "نام فقط باید شامل حروف باشد"),
  mobile: z
    .string()
    .length(11, "شماره همراه باید 11 رقم باشد")
    .regex(/^09\d{9}$/, "شماره همراه معتبر نیست (مثال: 09123456789)"),
  q1: z.string().min(1, "لطفاً یک گزینه انتخاب کنید"),
  q2: z.string().min(1, "لطفاً یک گزینه انتخاب کنید"),
  q3: z.string().min(1, "لطفاً یک گزینه انتخاب کنید"),
  q4: z.string().min(1, "لطفاً یک گزینه انتخاب کنید"),
  q5: z.string().min(1, "لطفاً یک گزینه انتخاب کنید"),
});

// Survey Form comp

const SurveyForm = () => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      mobile: "",
      q1: "",
      q2: "",
      q3: "",
      q4: "",
      q5: "",
    },
  });

  const questions = [
    { name: "q1", label: "سرعت پیگیری در زمان تماس با شرکت را چگونه ارزیابی می‌کنید؟" },
    { name: "q2", label: "میزان تسلط اپراتور مرکز تماس را چگونه ارزیابی می‌کنید؟" },
    { name: "q3", label: "میزان رضایت شما از خدمات ارائه شده را چگونه ارزیابی می‌کنید؟" },
    { name: "q4", label: "خدمات پس از فروش شرکت را چگونه ارزیابی می‌کنید؟" },
    { name: "q5", label: "محصولات ما را چگونه ارزیابی می‌کنید؟" },
  ];
  const options = ["عالی", "خوب", "متوسط", "ضعیف"];

  // Prevent onsubmit naming conflict
  const handleFormSubmit = async (data) => {
    setLoading(true);
    setStatusMessage(null);
    try {
      const res = await fetch("/api/sendSurveyEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        setStatusMessage({ type: "error", text: json.message || "خطا در ارسال فرم" });
      } else {
        setStatusMessage({ type: "success", text: "پیام با موفقیت ارسال شد" });
        reset();
      }
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    } catch {
      setStatusMessage({ type: "error", text: "خطا در ارسال فرم" });
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    setLoading(false);
  };

  const InputField = ({ label, name, inputMode, maxLength }) => (
    <div className="relative mb-6">
      <input
        id={name}
        {...register(name)}
        type="text"
        inputMode={inputMode}
        maxLength={maxLength}
        style={{
          backgroundColor: "#ffffff",
          color: "#000000",
          borderColor: errors[name] ? "#EF4444" : "#d1d5db",
        }}
        className={`peer w-full border-2 rounded-lg px-4 pt-5 pb-2 focus:outline-none focus:border-blue-500 transition duration-200 ${inputMode === "numeric" ? "text-right" : ""
          }`}
        onInput={(e) => {
          if (name === "fullName") e.target.value = e.target.value.replace(/[^ \u0600-\u06FFa-zA-Z]/g, "");
          if (name === "mobile") e.target.value = e.target.value.replace(/\D/g, "");
        }}
        onPaste={(e) => {
          e.preventDefault();
          const pasted = e.clipboardData.getData("text").replace(
            name === "fullName" ? /[^ \u0600-\u06FFa-zA-Z]/g : /\D/g,
            ""
          );
          document.execCommand("insertText", false, pasted);
        }}
      />
      <label
        htmlFor={name}
        style={{ backgroundColor: "#ffffff", color: "#6b7280" }}
        className="absolute right-3 -top-2.5 text-xs px-1 peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-blue-500"
      >
        {label}
      </label>
      {errors[name] && <p className="text-red-600 text-xs mt-1">{errors[name].message}</p>}
    </div>
  );

  return (
    <Box
      sx={{ py: { xs: 3, md: 5 }, px: { xs: 1, sm: 2 }, minHeight: "100vh", backgroundColor: "#ffffff" }}
    >
      <Box
        ref={formRef}
        sx={{ maxWidth: 600, mx: "auto", borderRadius: 2, boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1),0 2px 4px -1px rgba(0,0,0,0.06)", backgroundColor: "#ffffff", overflow: "hidden", border: "1px solid #e5e7eb" }}
      >
        <Typography variant="h4" component="h2" sx={{ textAlign: "center", p: 3, mb: 2, fontSize: { xs: "1.5rem", sm: "2rem" }, color: "#000000", borderBottom: "1px solid #e5e7eb", fontWeight: "bold" }}>
          فرم نظرسنجی خدمات پس از فروش
        </Typography>

        {statusMessage && (
          <Alert severity={statusMessage.type} sx={{ mb: 3, mx: 2, backgroundColor: statusMessage.type === "error" ? "#FEE2E2" : "#DCFCE7", color: statusMessage.type === "error" ? "#B91C1C" : "#166534" }}>
            {statusMessage.text}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit(handleFormSubmit)}
          noValidate
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(handleFormSubmit)();
            }
          }}
          sx={{ p: { xs: 2, sm: 3 }, "& .MuiFormControl-root": { mb: 3, p: 0, border: "none", backgroundColor: "transparent" } }}
        >
          <InputField label="نام و نام خانوادگی" name="fullName" inputMode="text" maxLength={50} />
          <InputField label="شماره همراه" name="mobile" inputMode="numeric" maxLength={11} />

          {questions.map((q, idx) => (
            <React.Fragment key={q.name}>
              <Typography variant="body1" sx={{ fontWeight: 600, mb: 1, mt: idx === 0 ? 0 : 4, px: 1, lineHeight: 1.6, fontSize: { xs: "0.95rem", sm: "1rem" }, color: "#000000" }}>
                {q.label}
              </Typography>
              <FormControl component="fieldset" fullWidth error={!!errors[q.name]}>
                <Controller
                  name={q.name}
                  control={control}
                  render={({ field }) => (
                    <RadioGroup {...field} row={false}>
                      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 1, mt: 1 }}>
                        {options.map(opt => (
                          <FormControlLabel
                            key={opt}
                            value={opt}
                            control={<Radio size="small" sx={{ color: "#6b7280", "&.Mui-checked": { color: "#2563eb" } }} />}
                            label={<Typography sx={{ fontSize: { xs: "0.9rem", sm: "0.95rem" }, color: "#000000" }}>{opt}</Typography>}
                            sx={{ margin: 0, alignItems: "flex-start", "& .MuiButtonBase-root": { padding: { xs: "4px 8px", sm: "6px 10px" } } }}
                          />
                        ))}
                      </Box>
                    </RadioGroup>
                  )}
                />
                {errors[q.name] && (
                  <Typography variant="caption" color="error" sx={{ mt: 0.5, display: "block", color: "#EF4444" }}>
                    {errors[q.name].message}
                  </Typography>
                )}
              </FormControl>
            </React.Fragment>
          ))}

          <Box textAlign="center" mt={5}>
            <Button type="submit" variant="contained" size="large" disabled={loading} sx={{ px: 6, py: 1.5, fontSize: { xs: "0.9rem", sm: "1rem" }, backgroundColor: "#2563eb", color: "#ffffff", "&:hover": { backgroundColor: "#1d4ed8" } }}>
              {loading ? <CircularProgress size={24} sx={{ color: "#FFFFFF" }} /> : "ارسال فرم"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
export default SurveyForm;