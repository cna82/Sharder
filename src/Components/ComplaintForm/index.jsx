"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const iranCity = require("iran-city");

const schema = z.object({
  fullName: z
    .string()
    .min(1, "لطفاً نام و نام خانوادگی را وارد کنید")
    .regex(/^[\u0600-\u06FFa-zA-Z\s]+$/, "نام فقط باید شامل حروف باشد"),
  mobile: z
    .string()
    .min(1, "لطفاً شماره موبایل را وارد کنید")
    .regex(/^09\d{9}$/, "شماره موبایل معتبر نیست (مثال: 09123456789)"),
  province: z.string().min(1, "لطفاً استان را انتخاب کنید"),
  city: z.string().min(1, "لطفاً شهر را انتخاب کنید"),
  complaint: z.string().min(1, "لطفاً شرح شکایت را وارد کنید"),
});

export default function ComplaintForm() {
  const messageRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      mobile: "",
      province: "",
      city: "",
      complaint: "",
    },
  });

  const selectedProvince = watch("province");

  useEffect(() => {
    setProvinces(iranCity.allProvinces());
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      setCities(iranCity.citiesOfProvince(Number(selectedProvince)));
      setValue("city", "");
    } else {
      setCities([]);
    }
  }, [selectedProvince, setValue]);

  useEffect(() => {
    if (message) {
      messageRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [message]);

  const handleFormSubmit = async (data) => {
    setLoading(true);
    setMessage(null);

    const provObj = provinces.find(p => p.id.toString() === data.province);
    const cityObj = cities.find(c => c.id.toString() === data.city);
    const payload = {
      fullName: data.fullName,
      mobile: data.mobile,
      province: provObj ? provObj.name : data.province,
      city: cityObj ? cityObj.name : data.city,
      complaint: data.complaint,
    };

    try {
      const res = await fetch("/api/sendComplaintEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) {
        setMessage({ type: "error", text: json.message || "خطا در ارسال فرم" });
      } else {
        setMessage({ type: "success", text: "فرم با موفقیت ارسال شد!" });
        reset();
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "خطا در ارسال فرم. لطفاً دوباره تلاش کنید." });
    }
    setLoading(false);
  };

  const InputField = ({ label, name, inputMode = "text", maxLength, select = false, options = [], disabled = false }) => (
    <div className="relative mb-4">
      {select ? (
        <select
          id={name}
          {...register(name)}
          disabled={disabled}
          style={{
            backgroundColor: "#ffffff",
            color: "#000000",
            borderColor: errors[name] ? "#EF4444" : "#d1d5db",
            width: "100%",
            borderWidth: "2px",
            borderRadius: "0.5rem",
            padding: "1rem",
            fontSize: "0.875rem",
            textAlign: "right",
          }}
          className="peer focus:border-blue-500 transition duration-200"
        >
          <option value="">انتخاب کنید</option>
          {options.map(option => (
            <option key={option.id || option} value={option.id?.toString() || option}>
              {option.name || option}
            </option>
          ))}
        </select>
      ) : (
        <textarea
          id={name}
          {...register(name)}
          inputMode={inputMode}
          maxLength={maxLength}
          style={{
            backgroundColor: "#ffffff",
            color: "#000000",
            borderColor: errors[name] ? "#EF4444" : "#d1d5db",
            width: "100%",
            borderWidth: "2px",
            borderRadius: "0.5rem",
            padding: "1rem",
            fontSize: "0.875rem",
            minHeight: name === "complaint" ? "120px" : "auto",
          }}
          className="peer focus:outline-none focus:border-blue-500 transition duration-200"
        />
      )}
      <label
        htmlFor={name}
        style={{ backgroundColor: "#ffffff", color: "#6b7280", right: select ? "2rem" : "1rem" }}
        className="absolute -top-2.5 text-xs px-1 peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-blue-500"
      >
        {label}
      </label>
      {errors[name] && <p className="text-red-600 text-xs mt-1">{errors[name].message}</p>}
      {name === "city" && !selectedProvince && (
        <p className="text-gray-500 text-xs mt-1">ابتدا استان را انتخاب کنید</p>
      )}
    </div>
  );

  return (
    <Box sx={{ py: 5, px: 2, minHeight: "100vh", backgroundColor: "#ffffff" }}>
      <Box sx={{ maxWidth: 600, mx: "auto", bgcolor: "#ffffff", p: 4, borderRadius: 3, boxShadow: "0 4px 12px rgba(0,0,0,0.1)", border: "1px solid #e5e7eb" }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, textAlign: "center", color: "#000000" }}>
          فرم ثبت شکایت
        </Typography>

        {message && (
          <Alert ref={messageRef} severity={message.type} sx={{ mb: 3, fontWeight: "bold", textAlign: "right", bgcolor: message.type === "success" ? "#d1fae5" : "#fee2e2", color: message.type === "success" ? "#065f46" : "#b91c1c" }}>
            {message.text}
          </Alert>
        )}

        <form onSubmit={handleSubmit(handleFormSubmit)} noValidate onKeyDown={e => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(handleFormSubmit)();
          }
        }}>
          <InputField label="نام و نام خانوادگی" name="fullName" inputMode="text" />
          <InputField label="شماره موبایل" name="mobile" inputMode="numeric" maxLength={11} />

          <InputField select label="استان" name="province" options={provinces} />
          <InputField select label="شهر" name="city" options={cities} disabled={!selectedProvince} />
          <InputField label="شرح شکایت" name="complaint" />

          <Box textAlign="center" mt={3}>
            <Button type="submit" variant="contained" size="large" disabled={loading} sx={{ px: 6, py: 1.5, borderRadius: 2, fontWeight: "bold", backgroundColor: "#2563eb", "&:hover": { backgroundColor: "#1d4ed8" }, color: "#fff" }}>
              {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "ارسال شکایت"}
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
