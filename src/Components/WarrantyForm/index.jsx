"use client";
//imports
import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PersianDatePicker from "../PersianDatePicker";
import { Vazirmatn } from "next/font/google";
const vazir = Vazirmatn({ subsets: ["arabic"], display: "swap", variable: "--font-vazir" });

// Schema expects strings for all fields
const schema = z.object({
  fullName: z.string().min(1, "لطفاً نام و نام خانوادگی را وارد کنید"),
  mobile: z.string().regex(/^09\d{9}$/, "شماره موبایل باید با 09 شروع و دقیقاً 11 رقم باشد"),
  nationalId: z.string().regex(/^[0-9]{10}$/, "کد ملی باید دقیقاً ۱۰ رقم باشد"),
  purchaseDate: z.string().min(1, "لطفاً تاریخ خرید را انتخاب کنید"),
  productId: z.string().min(1, "لطفاً نام محصول را انتخاب کنید"),
  serial: z.string().min(1, "سریال دستگاه الزامی است"),
});

// Warranty form comp

const WarrantyForm = () => {
  const formRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [pickerValue, setPickerValue] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      mobile: "",
      nationalId: "",
      purchaseDate: "",
      productId: "",
      serial: "",
    },
  });

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch(() => setProducts([]));
  }, []);

  useEffect(() => {
    if (statusMessage) {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [statusMessage]);

  const handleDateChange = (date) => {
    if (!date) {
      setPickerValue(null);
      setValue("purchaseDate", "", { shouldValidate: true });
      return;
    }
    const str = `${date.year}-${String(date.month.number).padStart(2, "0")}-${String(date.day).padStart(2, "0")}`;
    setPickerValue(date);
    setValue("purchaseDate", str, { shouldValidate: true });
  };

  const handleFormSubmit = async (data) => {
    setLoading(true);
    setStatusMessage(null);
    try {
      const res = await fetch("/api/sendWarrantyEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        setStatusMessage({ type: "error", text: json.message || "خطا در ارسال فرم" });
      } else {
        setStatusMessage({ type: "success", text: "گارانتی با موفقیت ثبت شد!" });
        reset();
        setPickerValue(null);
      }
    } catch {
      setStatusMessage({ type: "error", text: "خطا در ارسال فرم. لطفاً دوباره تلاش کنید." });
    }
    setLoading(false);
  };

  const InputField = ({ label, name, type = "text", inputMode, maxLength }) => {
    const rtlFields = ["fullName", "mobile", "nationalId", "serial"];
    const isRtl = rtlFields.includes(name);
    return (
      <Box sx={{ position: "relative", mb: 2 }}>
        <Box
          component="input"
          id={name}
          {...register(name)}
          type={type}
          inputMode={inputMode}
          maxLength={maxLength}
          sx={{
            width: "100%",
            border: "2px solid",
            borderColor: errors[name] ? "error.main" : "grey.300",
            borderRadius: 2,
            px: 2,
            pt: 3,
            pb: 1,
            bgcolor: "common.white",
            color: "common.black",
            fontSize: "0.875rem",
            fontFamily: "var(--font-vazir), sans-serif",
            textAlign: isRtl ? "right" : "left",
            "&:focus": { outline: "none", borderColor: "primary.main" },
          }}
        />
        <Typography
          component="label"
          htmlFor={name}
          sx={{
            position: "absolute",
            right: 12,
            top: -10,
            fontSize: "0.75rem",
            px: 0.5,
            bgcolor: "common.white",
            color: "text.secondary",
            fontFamily: "var(--font-vazir), sans-serif",
          }}
        >
          {label}
        </Typography>
        {errors[name] && (
          <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
            {errors[name].message}
          </Typography>
        )}
      </Box>
    );
  };

  return (
    <Box ref={formRef} sx={{ py: 6, px: 2, minHeight: "100vh", bgcolor: "grey.200" }}>
      <Box
        sx={{
          maxWidth: 600,
          mx: "auto",
          bgcolor: "common.white",
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          border: "1px solid grey",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{ mb: 3, color: "#000000", fontWeight: 700, fontSize: { xs: "1.5rem", sm: "2rem" } }}
        >
          فرم ثبت گارانتی
        </Typography>
        {statusMessage && (
          <Alert
            severity={statusMessage.type}
            sx={{ mb: 3, textAlign: "right", bgcolor: statusMessage.type === "error" ? "#FEE2E2" : "#DCFCE7", color: statusMessage.type === "error" ? "#B91C1C" : "#166534" }}
          >
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
        >
          <InputField label="نام و نام خانوادگی" name="fullName" />
          <InputField label="موبایل خریدار" name="mobile" inputMode="numeric" />
          <InputField label="کد ملی خریدار" name="nationalId" inputMode="numeric" />

          <Box sx={{ position: "relative", mb: 2 }}>
            <Box sx={{ border: "2px solid", borderColor: errors.purchaseDate ? "error.main" : "grey.300", borderRadius: 2, p: 2, bgcolor: "common.white" }}>
              <PersianDatePicker
                value={pickerValue}
                onChange={handleDateChange}
                inputProps={{ style: { color: "#000000", fontFamily: "var(--font-vazir), sans-serif" } }}
                calendarProps={{ style: { color: "#000000", fontFamily: "var(--font-vazir), sans-serif" } }}
              />
            </Box>
            <Typography component="label" sx={{ position: "absolute", right: 12, top: -10, fontSize: "0.75rem", px: 0.5, bgcolor: "common.white", color: "text.secondary" }}>
              تاریخ خرید
            </Typography>
            {errors.purchaseDate && <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>{errors.purchaseDate.message}</Typography>}
          </Box>

          <Box sx={{ position: "relative", mb: 2 }}>
            <FormControl fullWidth>
              <Select
                defaultValue=""
                {...register("productId")}
                displayEmpty
                sx={{ fontFamily: "var(--font-vazir), sans-serif" }}
              >
                <MenuItem value="" disabled hidden />
                {products.map((p) => (
                  <MenuItem key={p.id} value={p.id.toString()}>
                    {p.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Typography component="label" sx={{ position: "absolute", right: 12, top: -10, fontSize: "0.75rem", px: 0.5, bgcolor: "common.white", color: "text.secondary" }}>
              نام محصول
            </Typography>
            {errors.productId && <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>{errors.productId.message}</Typography>}
          </Box>

          <InputField label="سریال دستگاه" name="serial" />

          <Box textAlign="center" mt={4}>
            <Button type="submit" variant="contained" size="large" disabled={loading} sx={{ px: 6, py: 1.5, fontFamily: "var(--font-vazir), sans-serif" }}>
              {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "ثبت گارانتی"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
export default WarrantyForm;